import {
  Component, OnInit, OnDestroy, AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';

// Trạng thái của mỗi ô câu hỏi trong nav grid
export type NavState = 'empty' | 'answered' | 'correct' | 'wrong';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestComponent implements OnInit, OnDestroy, AfterViewInit {

  // ── Câu trả lời người dùng ──────────────────────────────────
  userAnswers: { [q: number]: string } = {};

  // ── Trạng thái nav ô (1–40): empty | answered | correct | wrong
  navStates: { [q: number]: NavState } = {};

  // ── Trạng thái class từng option: { 1: {A:'', B:'selected'...} }
  optionStates: { [q: number]: { [opt: string]: string } } = {};

  // ── Giải thích visible ──────────────────────────────────────
  explVisible: { [q: number]: boolean } = {};

  private readonly STORAGE_KEY = 'testExamProgress_v1';

  private get storage(): Storage | null {
    // In SSR / server environment, localStorage is not available.
    // `typeof localStorage` is safe even if `localStorage` isn't defined.
    return typeof localStorage === 'undefined' ? null : localStorage;
  }

  // ── Chung ───────────────────────────────────────────────────
  checked        = false;
  showAllExpls   = false;
  resultVisible  = false;
  modalVisible   = false;
  savedProgress  = false;

  get saveLabel(): string { return this.savedProgress ? '💾 Đã lưu' : '💾 Lưu bài'; }

  // ── Kết quả ─────────────────────────────────────────────────
  score        = 0;
  correctCount = 0;
  wrongCount   = 0;
  skipCount    = 0;

  // ── Timer ───────────────────────────────────────────────────
  readonly TOTAL_SECS = 45 * 60;
  secsLeft = this.TOTAL_SECS;

  get timerDisplay(): string {
    const m = Math.floor(this.secsLeft / 60);
    const s = this.secsLeft % 60;
    return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  }
  get timerBarWidth():  string  { return (this.secsLeft / this.TOTAL_SECS * 100) + '%'; }
  get timerWarning():   boolean { return this.secsLeft <= 300 && this.secsLeft > 60; }
  get timerDanger():    boolean { return this.secsLeft <= 60; }

  private timerInterval: ReturnType<typeof setInterval> | null = null;

  // ── Tiến độ (computed) ──────────────────────────────────────
  get answeredCount(): number { return Object.keys(this.userAnswers).length; }
  get remainCount():   number { return this.totalQuestions - this.answeredCount; }
  get progressPct():   string { return Math.round(this.answeredCount / this.totalQuestions * 100) + '%'; }
  get progressWidth(): string { return Math.round(this.answeredCount / this.totalQuestions * 100) + '%'; }

  // ── Kết quả (computed) ──────────────────────────────────────
  get resultScore(): string { return this.score.toFixed(2) + ' / 10'; }
  get resultGrade(): string { return this.getGrade(); }
  get resultEmoji(): string { return this.getEmoji(); }
  get modalSub():    string {
    return `Bạn trả lời đúng ${this.correctCount}/${this.totalQuestions} câu. Điểm số: ${this.score.toFixed(2)}/10`;
  }

  // ── Danh sách số câu cho *ngFor ─────────────────────────────
  readonly totalQuestions = 40;
  readonly questionNums   = Array.from({ length: 40 }, (_, i) => i + 1);

  // ── Đáp án chuẩn ────────────────────────────────────────────
  readonly ANSWERS: { [q: number]: string } = {
     1:'B',  2:'C',  3:'C',  4:'B',
     5:'B',  6:'D',  7:'B',  8:'B',
     9:'C', 10:'B', 11:'A', 12:'C', 13:'B', 14:'D', 15:'A', 16:'A', 17:'B', 18:'D',
    19:'A', 20:'B',
    21:'A', 22:'A', 23:'B', 24:'C',
    25:'C', 26:'D', 27:'C', 28:'D', 29:'C', 30:'B',
    31:'D', 32:'C', 33:'D', 34:'B',
    35:'D', 36:'C', 37:'A', 38:'A',
    39:'D', 40:'C',
  };

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void    { this.loadProgress(); }
  ngAfterViewInit():  void { this.startTimer(); }
  ngOnDestroy():      void { this.stopTimer(); }

  // ── Khởi tạo state sạch ─────────────────────────────────────
  initState(): void {
    this.savedProgress = false;
    this.userAnswers  = {};
    this.navStates    = {};
    this.optionStates = {};
    this.explVisible  = {};
    for (let q = 1; q <= this.totalQuestions; q++) {
      this.navStates[q]    = 'empty';
      this.explVisible[q]  = false;
      this.optionStates[q] = { A:'', B:'', C:'', D:'' };
    }
  }

  loadProgress(): void {
    const storage = this.storage;
    if (!storage) {
      // Server-side rendering and other non-browser contexts.
      this.initState();
      return;
    }

    const raw = storage.getItem(this.STORAGE_KEY);
    if (!raw) {
      this.initState();
      return;
    }

    try {
      const data = JSON.parse(raw);
      if (!data || data.saved !== true) {
        // Only restore progress if the user explicitly saved it before.
        this.initState();
        return;
      }

      this.savedProgress = true;

      const savedAt = typeof data.savedAt === 'number' ? data.savedAt : null;
      const savedSecsLeft = typeof data.secsLeft === 'number' ? data.secsLeft : this.TOTAL_SECS;
      const elapsed = savedAt ? Math.floor((Date.now() - savedAt) / 1000) : 0;
      this.secsLeft = Math.max(0, savedSecsLeft - elapsed);

      this.userAnswers  = data.userAnswers  ?? {};
      this.navStates    = data.navStates    ?? {};
      this.optionStates = data.optionStates ?? {};
      this.explVisible  = data.explVisible  ?? {};

      this.checked       = !!data.checked;
      this.score         = typeof data.score === 'number' ? data.score : 0;
      this.correctCount  = typeof data.correctCount === 'number' ? data.correctCount : 0;
      this.wrongCount    = typeof data.wrongCount === 'number' ? data.wrongCount : 0;
      this.skipCount     = typeof data.skipCount === 'number' ? data.skipCount : 0;
      this.resultVisible = !!data.resultVisible;
      this.modalVisible  = !!data.modalVisible;

      if (Object.keys(this.navStates).length === 0) {
        this.initState();
      }
    } catch {
      this.initState();
    }
  }

  onSave(): void {
    // Only store progress when the user explicitly clicks "Lưu bài".
    this.savedProgress = true;
    this.saveProgress();
  }

  saveProgress(): void {
    if (!this.savedProgress) return;

    const storage = this.storage;
    if (!storage) return;

    const payload = {
      saved: true,
      savedAt: Date.now(),
      secsLeft: this.secsLeft,
      userAnswers: this.userAnswers,
      navStates: this.navStates,
      optionStates: this.optionStates,
      explVisible: this.explVisible,
      checked: this.checked,
      score: this.score,
      correctCount: this.correctCount,
      wrongCount: this.wrongCount,
      skipCount: this.skipCount,
      resultVisible: this.resultVisible,
      modalVisible: this.modalVisible,
    };

    try {
      storage.setItem(this.STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // If localStorage is unavailable or quota is exceeded, we silently ignore.
    }
  }

  clearProgress(): void {
    const storage = this.storage;
    if (!storage) return;

    try {
      storage.removeItem(this.STORAGE_KEY);
    } catch {
      // Ignore if storage is unavailable.
    }
  }

  // ── Chọn đáp án ─────────────────────────────────────────────
  selectOpt(qNum: number, opt: string): void {
    if (this.checked) return;

    // Reset tất cả option của câu này → set option được chọn
    this.optionStates[qNum] = { A:'', B:'', C:'', D:'' };
    this.optionStates[qNum][opt] = 'selected';

    // Lưu đáp án
    this.userAnswers[qNum] = opt;

    // ✅ Đổi màu ô nav ngay lập tức → xanh dương
    this.navStates[qNum] = 'answered';

    // Khi user thay đổi đáp án thì cần bấm "Lưu bài" mới lưu lại.
    this.savedProgress = false;

    this.cdr.markForCheck();
  }

  // ── CSS class cho option ────────────────────────────────────
  getOptionClass(qNum: number, opt: string): string {
    return this.optionStates[qNum]?.[opt] ?? '';
  }

  // ── CSS class cho ô nav ─────────────────────────────────────
  getNavClass(qNum: number): string {
    switch (this.navStates[qNum]) {
      case 'answered': return 'nav-answered';
      case 'correct':  return 'nav-correct';
      case 'wrong':    return 'nav-wrong';
      default:         return '';
    }
  }

  // Class cho badge số câu bên trái
  getQNumClass(qNum: number): string {
    switch (this.navStates[qNum]) {
      case 'answered': return 'answered';
      case 'correct':  return 'correct-q';
      case 'wrong':    return 'wrong-q';
      default:         return '';
    }
  }

  // ── Scroll đến câu hỏi ──────────────────────────────────────
  scrollToQ(qNum: number): void {
    document.getElementById('q' + qNum)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  // ── Kiểm tra toàn bộ đáp án ─────────────────────────────────
  checkAllAnswers(): void {
    // After checking, current state is not automatically saved.
    this.savedProgress = false;

    this.checked = true;
    let correct = 0, wrong = 0;

    for (let q = 1; q <= this.totalQuestions; q++) {
      const correctOpt = this.ANSWERS[q];
      const userOpt    = this.userAnswers[q];

      this.optionStates[q] = { A:'', B:'', C:'', D:'' };

      if (userOpt) {
        if (userOpt === correctOpt) {
          correct++;
          this.optionStates[q][userOpt]    = 'correct';
          this.navStates[q]                = 'correct';
        } else {
          wrong++;
          this.optionStates[q][userOpt]    = 'wrong';
          this.optionStates[q][correctOpt] = 'reveal-correct';
          this.navStates[q]                = 'wrong';
        }
      } else {
        this.optionStates[q][correctOpt] = 'reveal-correct';
        // navState giữ 'empty' (chưa trả lời)
      }

      this.explVisible[q] = true;
    }

    const skip        = this.totalQuestions - correct - wrong;
    this.score        = parseFloat(((correct / this.totalQuestions) * 10).toFixed(2));
    this.correctCount = correct;
    this.wrongCount   = wrong;
    this.skipCount    = skip;

    this.resultVisible = true;
    this.modalVisible  = true;

    this.stopTimer();
    this.cdr.markForCheck();
  }

  // ── Hiện/ẩn giải thích ──────────────────────────────────────
  toggleAllExplanations(): void {
    this.showAllExpls = !this.showAllExpls;
    for (let q = 1; q <= this.totalQuestions; q++) {
      this.explVisible[q] = this.showAllExpls;
    }
    this.cdr.markForCheck();
  }

  // ── Làm lại ─────────────────────────────────────────────────
  resetExam(): void {
    this.checked       = false;
    this.showAllExpls  = false;
    this.score         = 0;
    this.correctCount  = 0;
    this.wrongCount    = 0;
    this.skipCount     = 0;
    this.resultVisible = false;
    this.modalVisible  = false;
    this.initState();
    this.clearProgress();
    this.resetTimer();
    this.cdr.markForCheck();
  }

  submitExam(): void { this.checkAllAnswers(); }

  closeModal(): void {
    this.modalVisible = false;
    this.cdr.markForCheck();
  }

  // ── Grade / Emoji ────────────────────────────────────────────
  getGrade(): string {
    if (this.score >= 8)   return '🏆 Xuất sắc!';
    if (this.score >= 6.5) return '🎉 Khá tốt!';
    if (this.score >= 5)   return '📚 Cần cố gắng thêm';
    return '💪 Cần ôn luyện nhiều hơn';
  }

  getEmoji(): string {
    if (this.score >= 8)   return '🏆';
    if (this.score >= 6.5) return '🎉';
    if (this.score >= 5)   return '😊';
    return '💪';
  }

  // ── Timer ───────────────────────────────────────────────────
  startTimer(): void {
    this.timerInterval = setInterval(() => {
      this.secsLeft = Math.max(0, this.secsLeft - 1);
      if (this.secsLeft <= 0) {
        this.stopTimer();
        this.submitExam();
      }
      this.cdr.markForCheck();
    }, 1000);
  }

  stopTimer(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  resetTimer(): void {
    this.stopTimer();
    this.secsLeft = this.TOTAL_SECS;
    this.startTimer();
  }
}