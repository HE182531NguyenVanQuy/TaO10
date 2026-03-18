import {
  Component, OnInit, OnDestroy,
  ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink }   from '@angular/router';
import { Router }       from '@angular/router';

// ── Interfaces ────────────────────────────────────────────────
interface ExamResult {
  correct: number;
  wrong:   number;
  skip:    number;
  score:   string;
  userAnswers:    { [q: number]: string };
  wrongQNums:     number[];
  correctAnswers: { [q: number]: string };
  questionTexts:  { [q: number]: string };
}

interface SkillSummary   { emoji: string; name: string; pct: number; }
interface PriorityTopic  { name: string; wrongCount: number; }

interface WrongDetail {
  qNum:            number;
  topic:           string;
  difficulty:      string;
  difficultyLabel: string;
  questionSummary: string;
  userAnswer:      string;
  correctAnswer:   string;
  aiAnalysis:      string;
  grammarRule:     string;
  examples:        { en: string; vi: string }[];
}

interface ExerciseRec {
  emoji: string; type: string; topic: string; title: string;
  description: string; duration: string; questionCount: number;
  level: string; levelLabel: string; grammarPoints: string[]; color: string;
}

interface StudyWeek {
  title: string; focus: string;
  tasks: { icon: string; text: string; time: string }[];
}

interface AnalysisResult {
  overallComment: string;
  strongPoints:   string[];
  weakPoints:     string[];
  wrongDetails:   WrongDetail[];
  exercises:      ExerciseRec[];
  studyPlan:      StudyWeek[];
}

