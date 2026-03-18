import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-grammar',
  standalone: true,
  imports: [RouterLink, NgClass],
  templateUrl: './grammar.component.html',
  styleUrl: './grammar.component.scss',
})
export class GrammarComponent {
  // Sidebar Topics (giống topics trong home)
  sidebarTopics = [
    { id: 'all', name: 'Tất cả', count: 200, icon: '🗂️', active: true },
    { id: 'tenses', name: 'Thì động từ', count: 12, icon: '⏰', active: false },
    { id: 'passive', name: 'Câu bị động', count: 8, icon: '🔄', active: false },
    { id: 'reported', name: 'Câu gián tiếp', count: 6, icon: '💬', active: false },
    { id: 'conditionals', name: 'Câu điều kiện', count: 4, icon: '❓', active: false },
    { id: 'relative', name: 'Mệnh đề quan hệ', count: 5, icon: '📖', active: false },
    { id: 'conjunctions', name: 'Liên từ & Giới từ', count: 9, icon: '🔗', active: false },
    { id: 'word-formation', name: 'Từ loại & Cấu tạo từ', count: 10, icon: '📝', active: false },
    { id: 'reading', name: 'Kỹ năng đọc hiểu', count: 15, icon: '🗣️', active: false },
  ];

  // Sidebar Levels
  sidebarLevels = [
    { id: 'all', name: 'Tất cả', count: 200, active: true },
    { id: 'basic', name: 'Cơ bản', count: 80, color: '🟢', active: false },
    { id: 'advanced', name: 'Nâng cao', count: 90, color: '🟡', active: false },
    { id: 'expert', name: 'Chuyên sâu', count: 30, color: '🔴', active: false },
  ];

  // Filter chips
  filterChips = [
    { id: 'all', name: 'Tất cả', active: true },
    { id: 'theory', name: 'Lý thuyết', active: false },
    { id: 'multiple-choice', name: 'Trắc nghiệm', active: false },
    { id: 'fill-blank', name: 'Điền từ', active: false },
    { id: 'rewrite', name: 'Viết lại câu', active: false },
  ];

  // Progress Topics (giống progress trong home)
  progressTopics = [
    { name: 'Thì động từ', progress: 75 },
    { name: 'Câu bị động', progress: 50 },
    { name: 'Mệnh đề quan hệ', progress: 30 },
    { name: 'Câu điều kiện', progress: 10 },
  ];

  // Grammar Cards (giống examCards trong home)
  grammarCards = [
    { 
      id: 1, 
      title: 'Tổng hợp các thì động từ trong Tiếng Anh', 
      cover: 'gc-blue', 
      tag: '🔥 Hot', 
      tagClass: 'tag-hot',
      subTopics: 12, 
      exercises: 240, 
      views: '58.4k lượt', 
      progress: 75, 
      difficulty: 'Trung bình', 
      difficultyClass: 'diff-medium',
      buttonText: 'Tiếp tục →',
      coverLabel: 'Thì\nĐộng Từ'
    },
    { 
      id: 2, 
      title: 'Câu bị động – Passive Voice toàn tập', 
      cover: 'gc-teal', 
      tag: '🔥 Hot', 
      tagClass: 'tag-hot',
      subTopics: 8, 
      exercises: 160, 
      views: '46.2k lượt', 
      progress: 50, 
      difficulty: 'Trung bình', 
      difficultyClass: 'diff-medium',
      buttonText: 'Tiếp tục →',
      coverLabel: 'Câu\nBị Động'
    },
    { 
      id: 3, 
      title: 'Câu tường thuật – Reported Speech', 
      cover: 'gc-violet', 
      tag: '✨ Mới', 
      tagClass: 'tag-new',
      subTopics: 6, 
      exercises: 120, 
      views: '32.7k lượt', 
      progress: 0, 
      difficulty: 'Khó', 
      difficultyClass: 'diff-hard',
      buttonText: 'Học ngay →',
      coverLabel: 'Câu\nGián Tiếp'
    },
    { 
      id: 4, 
      title: 'Câu điều kiện – Conditional Sentences', 
      cover: 'gc-rose', 
      tag: 'Miễn phí', 
      tagClass: 'tag-free',
      subTopics: 4, 
      exercises: 80, 
      views: '28.9k lượt', 
      progress: 10, 
      difficulty: 'Khó', 
      difficultyClass: 'diff-hard',
      buttonText: 'Học ngay →',
      coverLabel: 'Câu\nĐiều Kiện'
    },
    { 
      id: 5, 
      title: 'Mệnh đề quan hệ – Relative Clauses', 
      cover: 'gc-indigo', 
      tag: '🔥 Hot', 
      tagClass: 'tag-hot',
      subTopics: 5, 
      exercises: 100, 
      views: '24.1k lượt', 
      progress: 30, 
      difficulty: 'Trung bình', 
      difficultyClass: 'diff-medium',
      buttonText: 'Tiếp tục →',
      coverLabel: 'Mệnh Đề\nQuan Hệ'
    },
    { 
      id: 6, 
      title: 'Liên từ, giới từ và cụm từ quan trọng', 
      cover: 'gc-emerald', 
      tag: '✨ Mới', 
      tagClass: 'tag-new',
      subTopics: 9, 
      exercises: 180, 
      views: '19.6k lượt', 
      progress: 0, 
      difficulty: 'Dễ', 
      difficultyClass: 'diff-easy',
      buttonText: 'Học ngay →',
      coverLabel: 'Liên Từ &\nGiới Từ'
    },
  ];

