import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface StatItem {
  icon: string;
  number: string;
  label: string;
}

interface DocumentType {
  icon: string;
  name: string;
  description: string;
  count: string;
  colorClass: string;
}

interface DocCard {
  id: number;
  coverEmoji: string;
  coverType: string;
  coverGradient: string;
  title: string;
  pages: string;
  downloads: string;
  rating: string;
  description: string;
  fileType: string;
  tag?: string;
}

interface VideoCard {
  id: number;
  title: string;
  duration: string;
  views: string;
  rating: string;
  date: string;
  coverGradient: string;
  tag?: string;
}

interface BlogCard {
  id: number;
  emoji: string;
  title: string;
  date: string;
  readTime: string;
  views: string;
}

interface TopicItem {
  emoji: string;
  name: string;
  count: string;
}

interface LeaderboardItem {
  rank: number;
  emoji: string;
  title: string;
  meta: string;
  downloads: string;
  rankClass: string;
}

@Component({
  selector: 'app-tai-lieu',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss'],
})
export class DocumentComponent implements OnInit {
  activeTab = 'Tất cả';
  activeDocType = 'all';
  activeDifficulty = 'all';
  sortBy = 'Mới nhất';

  statsData: StatItem[] = [
    { icon: '📋', number: '500+', label: 'Tài liệu tổng hợp' },
    { icon: '🎬', number: '200+', label: 'Video bài giảng' },
    { icon: '📥', number: '1.2M+', label: 'Lượt tải xuống' },
    { icon: '✅', number: '100%', label: 'Miễn phí tải về' },
  ];

  documentTypes: DocumentType[] = [
    {
      icon: '📋',
      name: 'Đề cương ôn tập',
      description: 'Đề cương tổng hợp ngữ pháp, từ vựng và kỹ năng theo chuẩn Bộ GD&ĐT',
      count: '80 tài liệu',
      colorClass: 'dtc-blue',
    },
    {
      icon: '📖',
      name: 'Sách tham khảo',
      description: 'Sách luyện thi, sách bài tập có đáp án, giáo trình ôn luyện chất lượng cao',
      count: '60 tài liệu',
      colorClass: 'dtc-amber',
    },
    {
      icon: '🎬',
      name: 'Video bài giảng',
      description: 'Video giải thích ngữ pháp, luyện phát âm và hướng dẫn làm bài chi tiết',
      count: '200 video',
      colorClass: 'dtc-green',
    },
    {
      icon: '🗺️',
      name: 'Sơ đồ tư duy',
      description: 'Mindmap trực quan tóm tắt toàn bộ ngữ pháp và từ vựng trọng tâm',
      count: '40 sơ đồ',
      colorClass: 'dtc-violet',
    },
  ];

