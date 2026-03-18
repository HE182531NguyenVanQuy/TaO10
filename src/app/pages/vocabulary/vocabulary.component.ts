import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-vocabulary',
  standalone: true,
  imports: [RouterLink, NgClass],
  templateUrl: './vocabulary.component.html',
  styleUrl: './vocabulary.component.scss',
})
export class VocabularyComponent {
  // Sidebar Topics
  sidebarTopics = [
    { id: 'all', name: 'Tất cả', count: 30, icon: '🗂️', active: true },
    { id: 'family', name: 'Gia đình & Nhà cửa', count: 120, icon: '🏡', active: false },
    { id: 'environment', name: 'Môi trường & Thiên nhiên', count: 150, icon: '🌍', active: false },
    { id: 'technology', name: 'Công nghệ & Khoa học', count: 130, icon: '💻', active: false },
    { id: 'education', name: 'Giáo dục & Nghề nghiệp', count: 140, icon: '🏫', active: false },
    { id: 'society', name: 'Xã hội & Cộng đồng', count: 110, icon: '🌐', active: false },
    { id: 'culture', name: 'Văn hóa & Nghệ thuật', count: 100, icon: '🎨', active: false },
    { id: 'health', name: 'Sức khỏe & Thể thao', count: 120, icon: '🏥', active: false },
    { id: 'travel', name: 'Du lịch & Giao thông', count: 90, icon: '✈️', active: false },
    { id: 'food', name: 'Ẩm thực & Nấu ăn', count: 80, icon: '🍜', active: false },
  ];

  // Filter chips
  filterChips = [
    { id: 'all', name: 'Tất cả', active: true },
    { id: 'noun', name: 'Danh từ', active: false },
    { id: 'verb', name: 'Động từ', active: false },
    { id: 'adjective', name: 'Tính từ', active: false },
    { id: 'adverb', name: 'Trạng từ', active: false },
  ];

  // Practice types
  practiceTypes = [
    { id: 'all', name: 'Tất cả', count: 3000, active: true },
    { id: 'flashcard', name: 'Flashcard', count: 3000, icon: '🃏', active: false },
    { id: 'fill-blank', name: 'Điền từ vào chỗ trống', count: 200, icon: '✏️', active: false },
    { id: 'synonym', name: 'Từ đồng / trái nghĩa', count: 150, icon: '🔤', active: false },
    { id: 'matching', name: 'Ghép từ với nghĩa', count: 100, icon: '🧩', active: false },
  ];

  // Progress Topics
  progressTopics = [
    { name: 'Gia đình & Nhà cửa', progress: 80 },
    { name: 'Môi trường & Thiên nhiên', progress: 55 },
    { name: 'Công nghệ & Khoa học', progress: 40 },
    { name: 'Sức khỏe & Thể thao', progress: 20 },
  ];

  // Vocabulary Topic Cards
  vocabCards = [
    {
      id: 1,
      title: 'Từ vựng chủ đề Môi trường & Bảo vệ thiên nhiên',
      cover: 'vc-emerald',
      tag: '🔥 Hot',
      tagClass: 'tag-hot',
      coverLabel: '🌍 Môi\nTrường',
      words: 150,
      exercises: 'Flashcard',
      views: '38.4k lượt',
      progress: 55,
      difficulty: 'Trung bình',
      difficultyClass: 'diff-medium',
      buttonText: 'Tiếp tục →'
    },
    {
      id: 2,
      title: 'Từ vựng chủ đề Công nghệ & Khoa học hiện đại',
      cover: 'vc-indigo',
      tag: '🔥 Hot',
      tagClass: 'tag-hot',
      coverLabel: '💻 Công\nNghệ',
      words: 130,
      exercises: 'Flashcard',
      views: '32.7k lượt',
      progress: 40,
      difficulty: 'Khó',
      difficultyClass: 'diff-hard',
      buttonText: 'Tiếp tục →'
    },
    {
      id: 3,
      title: 'Từ vựng chủ đề Giáo dục & Nghề nghiệp tương lai',
      cover: 'vc-blue',
      tag: 'Miễn phí',
      tagClass: 'tag-free',
      coverLabel: '🏫 Giáo\nDục',
      words: 140,
      exercises: 'Flashcard',
      views: '27.1k lượt',
      progress: 80,
      difficulty: 'Dễ',
      difficultyClass: 'diff-easy',
      buttonText: 'Xem kết quả →'
    },
    {
      id: 4,
      title: 'Từ vựng chủ đề Xã hội & Các vấn đề cộng đồng',
      cover: 'vc-teal',
      tag: '✨ Mới',
      tagClass: 'tag-new',
      coverLabel: '🌐 Xã\nHội',
      words: 110,
      exercises: 'Flashcard',
      views: '19.8k lượt',
      progress: 0,
      difficulty: 'Trung bình',
      difficultyClass: 'diff-medium',
      buttonText: 'Học ngay →'
    },
    {
      id: 5,
      title: 'Từ vựng chủ đề Sức khỏe, Thể thao & Dinh dưỡng',
      cover: 'vc-rose',
      tag: 'Miễn phí',
      tagClass: 'tag-free',
      coverLabel: '🏥 Sức\nKhỏe',
      words: 120,
      exercises: 'Flashcard',
      views: '16.3k lượt',
      progress: 20,
      difficulty: 'Dễ',
      difficultyClass: 'diff-easy',
      buttonText: 'Tiếp tục →'
    },
    {
      id: 6,
      title: 'Từ vựng chủ đề Văn hóa, Nghệ thuật & Lễ hội',
      cover: 'vc-amber',
      tag: '✨ Mới',
      tagClass: 'tag-new',
      coverLabel: '🎨 Văn\nHóa',
      words: 100,
      exercises: 'Flashcard',
      views: '11.9k lượt',
      progress: 0,
      difficulty: 'Trung bình',
      difficultyClass: 'diff-medium',
      buttonText: 'Học ngay →'
    }
  ];