  // Lesson Cards (giống features trong home)
  lessons = [
    {
      icon: '⏰',
      title: '12 Thì trong Tiếng Anh',
      description: 'Công thức, cách dùng và dấu hiệu nhận biết từng thì. Ví dụ minh họa chi tiết, bài tập đi kèm.',
      lessons: 12,
      exercises: 240,
      badge: 'Cơ bản',
      badgeClass: 'lb-blue'
    },
    {
      icon: '🔄',
      title: 'Câu Bị Động – Passive Voice',
      description: 'Cách chuyển câu chủ động sang bị động trong tất cả các thì. Đặc biệt chú ý câu hỏi và câu phủ định.',
      lessons: 8,
      exercises: 160,
      badge: 'Nâng cao',
      badgeClass: 'lb-amber'
    },
    {
      icon: '💬',
      title: 'Câu Gián Tiếp – Reported Speech',
      description: 'Quy tắc lùi thì, thay đổi đại từ và trạng từ. Gián tiếp với câu hỏi, câu mệnh lệnh và câu yêu cầu.',
      lessons: 6,
      exercises: 120,
      badge: 'Nâng cao',
      badgeClass: 'lb-amber'
    },
    {
      icon: '❓',
      title: 'Câu Điều Kiện – Conditionals',
      description: 'Câu điều kiện loại 0, 1, 2, 3 và hỗn hợp. Cách dùng wish và unless. Bài tập viết lại câu thường gặp.',
      lessons: 4,
      exercises: 80,
      badge: 'Nâng cao',
      badgeClass: 'lb-amber'
    },
    {
      icon: '📖',
      title: 'Mệnh Đề Quan Hệ',
      description: 'Who, which, that, whom, whose, where, when – cách dùng và phân biệt mệnh đề xác định và không xác định.',
      lessons: 5,
      exercises: 100,
      badge: 'Nâng cao',
      badgeClass: 'lb-amber'
    },
    {
      icon: '📝',
      title: 'Từ Loại & Cấu Tạo Từ',
      description: 'Danh từ, động từ, tính từ, trạng từ – quy tắc thêm hậu tố và tiền tố. Rất thường gặp trong phần điền từ.',
      lessons: 10,
      exercises: 200,
      badge: 'Cơ bản',
      badgeClass: 'lb-green'
    }
  ];

  // All Topics list (giống topics trong home)
  allTopics = [
    { emoji: '⏰', name: 'Thì hiện tại đơn & hiện tại tiếp diễn', subTopics: 2, exercises: 48 },
    { emoji: '📅', name: 'Thì quá khứ đơn & quá khứ tiếp diễn', subTopics: 2, exercises: 52 },
    { emoji: '🔮', name: 'Thì tương lai – will, going to, hiện tại', subTopics: 3, exercises: 60 },
    { emoji: '✅', name: 'Thì hiện tại hoàn thành', subTopics: 2, exercises: 44 },
    { emoji: '🔄', name: 'Câu bị động – các thì cơ bản', subTopics: 4, exercises: 80 },
    { emoji: '🔃', name: 'Câu bị động đặc biệt (modal, V-ing)', subTopics: 4, exercises: 80 },
    { emoji: '💬', name: 'Câu tường thuật – câu trần thuật', subTopics: 2, exercises: 40 },
    { emoji: '🗨️', name: 'Câu tường thuật – câu hỏi & mệnh lệnh', subTopics: 4, exercises: 80 },
    { emoji: '❓', name: 'Câu điều kiện loại 1 & 2', subTopics: 2, exercises: 40 },
    { emoji: '🔀', name: 'Câu điều kiện loại 3 & hỗn hợp', subTopics: 2, exercises: 40 },
    { emoji: '📖', name: 'Mệnh đề quan hệ – xác định', subTopics: 2, exercises: 40 },
    { emoji: '📗', name: 'Mệnh đề quan hệ – không xác định & rút gọn', subTopics: 3, exercises: 60 },
    { emoji: '🔗', name: 'Liên từ kết hợp, tương quan & phụ', subTopics: 4, exercises: 80 },
    { emoji: '📍', name: 'Giới từ chỉ thời gian, nơi chốn, cách thức', subTopics: 5, exercises: 100 },
    { emoji: '📝', name: 'Từ loại: danh từ, tính từ, trạng từ', subTopics: 5, exercises: 100 },
    { emoji: '🔤', name: 'Cấu tạo từ – tiền tố & hậu tố', subTopics: 5, exercises: 100 }
  ];