  docCards: DocCard[] = [
    {
      id: 1,
      coverEmoji: '📋',
      coverType: 'Đề cương',
      coverGradient: 'dcc-blue',
      title: 'Đề cương ôn tập Ngữ pháp Tiếng Anh lớp 9 – Chuẩn thi lớp 10 năm 2026',
      pages: '📄 45 trang',
      downloads: '📥 28.4k lượt',
      rating: '⭐ 4.9',
      description:
        'Tổng hợp đầy đủ 8 chủ điểm ngữ pháp trọng tâm, kèm bài tập minh họa và đáp án chi tiết.',
      fileType: 'PDF',
      tag: 'Hot',
    },
    {
      id: 2,
      coverEmoji: '📖',
      coverType: 'Từ vựng',
      coverGradient: 'dcc-emerald',
      title: '3000 từ vựng trọng tâm lớp 9–10 theo chủ đề – Có phiên âm & nghĩa',
      pages: '📄 80 trang',
      downloads: '📥 24.1k lượt',
      rating: '⭐ 4.8',
      description: 'Bộ từ vựng phân loại theo 15 chủ đề, có phiên âm IPA và câu ví dụ thực tế.',
      fileType: 'PDF',
      tag: 'Hot',
    },
    {
      id: 3,
      coverEmoji: '📝',
      coverType: 'Bài tập',
      coverGradient: 'dcc-violet',
      title: 'Bộ bài tập Ngữ pháp tổng hợp có đáp án – 500 câu trắc nghiệm',
      pages: '📄 60 trang',
      downloads: '📥 18.7k lượt',
      rating: '⭐ 4.7',
      description:
        '500 câu trắc nghiệm ngữ pháp phân loại theo dạng bài, kèm giải thích chi tiết từng đáp án.',
      fileType: 'DOCX',
      tag: 'Free',
    },
    {
      id: 4,
      coverEmoji: '🗺️',
      coverType: 'Sơ đồ',
      coverGradient: 'dcc-amber',
      title: 'Sơ đồ tư duy 12 thì động từ Tiếng Anh – Màu sắc trực quan dễ nhớ',
      pages: '📄 12 trang',
      downloads: '📥 19.8k lượt',
      rating: '⭐ 4.9',
      description:
        'Mindmap trực quan tổng hợp công thức, cách dùng và dấu hiệu nhận biết 12 thì động từ.',
      fileType: 'PDF',
      tag: 'New',
    },
    {
      id: 5,
      coverEmoji: '📌',
      coverType: 'Viết lại câu',
      coverGradient: 'dcc-rose',
      title: 'Tổng hợp công thức viết lại câu thường gặp trong đề thi lớp 10',
      pages: '📄 28 trang',
      downloads: '📥 13.7k lượt',
      rating: '⭐ 4.8',
      description:
        '20 dạng viết lại câu phổ biến nhất, kèm công thức, ví dụ minh họa và bài tập luyện tập.',
      fileType: 'PDF',
      tag: 'Hot',
    },
    {
      id: 6,
      coverEmoji: '📊',
      coverType: 'Đề thi',
      coverGradient: 'dcc-teal',
      title: 'Bộ 50 đề thi thử vào lớp 10 Hà Nội 2023–2026 – Kèm đáp án chi tiết',
      pages: '📄 200 trang',
      downloads: '📥 16.2k lượt',
      rating: '⭐ 4.9',
      description: 'Tổng hợp đề thi thử của các trường THCS Hà Nội, đã có đáp án và thang điểm chuẩn.',
      fileType: 'ZIP',
      tag: 'Free',
    },
  ];

  videoCards: VideoCard[] = [
    {
      id: 1,
      title: 'Tổng hợp 12 Thì Động Từ trong 40 phút – Học một lần nhớ mãi',
      duration: '42:18',
      views: '👁 86.4k lượt xem',
      rating: '⭐ 4.9',
      date: '📅 10/03/2026',
      coverGradient: 'vt-dark-blue',
      tag: 'Hot',
    },
    {
      id: 2,
      title: 'Câu Bị Động – Passive Voice toàn tập từ cơ bản đến nâng cao',
      duration: '35:50',
      views: '👁 64.2k lượt xem',
      rating: '⭐ 4.8',
      date: '📅 12/03/2026',
      coverGradient: 'vt-dark-green',
      tag: 'New',
    },
    {
      id: 3,
      title: 'Chiến thuật làm bài Đọc hiểu đạt điểm tối đa – 3 bước đơn giản',
      duration: '28:44',
      views: '👁 48.7k lượt xem',
      rating: '⭐ 4.9',
      date: '📅 14/03/2026',
      coverGradient: 'vt-dark-violet',
      tag: 'Free',
    },
    {
      id: 4,
      title: 'Giải đề thi tuyển sinh lớp 10 Hà Nội 2025 – Phân tích từng câu',
      duration: '55:12',
      views: '👁 72.3k lượt xem',
      rating: '⭐ 5.0',
      date: '📅 08/03/2026',
      coverGradient: 'vt-dark-rose',
      tag: 'Hot',
    },
    {
      id: 5,
      title: 'Phát âm chuẩn 44 âm IPA – Luyện phát âm từ đầu trong 20 phút',
      duration: '22:30',
      views: '👁 31.5k lượt xem',
      rating: '⭐ 4.7',
      date: '📅 16/03/2026',
      coverGradient: 'vt-dark-amber',
      tag: 'New',
    },
    {
      id: 6,
      title: 'Câu Điều Kiện – Conditionals loại 1, 2, 3 và hỗn hợp chi tiết',
      duration: '38:05',
      views: '👁 41.8k lượt xem',
      rating: '⭐ 4.8',
      date: '📅 06/03/2026',
      coverGradient: 'vt-dark-teal',
      tag: 'Free',
    },
  ];