// ── Dữ liệu phân tích giả lập (hardcoded) ─────────────────────
const MOCK_ANALYSIS: AnalysisResult = {
  overallComment:
    'Bạn đạt 7.00/10 – đây là kết quả khá tốt! Bạn nắm vững ngữ pháp cơ bản (câu điều kiện, thì động từ) và từ vựng ngữ cảnh. Điểm cần cải thiện tập trung ở mảng Từ đồng/trái nghĩa (3 lỗi) và Đọc hiểu (2 lỗi) – đây là hai chủ điểm chiếm tỉ lệ điểm cao trong đề thi lớp 10 Hà Nội. Với lộ trình ôn luyện 3 tuần bên dưới, bạn hoàn toàn có thể đạt 8.5+ trong kỳ thi chính thức!',
  strongPoints: ['Ngữ pháp câu điều kiện', 'Tình huống giao tiếp', 'Viết lại câu'],
  weakPoints:   ['Từ đồng / trái nghĩa', 'Đọc hiểu đoạn văn', 'Phát âm ngoại lệ'],
  wrongDetails: [
    {
      qNum: 1, topic: 'Phát âm', difficulty: 'easy', difficultyLabel: 'Dễ',
      questionSummary: 'Chọn từ có phần gạch chân phát âm khác: endangered / generation / embroider / environment',
      userAnswer: 'A', correctAnswer: 'B',
      aiAnalysis: 'Bạn chọn "endangered" (A) thay vì "generation" (B). Lỗi này cho thấy chưa phân biệt được âm /ɪ/ trong tiền tố "en-" so với âm /e/ đặc biệt trong "ge-" của từ generation. Đây là trường hợp ngoại lệ cần ghi nhớ riêng.',
      grammarRule: 'Tiền tố "en-" đọc /ɪn/. Riêng "ge-" trong generation đọc /dʒe/ – ngoại lệ cần ghi nhớ. Quy tắc chung: "e" trong âm tiết không được nhấn thường đọc /ɪ/.',
      examples: [
        { en: 'endangered /ɪnˈdeɪndʒəd/ – "e" đọc /ɪ/', vi: 'Loài có nguy cơ tuyệt chủng' },
        { en: 'generation /ˌdʒenəˈreɪʃən/ – "ge" đọc /dʒe/', vi: 'Thế hệ (ngoại lệ)' },
      ],
    },
    {
      qNum: 6, topic: 'Tìm lỗi sai – Mục đích', difficulty: 'medium', difficultyLabel: 'Trung bình',
      questionSummary: 'What do you practice speaking English all day for? Winning a prize.',
      userAnswer: 'B', correctAnswer: 'D',
      aiAnalysis: '"practice + V-ing" ở vị trí B hoàn toàn đúng ngữ pháp. Lỗi thực sự nằm ở D: khi trả lời câu hỏi "What...for?" về mục đích, cần dùng To-infinitive (to win), không dùng V-ing (winning). Bạn nhầm lẫn giữa hai cấu trúc này.',
      grammarRule: 'Trả lời câu hỏi về mục đích "What...for?" hoặc "Why?" → bắt buộc dùng "To + V-nguyên thể". Không dùng V-ing trong ngữ cảnh này.',
      examples: [
        { en: 'What are you saving for? – To buy a car.', vi: 'Bạn tiết kiệm để làm gì? – Để mua xe.' },
        { en: 'Why did she study so hard? – To pass the exam.', vi: 'Sao cô ấy học chăm vậy? – Để đậu kỳ thi.' },
      ],
    },
    {
      qNum: 21, topic: 'Từ đồng nghĩa', difficulty: 'medium', difficultyLabel: 'Trung bình',
      questionSummary: 'Please, go on and finish what you were saying. (SYNONYM)',
      userAnswer: 'D', correctAnswer: 'A',
      aiAnalysis: 'Bạn chọn "stop" (D) – đây là trái nghĩa của "go on", không phải đồng nghĩa. Đây là lỗi đọc không kỹ yêu cầu: câu hỏi ghi rõ "(SYNONYM)" nhưng bạn lại chọn antonym. Cần lưu ý đọc kỹ loại yêu cầu trước khi chọn đáp án.',
      grammarRule: '"Go on" = continue (tiếp tục làm việc gì đó). Trái nghĩa là "stop" hoặc "cease". Luôn đọc kỹ yêu cầu SYNONYM (đồng nghĩa) hay ANTONYM (trái nghĩa) trước khi làm.',
      examples: [
        { en: 'Please go on with your story. = Please continue your story.', vi: 'Xin hãy tiếp tục câu chuyện.' },
        { en: 'The meeting went on for two hours.', vi: 'Cuộc họp kéo dài hai tiếng đồng hồ.' },
      ],
    },
    {
      qNum: 23, topic: 'Từ trái nghĩa', difficulty: 'medium', difficultyLabel: 'Trung bình',
      questionSummary: 'John is one of the most discourteous bosses I have ever worked with. (OPPOSITE)',
      userAnswer: 'C', correctAnswer: 'B',
      aiAnalysis: 'Bạn chọn "pleasant" (C – dễ chịu) thay vì "polite" (B – lịch sự). "Discourteous" có nghĩa rất cụ thể là "vô lễ, bất lịch sự", nên trái nghĩa chính xác và trực tiếp nhất là "polite" hoặc "courteous". "Pleasant" có nghĩa rộng hơn và không đối lập trực tiếp.',
      grammarRule: '"Discourteous" = bất lịch sự, vô lễ. Trái nghĩa trực tiếp: "courteous" hoặc "polite". Cần phân biệt "pleasant" (dễ chịu, vui vẻ) với "polite" (lịch sự, có phép tắc).',
      examples: [
        { en: 'discourteous ↔ courteous / polite', vi: 'Vô lễ ↔ Lịch sự / Nhã nhặn' },
        { en: 'a discourteous reply ↔ a polite reply', vi: 'Câu trả lời vô phép ↔ Câu trả lời lịch sự' },
      ],
    },
    {
      qNum: 24, topic: 'Từ trái nghĩa', difficulty: 'easy', difficultyLabel: 'Dễ',
      questionSummary: 'Henry has found a temporary job in an office. (OPPOSITE)',
      userAnswer: 'A', correctAnswer: 'C',
      aiAnalysis: 'Bạn chọn "eternal" (A – vĩnh cửu, bất tử) thay vì "permanent" (C – lâu dài, cố định). Trong ngữ cảnh việc làm và cuộc sống thường ngày, trái nghĩa của "temporary" là "permanent". "Eternal" mang sắc thái triết học hoặc thơ văn, không dùng trong ngữ cảnh công việc.',
      grammarRule: '"Temporary" (tạm thời) ↔ "Permanent" (lâu dài, cố định) – dùng cho việc làm, cư trú, giải pháp. "Eternal" chỉ dùng trong ngữ cảnh triết học, tôn giáo hoặc thơ ca.',
      examples: [
        { en: 'a temporary job ↔ a permanent job', vi: 'Việc làm tạm thời ↔ Việc làm cố định' },
        { en: 'a temporary fix ↔ a permanent solution', vi: 'Giải pháp tạm thời ↔ Giải pháp lâu dài' },
      ],
    },
    {
      qNum: 33, topic: 'Đọc hiểu – Phương tiện học', difficulty: 'medium', difficultyLabel: 'Trung bình',
      questionSummary: "According to the passage, in what way isn't English learnt?",
      userAnswer: 'B', correctAnswer: 'D',
      aiAnalysis: '"On television" (B) đã được bài đọc đề cập rõ ràng ở câu "A few learn English just by hearing the language in films, on television...". Lỗi của bạn là nhầm giữa "mục đích đọc báo" và "cách học". Bài có nhắc "read newspapers" nhưng đó là MỤC ĐÍCH học, không phải PHƯƠNG TIỆN học.',
      grammarRule: 'Kỹ năng đọc hiểu: luôn phân biệt METHOD (phương pháp/cách thức) và PURPOSE (mục đích). Câu hỏi hỏi "in what way" = hỏi về cách thức, không phải mục đích. Đọc lại bài và tìm đúng loại thông tin.',
      examples: [
        { en: 'Methods mentioned: films, TV, office, friends', vi: 'Phương pháp có nhắc: phim, TV, văn phòng, bạn bè' },
        { en: 'Purpose mentioned: to read newspapers (≠ method)', vi: 'Mục đích có nhắc: đọc báo (≠ phương pháp học)' },
      ],
    },
    {
      qNum: 34, topic: 'Đọc hiểu – Câu sai', difficulty: 'hard', difficultyLabel: 'Khó',
      questionSummary: 'Which sentence is INCORRECT according to the passage?',
      userAnswer: '', correctAnswer: 'B',
      aiAnalysis: 'Bạn bỏ qua câu này – có thể do thiếu thời gian hoặc chưa tự tin. Đây là dạng câu hỏi "câu nào SAI" yêu cầu loại trừ từng đáp án. Câu B sai vì bài đọc nêu rõ "many boys and girls learn English at school because it is one of their subjects" – tiếng Anh LÀ môn học bắt buộc, không phải không bắt buộc như câu B nói.',
      grammarRule: 'Chiến thuật làm câu "which is INCORRECT": loại trừ lần lượt từng đáp án bằng cách đối chiếu TRỰC TIẾP với câu/từ trong bài. Không suy luận thêm ngoài nội dung đã đọc. Không bỏ qua câu dạng này.',
      examples: [
        { en: '"English is one of their subjects" → câu B ngược với ý này', vi: 'Bài đọc xác nhận tiếng Anh là môn học' },
        { en: '"English is NOT compulsory" → SAI (mâu thuẫn bài đọc)', vi: 'Câu B sai vì trái với nội dung bài' },
      ],
    },
    {
      qNum: 37, topic: 'Câu điều kiện loại 2', difficulty: 'medium', difficultyLabel: 'Trung bình',
      questionSummary: "Hoa doesn't prepare carefully → she gets bad marks → If... (rewrite)",
      userAnswer: 'C', correctAnswer: 'A',
      aiAnalysis: 'Đáp án A và C có nội dung gần giống nhau, đây là bẫy rất phổ biến trong đề thi. Đáp án A đúng hoàn toàn cấu trúc Type 2. Đáp án C có lỗi sai ở dạng động từ mệnh đề kết quả (không dùng "wouldn\'t" đúng cách). Cần đọc kỹ từng đáp án trước khi tô.',
      grammarRule: 'Câu điều kiện loại 2 (giả định trái thực tế hiện tại): If + S + V-ed/were, S + would/could + V-bare. Khi điều kiện là phủ định thực tế: "doesn\'t prepare" → "If she prepared..." (bỏ NOT, thêm V-ed).',
      examples: [
        { en: 'If she studied harder, she would pass the exam.', vi: 'Nếu cô ấy học chăm hơn, cô ấy sẽ đậu.' },
        { en: 'If I were you, I would accept the offer.', vi: 'Nếu tôi là bạn, tôi sẽ chấp nhận đề nghị đó.' },
      ],
    },
  ],
  exercises: [
    {
      emoji: '🔄', type: 'Trắc nghiệm', topic: 'Từ đồng / trái nghĩa', color: 'violet',
      title: '60 câu từ đồng nghĩa & trái nghĩa thường gặp trong đề thi lớp 10',
      description: 'Bài tập tập trung cặp từ dễ nhầm, có giải thích ngữ cảnh và ví dụ minh họa.',
      duration: '25 phút', questionCount: 60, level: 'medium', levelLabel: 'Trung bình',
      grammarPoints: ['Synonym', 'Antonym', 'Context clues'],
    },
    {
      emoji: '📚', type: 'Đọc hiểu', topic: 'Đọc hiểu đoạn văn', color: 'blue',
      title: '10 đoạn văn chuẩn thi lớp 10 Hà Nội – Luyện kỹ năng đọc & suy luận',
      description: 'Mỗi đoạn kèm 4 câu hỏi dạng thi thật, tập trung kỹ năng suy luận và tham chiếu.',
      duration: '40 phút', questionCount: 40, level: 'medium', levelLabel: 'Trung bình',
      grammarPoints: ['Inference', 'Skimming', 'Reference words'],
    },
    {
      emoji: '🔊', type: 'Lý thuyết + BT', topic: 'Phát âm & Trọng âm', color: 'emerald',
      title: 'Quy tắc phát âm – 200 từ thường ra đề thi lớp 10 có ngoại lệ',
      description: 'Tổng hợp quy tắc đọc nguyên âm, phụ âm câm và trọng âm từ 2–3 âm tiết.',
      duration: '30 phút', questionCount: 50, level: 'easy', levelLabel: 'Dễ',
      grammarPoints: ['Vowel sounds', 'Word stress', 'Silent letters'],
    },
    {
      emoji: '✍️', type: 'Viết lại câu', topic: 'Câu điều kiện', color: 'amber',
      title: '50 bài viết lại câu – Điều kiện loại 1, 2, 3 và hỗn hợp có đáp án',
      description: 'Luyện chuyển đổi câu thực tế ↔ giả định, quá khứ ↔ hiện tại với đáp án chi tiết.',
      duration: '25 phút', questionCount: 50, level: 'medium', levelLabel: 'Trung bình',
      grammarPoints: ['Type 1', 'Type 2', 'Type 3', 'Mixed conditionals'],
    },
    {
      emoji: '🔍', type: 'Tìm lỗi sai', topic: 'Error Correction', color: 'rose',
      title: '40 câu tìm lỗi – Tập trung Bị động, To-infinitive & Phrasal Verbs',
      description: 'Chuyên sâu các cấu trúc hay bị sai nhất: bị động, mục đích, cụm động từ.',
      duration: '20 phút', questionCount: 40, level: 'medium', levelLabel: 'Trung bình',
      grammarPoints: ['Passive voice', 'To-infinitive', 'Phrasal verbs'],
    },
    {
      emoji: '📝', type: 'Đề thi tổng hợp', topic: 'Thi thử toàn diện', color: 'teal',
      title: 'Đề thi tổng hợp số 2 – Chuẩn cấu trúc Hà Nội 2026 (Sau ôn luyện)',
      description: 'Thử sức sau khi đã luyện tập các phần yếu để đo mức độ tiến bộ thực tế.',
      duration: '45 phút', questionCount: 40, level: 'hard', levelLabel: 'Khó',
      grammarPoints: ['All skills', 'Timed exam', 'Full test 2026'],
    },
  ],
  studyPlan: [
    {
      title: 'Củng cố điểm yếu',
      focus: 'Từ vựng & Đọc hiểu',
      tasks: [
        { icon: '📖', text: 'Ôn 60 cặp từ đồng/trái nghĩa thường gặp trong đề thi', time: '30ph/ngày' },
        { icon: '📚', text: 'Luyện 5 đoạn đọc hiểu ngắn chuẩn đề thi Hà Nội', time: '40ph/ngày' },
        { icon: '🔊', text: 'Ghi nhớ 50 từ có phát âm ngoại lệ hay ra đề', time: '15ph/ngày' },
      ],
    },
    {
      title: 'Nâng cao & Tổng hợp',
      focus: 'Ngữ pháp chuyên sâu',
      tasks: [
        { icon: '✍️', text: 'Luyện 30 câu viết lại – điều kiện + bị động + so sánh', time: '30ph/ngày' },
        { icon: '🔍', text: 'Làm 2 bộ đề tìm lỗi sai theo từng chủ điểm ngữ pháp', time: '25ph/ngày' },
        { icon: '📝', text: 'Ôn toàn bộ chủ điểm ngữ pháp trọng tâm lớp 9', time: '45ph/ngày' },
      ],
    },
    {
      title: 'Thi thử & Đánh giá',
      focus: 'Mô phỏng thi thật',
      tasks: [
        { icon: '⏱', text: 'Làm 2 đề thi thử đầy đủ 40 câu trong đúng 45 phút', time: '45ph/lần' },
        { icon: '🤖', text: 'Dùng AI TaO10 phân tích lại lỗi sai sau mỗi đề', time: '20ph/lần' },
        { icon: '🎯', text: 'Tập trung ôn những lỗi còn tồn đọng chưa khắc phục', time: '30ph/ngày' },
      ],
    },
  ],
};