  // Word List
  wordList = [
    {
      id: 1,
      word: 'environment',
      phonetic: '/ɪnˈvaɪ.rən.mənt/',
      type: 'n.',
      typeClass: 'wt-n',
      meaning: 'môi trường',
      example: '"We must protect our environment for future generations."',
      starred: true
    },
    {
      id: 2,
      word: 'pollution',
      phonetic: '/pəˈluː.ʃən/',
      type: 'n.',
      typeClass: 'wt-n',
      meaning: 'sự ô nhiễm',
      example: '"Air pollution is a serious problem in big cities."',
      starred: false
    },
    {
      id: 3,
      word: 'technology',
      phonetic: '/tekˈnɒl.ə.dʒi/',
      type: 'n.',
      typeClass: 'wt-n',
      meaning: 'công nghệ',
      example: '"Modern technology has changed our daily lives."',
      starred: true
    },
    {
      id: 4,
      word: 'renewable',
      phonetic: '/rɪˈnjuː.ə.bəl/',
      type: 'adj.',
      typeClass: 'wt-adj',
      meaning: 'có thể tái tạo được',
      example: '"Solar energy is a renewable source of power."',
      starred: false
    },
    {
      id: 5,
      word: 'community',
      phonetic: '/kəˈmjuː.nɪ.ti/',
      type: 'n.',
      typeClass: 'wt-n',
      meaning: 'cộng đồng',
      example: '"She volunteers to help the local community."',
      starred: false
    },
    {
      id: 6,
      word: 'sustainable',
      phonetic: '/səˈsteɪ.nə.bəl/',
      type: 'adj.',
      typeClass: 'wt-adj',
      meaning: 'bền vững',
      example: '"We need sustainable solutions to climate change."',
      starred: true
    },
    {
      id: 7,
      word: 'volunteer',
      phonetic: '/ˌvɒl.ənˈtɪər/',
      type: 'v.',
      typeClass: 'wt-v',
      meaning: 'tình nguyện',
      example: '"Many students volunteer at local hospitals."',
      starred: false
    },
    {
      id: 8,
      word: 'effectively',
      phonetic: '/ɪˈfek.tɪv.li/',
      type: 'adv.',
      typeClass: 'wt-adv',
      meaning: 'một cách hiệu quả',
      example: '"She communicates effectively with everyone."',
      starred: false
    }
  ];

  // All Topics List
  allTopics = [
    { emoji: '🏡', name: 'Gia đình & Nhà cửa', words: 120, flashcards: 3 },
    { emoji: '🌍', name: 'Môi trường & Thiên nhiên', words: 150, flashcards: 4 },
    { emoji: '💻', name: 'Công nghệ & Khoa học', words: 130, flashcards: 3 },
    { emoji: '🏫', name: 'Giáo dục & Nghề nghiệp', words: 140, flashcards: 4 },
    { emoji: '🌐', name: 'Xã hội & Cộng đồng', words: 110, flashcards: 3 },
    { emoji: '🎨', name: 'Văn hóa & Nghệ thuật', words: 100, flashcards: 2 },
    { emoji: '🏥', name: 'Sức khỏe & Thể thao', words: 120, flashcards: 3 },
    { emoji: '✈️', name: 'Du lịch & Giao thông', words: 90, flashcards: 2 },
    { emoji: '🍜', name: 'Ẩm thực & Nấu ăn', words: 80, flashcards: 2 },
    { emoji: '🏙️', name: 'Thành phố & Nông thôn', words: 95, flashcards: 2 },
    { emoji: '💼', name: 'Kinh tế & Thương mại', words: 85, flashcards: 2 },
    { emoji: '🤝', name: 'Quan hệ & Giao tiếp', words: 70, flashcards: 2 },
  ];