  topicsList: TopicItem[] = [
    { emoji: '⏰', name: 'Ngữ pháp – Thì động từ', count: '28 tài liệu · PDF + Video' },
    { emoji: '🔄', name: 'Ngữ pháp – Câu bị động', count: '20 tài liệu · PDF + Mindmap' },
    { emoji: '❓', name: 'Ngữ pháp – Câu điều kiện', count: '15 tài liệu · PDF + Video' },
    { emoji: '💬', name: 'Ngữ pháp – Câu gián tiếp', count: '14 tài liệu · PDF + DOCX' },
    { emoji: '📖', name: 'Kỹ năng Đọc hiểu', count: '30 tài liệu · PDF + Video' },
    { emoji: '🎧', name: 'Kỹ năng Nghe hiểu', count: '22 tài liệu · MP3 + PDF' },
    { emoji: '✍️', name: 'Kỹ năng Viết lại câu', count: '25 tài liệu · PDF + DOCX' },
    { emoji: '📝', name: 'Viết đoạn văn theo chủ đề', count: '18 tài liệu · PDF + Mẫu' },
    { emoji: '🌍', name: 'Từ vựng – Môi trường', count: '12 tài liệu · PDF + Flashcard' },
    { emoji: '💻', name: 'Từ vựng – Công nghệ', count: '10 tài liệu · PDF + Flashcard' },
    { emoji: '📋', name: 'Đề thi chính thức Hà Nội 2020–2025', count: '40 tài liệu · PDF có đáp án' },
    { emoji: '🗺️', name: 'Sơ đồ tư duy Ngữ pháp', count: '40 mindmap · PDF màu đẹp' },
  ];

  blogCards: BlogCard[] = [
    {
      id: 1,
      emoji: '📰',
      title: 'Công bố cấu trúc đề thi tuyển sinh vào lớp 10 Hà Nội năm 2026 – Những thay đổi cần biết',
      date: '📅 17/03/2026',
      readTime: '⏱ 5 phút đọc',
      views: '👁 22.4k lượt xem',
    },
    {
      id: 2,
      emoji: '💡',
      title: 'Top 10 tài liệu ôn thi lớp 10 Tiếng Anh được tải nhiều nhất tháng 3/2026',
      date: '📅 15/03/2026',
      readTime: '⏱ 4 phút đọc',
      views: '👁 16.8k lượt xem',
    },
    {
      id: 3,
      emoji: '📚',
      title: 'Lịch thi tuyển sinh vào lớp 10 các tỉnh thành năm 2026 – Cập nhật mới nhất',
      date: '📅 12/03/2026',
      readTime: '⏱ 3 phút đọc',
      views: '👁 34.1k lượt xem',
    },
    {
      id: 4,
      emoji: '🎯',
      title: 'Hướng dẫn sử dụng kho tài liệu TaO10 hiệu quả nhất cho học sinh lớp 9',
      date: '📅 09/03/2026',
      readTime: '⏱ 6 phút đọc',
      views: '👁 11.3k lượt xem',
    },
  ];