  // Blog Items (giống blogItems trong home)
  blogItems = [
    {
      title: 'Tổng hợp 50 cấu trúc ngữ pháp quan trọng nhất thường gặp trong đề thi lớp 10',
      meta: '📅 14/03/2026 · ⏱ 8 phút đọc · 👁 12.4k lượt xem',
      emoji: '📰',
      thumbClass: 'blog-thumb-sky',
    },
    {
      title: 'Phân biệt câu bị động và câu chủ động – cách làm đúng 100% trong bài thi',
      meta: '📅 11/03/2026 · ⏱ 6 phút đọc · 👁 9.1k lượt xem',
      emoji: '💡',
      thumbClass: 'blog-thumb-amber',
    },
    {
      title: 'Bí quyết phân biệt 12 thì động từ – không bao giờ nhầm lẫn nữa!',
      meta: '📅 09/03/2026 · ⏱ 7 phút đọc · 👁 15.3k lượt xem',
      emoji: '📚',
      thumbClass: 'blog-thumb-green',
    },
    {
      title: 'Hướng dẫn làm dạng bài viết lại câu sử dụng câu điều kiện – 5 bước chuẩn',
      meta: '📅 07/03/2026 · ⏱ 5 phút đọc · 👁 8.6k lượt xem',
      emoji: '🎯',
      thumbClass: 'blog-thumb-purple',
    }
  ];

  // Leaderboard (giống leaderboard trong home)
  leaderboard = [
    { rank: '🥇', rankClass: 'rank-1', name: 'Nguyễn Minh Anh', score: 'Hà Nội · 52 bài', points: '9,920', initial: 'N', avatarBg: 'linear-gradient(135deg,#0ea5e9,#38bdf8)' },
    { rank: '🥈', rankClass: 'rank-2', name: 'Trần Thị Lan', score: 'TP.HCM · 47 bài', points: '9,500', initial: 'T', avatarBg: 'linear-gradient(135deg,#10b981,#34d399)' },
    { rank: '🥉', rankClass: 'rank-3', name: 'Lê Hoàng Nam', score: 'Đà Nẵng · 44 bài', points: '9,210', initial: 'L', avatarBg: 'linear-gradient(135deg,#f59e0b,#fcd34d)' },
    { rank: '4', rankClass: 'rank-other', name: 'Phạm Thu Hà', score: 'Huế · 40 bài', points: '8,890', initial: 'P', avatarBg: 'linear-gradient(135deg,#8b5cf6,#a78bfa)' },
    { rank: '5', rankClass: 'rank-other', name: 'Vũ Đức Hùng', score: 'Hải Phòng · 38 bài', points: '8,430', initial: 'V', avatarBg: 'linear-gradient(135deg,#ec4899,#f9a8d4)' },
  ];

  // Schedule (giống schedule trong home)
  schedule = [
    { week: 'T1', weekLabel: 'Tuần 1', title: 'Thì động từ & Câu bị động', details: '12 chủ điểm · 240 bài tập', bgClass: 'schedule-sky', colorClass: 'sky' },
    { week: 'T2', weekLabel: 'Tuần 2', title: 'Câu gián tiếp & Điều kiện', details: '10 chủ điểm · 200 bài tập', bgClass: 'schedule-amber', colorClass: 'amber' },
    { week: 'T3', weekLabel: 'Tuần 3', title: 'Mệnh đề & Từ loại', details: '15 chủ điểm · 300 bài tập', bgClass: 'schedule-green', colorClass: 'green' },
    { week: 'T4', weekLabel: 'Tuần 4', title: 'Luyện đề tổng hợp cuối', details: 'Ôn tập toàn bộ + thi thử', bgClass: 'schedule-purple', colorClass: 'purple' }
  ];

  // Tabs (giống tabs trong home)
  tabs = [
    { id: 'all', label: 'Tất cả', active: true },
    { id: 'tenses', label: 'Thì động từ', active: false },
    { id: 'passive', label: 'Câu bị động', active: false },
    { id: 'conditionals', label: 'Câu điều kiện', active: false },
    { id: 'reported', label: 'Câu gián tiếp', active: false },
    { id: 'relative', label: 'Mệnh đề quan hệ', active: false }
  ];

  // UI State
  activeTab = 'all';
  activeFilter = 'all';
  currentPage = 1;
  viewMode: 'grid' | 'list' = 'grid';
  totalItems = 200;
  totalPages = 10;

  // Methods (giống home)
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

  setActiveSidebarLevel(levelId: string): void {
    this.sidebarLevels.forEach(level => level.active = level.id === levelId);
  }

  setViewMode(mode: 'grid' | 'list'): void {
    this.viewMode = mode;
  }

  changePage(page: number): void {
    this.currentPage = page;
    // Fetch data for new page
  }
}