  // Blog Items
  blogItems = [
    {
      title: 'Top 200 từ vựng thường gặp nhất trong đề thi Tiếng Anh tuyển sinh lớp 10 Hà Nội 2020–2025',
      meta: '📅 16/03/2026 · ⏱ 10 phút đọc · 👁 18.6k lượt xem',
      emoji: '📰',
      thumbClass: 'blog-thumb-sky',
    },
    {
      title: 'Phương pháp học từ vựng hiệu quả bằng Spaced Repetition – nhớ lâu hơn 300%',
      meta: '📅 13/03/2026 · ⏱ 6 phút đọc · 👁 11.2k lượt xem',
      emoji: '💡',
      thumbClass: 'blog-thumb-amber',
    },
    {
      title: 'Phân biệt 50 cặp từ đồng nghĩa dễ nhầm trong đề thi – kèm ví dụ cụ thể',
      meta: '📅 10/03/2026 · ⏱ 8 phút đọc · 👁 9.4k lượt xem',
      emoji: '📚',
      thumbClass: 'blog-thumb-green',
    },
    {
      title: 'Hướng dẫn làm dạng bài từ đồng / trái nghĩa và điền từ – chiến thuật đạt điểm tối đa',
      meta: '📅 08/03/2026 · ⏱ 5 phút đọc · 👁 7.8k lượt xem',
      emoji: '🎯',
      thumbClass: 'blog-thumb-purple',
    }
  ];

  // Leaderboard
  leaderboard = [
    { rank: '🥇', rankClass: 'rank-1', name: 'Nguyễn Minh Anh', score: 'Hà Nội · 480 từ', points: '9,760', initial: 'N', avatarBg: 'linear-gradient(135deg,#0ea5e9,#38bdf8)' },
    { rank: '🥈', rankClass: 'rank-2', name: 'Trần Thị Lan', score: 'TP.HCM · 450 từ', points: '9,310', initial: 'T', avatarBg: 'linear-gradient(135deg,#10b981,#34d399)' },
    { rank: '🥉', rankClass: 'rank-3', name: 'Lê Hoàng Nam', score: 'Đà Nẵng · 420 từ', points: '9,050', initial: 'L', avatarBg: 'linear-gradient(135deg,#f59e0b,#fcd34d)' },
    { rank: '4', rankClass: 'rank-other', name: 'Phạm Thu Hà', score: 'Huế · 390 từ', points: '8,640', initial: 'P', avatarBg: 'linear-gradient(135deg,#8b5cf6,#a78bfa)' },
    { rank: '5', rankClass: 'rank-other', name: 'Vũ Đức Hùng', score: 'Hải Phòng · 360 từ', points: '8,190', initial: 'V', avatarBg: 'linear-gradient(135deg,#ec4899,#f9a8d4)' },
  ];

  // Study Plan
  studyPlan = [
    { week: 'T1', weekLabel: 'Tuần 1', title: 'Môi trường & Công nghệ', details: '280 từ · 7 bộ flashcard', bgClass: 'schedule-sky' },
    { week: 'T2', weekLabel: 'Tuần 2', title: 'Giáo dục & Xã hội', details: '250 từ · 6 bộ flashcard', bgClass: 'schedule-amber' },
    { week: 'T3', weekLabel: 'Tuần 3', title: 'Sức khỏe & Văn hóa', details: '220 từ · 5 bộ flashcard', bgClass: 'schedule-green' },
    { week: 'T4', weekLabel: 'Tuần 4', title: 'Ôn tập & Kiểm tra tổng hợp', details: 'Flashcard + bài tập điền từ', bgClass: 'schedule-purple' }
  ];

  // Tabs
  tabs = [
    { id: 'all', label: 'Tất cả', active: true },
    { id: 'topic', label: 'Theo chủ đề', active: false },
    { id: 'unit', label: 'Theo Unit SGK', active: false },
    { id: 'exam', label: 'Từ hay gặp trong đề', active: false },
    { id: 'learned', label: 'Đã học', active: false }
  ];

  // UI State
  activeTab = 'all';
  activeFilter = 'all';
  currentPage = 1;
  viewMode: 'grid' | 'list' = 'grid';
  totalItems = 3000;
  totalPages = 8;

  // Methods
  setActiveTab(tabId: string): void {
    this.activeTab = tabId;
    this.tabs.forEach(tab => tab.active = tab.id === tabId);
  }

  setActiveFilter(filterId: string): void {
    this.activeFilter = filterId;
    this.filterChips.forEach(chip => chip.active = chip.id === filterId);
  }

  setActiveSidebarTopic(topicId: string): void {
    this.sidebarTopics.forEach(topic => topic.active = topic.id === topicId);
  }

  setActivePracticeType(typeId: string): void {
    this.practiceTypes.forEach(type => type.active = type.id === typeId);
  }

  setViewMode(mode: 'grid' | 'list'): void {
    this.viewMode = mode;
  }

  changePage(page: number): void {
    this.currentPage = page;
  }

  toggleStar(wordId: number): void {
    const word = this.wordList.find(w => w.id === wordId);
    if (word) {
      word.starred = !word.starred;
    }
  }
}