  leaderboardItems: LeaderboardItem[] = [
    {
      rank: 1,
      emoji: '📋',
      title: 'Đề cương ngữ pháp 2026',
      meta: 'PDF · 45 trang',
      downloads: '28.4k',
      rankClass: 'rank-1',
    },
    {
      rank: 2,
      emoji: '📖',
      title: '3000 từ vựng trọng tâm',
      meta: 'PDF · 80 trang',
      downloads: '24.1k',
      rankClass: 'rank-2',
    },
    {
      rank: 3,
      emoji: '🗺️',
      title: 'Sơ đồ tư duy 12 thì',
      meta: 'PDF · 12 trang',
      downloads: '19.8k',
      rankClass: 'rank-3',
    },
    {
      rank: 4,
      emoji: '📝',
      title: 'Bộ 50 đề thi thử 2026',
      meta: 'ZIP · 200 trang',
      downloads: '16.2k',
      rankClass: 'rank-other',
    },
    {
      rank: 5,
      emoji: '📌',
      title: 'Công thức viết lại câu',
      meta: 'PDF · 28 trang',
      downloads: '13.7k',
      rankClass: 'rank-other',
    },
  ];

  tabs = ['Tất cả', '📋 Đề cương', '📖 Sách & GT', '🎬 Video', '🗺️ Sơ đồ tư duy', '📝 Bài tập'];
  sortOptions = ['Mới nhất', 'Tải nhiều nhất', 'Đánh giá cao nhất', 'Tên A–Z'];
  difficultiesOptions = ['Tất cả', 'Dễ', 'Trung bình', 'Khó'];

  ngOnInit(): void {
    this.initFadeUpAnimation();
  }

  initFadeUpAnimation(): void {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              (e.target as HTMLElement).style.animationPlayState = 'running';
              obs.unobserve(e.target);
            }
          });
        },
        { threshold: 0.08 }
      );

      document.querySelectorAll('.fade-up').forEach((el) => {
        (el as HTMLElement).style.animationPlayState = 'paused';
        obs.observe(el);
      });
    }
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  setDocType(docType: string): void {
    this.activeDocType = docType;
  }

  setDifficulty(difficulty: string): void {
    this.activeDifficulty = difficulty;
  }

  setSortBy(sortValue: string): void {
    this.sortBy = sortValue;
  }

  getTagColor(tag?: string): string {
    if (!tag) return '';
    if (tag === 'Hot') return 'tag-hot';
    if (tag === 'New') return 'tag-new';
    if (tag === 'Free') return 'tag-free';
    return 'tag-pro';
  }

  getTagIcon(tag?: string): string {
    if (!tag) return '';
    if (tag === 'Hot') return '🔥';
    if (tag === 'New') return '✨';
    if (tag === 'Free') return '';
    return '';
  }

  getThumbGradient(emoji: string): string {
    const gradients: { [key: string]: string } = {
      '📰': 'linear-gradient(135deg, #e0f2fe, #bae6fd)',
      '💡': 'linear-gradient(135deg, #fef3c7, #fde68a)',
      '📚': 'linear-gradient(135deg, #d1fae5, #a7f3d0)',
      '🎯': 'linear-gradient(135deg, #ede9fe, #ddd6fe)',
      '📋': 'linear-gradient(135deg, #e0f2fe, #bae6fd)',
      '📖': 'linear-gradient(135deg, #d1fae5, #a7f3d0)',
      '🗺️': 'linear-gradient(135deg, #fef3c7, #fde68a)',
      '📝': 'linear-gradient(135deg, #ede9fe, #ddd6fe)',
      '📌': 'linear-gradient(135deg, #ffe4e6, #fecdd3)',
    };
    return gradients[emoji] || 'linear-gradient(135deg, #e0f2fe, #bae6fd)';
  }

  getRankEmoji(rank: number): string {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return rank.toString();
  }

  getAvatarGradient(rank: number): string {
    const gradients: { [key: number]: string } = {
      1: 'linear-gradient(135deg, #0ea5e9, #38bdf8)',
      2: 'linear-gradient(135deg, #10b981, #34d399)',
      3: 'linear-gradient(135deg, #f59e0b, #fcd34d)',
      4: 'linear-gradient(135deg, #8b5cf6, #a78bfa)',
      5: 'linear-gradient(135deg, #e11d48, #fb7185)',
    };
    return gradients[rank] || 'linear-gradient(135deg, #0ea5e9, #38bdf8)';
  }
}