// ── Văn bản AI giả lập streaming (xuất hiện từng ký tự) ────────
const STREAMING_TEXT =
  `Đang phân tích 8 câu sai/bỏ qua trong bài thi của bạn...\n\n` +
  `✅ Phát hiện lỗi: Từ đồng/trái nghĩa (3 câu) · Đọc hiểu (2 câu) · Phát âm (1 câu) · Tìm lỗi sai (1 câu) · Câu điều kiện (1 câu)\n\n` +
  `📊 Đánh giá tổng thể: Điểm 7.00/10 – Kết quả khá tốt. Bạn nắm vững ngữ pháp cơ bản và từ vựng ngữ cảnh...\n\n` +
  `🎯 Đang tạo bài tập gợi ý cá nhân hóa theo từng lỗi sai...\n\n` +
  `📅 Đang lập lộ trình ôn tập 3 tuần phù hợp với trình độ hiện tại...`;

@Component({
  selector: 'app-ai-analysis',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './ai-analysis.component.html',
  styleUrl:    './ai-analysis.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AiAnalysisComponent implements OnInit, OnDestroy {

  // ── UI State ──────────────────────────────────────────────
  isLoading      = true;
  isStreaming    = false;
  streamingText  = '';
  streamProgress = 0;
  currentLoadStep = 0;
  expandedQ: number | null = null;
  hasError       = false;
  errorMessage   = '';
  analysisResult: AnalysisResult | null = null;

  private timers: ReturnType<typeof setTimeout>[] = [];

  // ── Loading steps ─────────────────────────────────────────
  readonly loadingSteps = [
    'Đọc và xử lý câu trả lời sai / bỏ qua',
    'Phân loại lỗi theo từng chủ điểm ngữ pháp',
    'Tạo nhận xét & gợi ý bài tập cá nhân hóa',
  ];

  // ── Dữ liệu bài thi (đọc từ localStorage, fallback mock) ──
  examResult: ExamResult = {
    correct: 28, wrong: 8, skip: 4, score: '7.00',
    userAnswers:    { 1:'A', 6:'B', 21:'D', 23:'C', 24:'A', 33:'B', 34:'', 37:'C' },
    wrongQNums:     [1, 6, 21, 23, 24, 33, 34, 37],
    correctAnswers: { 1:'B', 6:'D', 21:'A', 23:'B', 24:'C', 33:'D', 34:'B', 37:'A' },
    questionTexts: {
      1:  'Phát âm – endangered / generation / embroider / environment',
      6:  'What do you practice speaking English all day for? Winning a prize.',
      21: 'Please, go on and finish what you were saying. (SYNONYM)',
      23: 'John is one of the most discourteous bosses. (OPPOSITE)',
      24: 'Henry has found a temporary job. (OPPOSITE)',
      33: "According to the passage, in what way isn't English learnt?",
      34: 'Which sentence is INCORRECT?',
      37: "Hoa doesn't prepare carefully, so she gets bad marks. → If...",
    },
  };

  // ── Skill breakdown sidebar ───────────────────────────────
  skillSummary: SkillSummary[] = [
    { emoji: '🔊', name: 'Phát âm & Trọng âm', pct: 75  },
    { emoji: '🔍', name: 'Tìm lỗi sai',         pct: 75  },
    { emoji: '📖', name: 'Ngữ pháp & Từ vựng',  pct: 80  },
    { emoji: '💬', name: 'Giao tiếp',            pct: 100 },
    { emoji: '🔄', name: 'Đồng / Trái nghĩa',   pct: 25  },
    { emoji: '📝', name: 'Đọc hiểu',             pct: 50  },
    { emoji: '✍️', name: 'Viết lại câu',         pct: 83  },
  ];

  priorityTopics: PriorityTopic[] = [
    { name: 'Từ đồng / trái nghĩa', wrongCount: 3 },
    { name: 'Đọc hiểu đoạn văn',    wrongCount: 2 },
    { name: 'Phát âm & Trọng âm',   wrongCount: 1 },
  ];

  // ── Computed getters ──────────────────────────────────────
  get gradeClass(): string {
    const s = parseFloat(this.examResult.score);
    if (s >= 8.5) return 'grade-excellent';
    if (s >= 7)   return 'grade-good';
    if (s >= 5)   return 'grade-average';
    return 'grade-poor';
  }

  get gradeLabel(): string {
    const s = parseFloat(this.examResult.score);
    if (s >= 8.5) return '🏆 Xuất sắc';
    if (s >= 7)   return '🎉 Khá tốt';
    if (s >= 5)   return '📚 Trung bình';
    return '💪 Cần cố gắng';
  }

  get aiStatusClass(): string {
    if (this.hasError)    return 'status-error';
    if (this.isStreaming) return 'status-stream';
    if (this.isLoading)   return 'status-loading';
    return 'status-done';
  }

  get aiStatusIcon(): string {
    if (this.hasError)    return '❌';
    if (this.isStreaming) return '✍️';
    if (this.isLoading)   return '⏳';
    return '✅';
  }

  get aiStatusLabel(): string {
    if (this.hasError)    return 'Kết nối thất bại';
    if (this.isStreaming) return 'AI đang viết...';
    if (this.isLoading)   return 'Đang phân tích...';
    return 'Phân tích hoàn thành';
  }

  get aiStatusSub(): string {
    if (this.hasError)    return 'Nhấn Thử lại để chạy lại';
    if (this.isStreaming) return 'Đang xử lý từng câu sai...';
    if (this.isLoading)   return `Bước ${this.currentLoadStep + 1}/${this.loadingSteps.length}`;
    return `Đã phân tích ${this.examResult.wrong + this.examResult.skip} lỗi thành công`;
  }

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadExamResultFromStorage();
    this.runSimulatedAnalysis();
  }

  ngOnDestroy(): void {
    this.timers.forEach(t => clearTimeout(t));
  }

  // ── Đọc kết quả bài thi từ localStorage ──────────────────
  private loadExamResultFromStorage(): void {
    try {
      const raw = localStorage.getItem('tao10_ai_analysis');
      if (!raw) return;
      const data = JSON.parse(raw);
      if (!data?.wrongQNums?.length) return;

      this.examResult = {
        correct:        data.correct        ?? this.examResult.correct,
        wrong:          data.wrong          ?? this.examResult.wrong,
        skip:           data.skip           ?? this.examResult.skip,
        score:          data.scoreStr       ?? this.examResult.score,
        userAnswers:    data.userAnswers    ?? {},
        wrongQNums:     data.wrongQNums     ?? [],
        correctAnswers: data.correctAnswers ?? {},
        questionTexts:  data.questionTexts  ?? {},
      };

      // Tính lại skill summary theo dữ liệu thật
      this.recalcSkillSummary(data.wrongQNums ?? []);
    } catch {
      // Giữ dữ liệu mock nếu localStorage trống hoặc lỗi
    }
  }

  // ── Tính lại skill bar dựa trên câu sai thật ─────────────
  private recalcSkillSummary(wrongNums: number[]): void {
    const wrongSet = new Set<number>(wrongNums);
    const sections = [
      { range:[1,4],   name:'Phát âm & Trọng âm', emoji:'🔊' },
      { range:[5,8],   name:'Tìm lỗi sai',         emoji:'🔍' },
      { range:[9,18],  name:'Ngữ pháp & Từ vựng',  emoji:'📖' },
      { range:[19,20], name:'Giao tiếp',            emoji:'💬' },
      { range:[21,24], name:'Đồng / Trái nghĩa',   emoji:'🔄' },
      { range:[25,30], name:'Đọc hiểu điền từ',    emoji:'📝' },
      { range:[31,34], name:'Đọc hiểu đoạn văn',   emoji:'📚' },
      { range:[35,40], name:'Viết lại câu',         emoji:'✍️' },
    ];

    this.skillSummary = sections.map(s => {
      const [from, to] = s.range as [number, number];
      const count = to - from + 1;
      const wrong = Array.from({ length: count }, (_, i) => from + i)
                        .filter(q => wrongSet.has(q)).length;
      return { emoji: s.emoji, name: s.name, pct: Math.round(((count - wrong) / count) * 100) };
    });

    // Top 3 section yếu nhất
    this.priorityTopics = [...this.skillSummary]
      .filter(s => s.pct < 100)
      .sort((a, b) => a.pct - b.pct)
      .slice(0, 3)
      .map(s => ({
        name: s.name,
        wrongCount: Math.round((1 - s.pct / 100) * this.getSectionTotal(s.name)),
      }));
  }

  private getSectionTotal(name: string): number {
    const map: { [k: string]: number } = {
      'Phát âm & Trọng âm':4, 'Tìm lỗi sai':4, 'Ngữ pháp & Từ vựng':10,
      'Giao tiếp':2, 'Đồng / Trái nghĩa':4, 'Đọc hiểu điền từ':6,
      'Đọc hiểu đoạn văn':4, 'Viết lại câu':6,
    };
    return map[name] ?? 4;
  }

  // ─────────────────────────────────────────────────────────
  // LUỒNG GIẢ LẬP AI (không gọi API thật)
  // Bước 1: Loading 3 steps (3.6s tổng)
  // Bước 2: Streaming text từng ký tự (~2.5s)
  // Bước 3: Hiện kết quả đầy đủ
  // ─────────────────────────────────────────────────────────
  private runSimulatedAnalysis(): void {
    // === BƯỚC 1: Loading steps ===
    this.isLoading       = true;
    this.currentLoadStep = 0;
    this.streamProgress  = 0;

    const stepDelay = 1200; // ms mỗi bước

    for (let i = 1; i < this.loadingSteps.length; i++) {
      const t = setTimeout(() => {
        this.currentLoadStep = i;
        this.streamProgress  = (i / this.loadingSteps.length) * 35;
        this.cdr.markForCheck();
      }, stepDelay * i);
      this.timers.push(t);
    }

    // === BƯỚC 2: Chuyển sang streaming ===
    const streamStart = stepDelay * this.loadingSteps.length + 200;

    const t2 = setTimeout(() => {
      this.isLoading   = false;
      this.isStreaming = true;
      this.streamProgress = 40;
      this.cdr.markForCheck();
      this.typewriterEffect(streamStart);
    }, streamStart);
    this.timers.push(t2);
  }

  // ── Hiệu ứng gõ từng ký tự ───────────────────────────────
  private typewriterEffect(baseDelay: number): void {
    const text     = STREAMING_TEXT;
    const charDelay = 18; // ms mỗi ký tự – đủ nhanh để không quá chậm
    let   charIdx  = 0;

    const typeNext = () => {
      if (charIdx <= text.length) {
        this.streamingText  = text.slice(0, charIdx);
        this.streamProgress = 40 + Math.round((charIdx / text.length) * 50);
        this.cdr.markForCheck();
        charIdx++;

        if (charIdx <= text.length) {
          const t = setTimeout(typeNext, charDelay);
          this.timers.push(t);
        } else {
          // === BƯỚC 3: Hoàn thành, hiện kết quả đầy đủ ===
          const t = setTimeout(() => {
            this.isStreaming    = false;
            this.streamingText  = '';
            this.streamProgress = 100;
            this.analysisResult = MOCK_ANALYSIS;
            this.cdr.markForCheck();
          }, 600);
          this.timers.push(t);
        }
      }
    };

    typeNext();
  }

  // ── Retry (chạy lại toàn bộ giả lập) ─────────────────────
  retryAnalysis(): void {
    this.timers.forEach(t => clearTimeout(t));
    this.timers = [];
    this.hasError       = false;
    this.isLoading      = true;
    this.isStreaming    = false;
    this.streamingText  = '';
    this.streamProgress = 0;
    this.currentLoadStep = 0;
    this.analysisResult  = null;
    this.cdr.markForCheck();
    this.runSimulatedAnalysis();
  }

  // ── Helpers ───────────────────────────────────────────────
  toggleExpand(qNum: number): void {
    this.expandedQ = this.expandedQ === qNum ? null : qNum;
    this.cdr.markForCheck();
  }

  getBarColor(pct: number): string {
    if (pct >= 80) return 'bar-high';
    if (pct >= 60) return 'bar-med';
    return 'bar-low';
  }

  getPctColor(pct: number): string {
    if (pct >= 80) return 'pct-high';
    if (pct >= 60) return 'pct-med';
    return 'pct-low';
  }

  // ── Navigation ────────────────────────────────────────────
  retakeExam():    void { this.router.navigate(['/test']); }
  goToExercises(): void { this.router.navigate(['/ngu-phap']); }
  tryNewExam():    void { this.router.navigate(['/de-thi']); }
}