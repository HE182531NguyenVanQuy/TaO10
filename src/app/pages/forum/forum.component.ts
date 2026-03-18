import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Thread {
  id: number;
  avatar: string;
  avatarBg: string;
  isPinned: boolean;
  isHot: boolean;
  badges: string[];
  category: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  tags: string;
  replies: number;
  views: number;
}

interface ForumCategory {
  icon: string;
  name: string;
  count: number;
  replies: number;
  badge: string;
  badgeColor: string;
}

interface LeaderboardItem {
  rank: number;
  emoji: string;
  name: string;
  meta: string;
  points: number;
}

interface ActivityItem {
  avatar: string;
  avatarBg: string;
  title: string;
  userName: string;
  action: string;
  time: string;
  actionType: string;
}

@Component({
  selector: 'app-dien-dan',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss'],
})
export class ForumComponent implements OnInit {
  // User data
  userAvatar = '👤';
  userName = 'Nguyễn Văn A';
  userHandle = '@nguyenvana';
  userBadges = [
    { label: '📖 Học sinh tích cực', type: 'blue' },
    { label: '⭐ Top 100', type: 'amber' },
  ];
  userStats = [
    { number: '42', label: 'Bài đăng' },
    { number: '186', label: 'Trả lời' },
    { number: '1.2k', label: 'Điểm' },
  ];

  // Stats banner
  statsData = [
    { icon: '👥', number: '45k+', label: 'Thành viên' },
    { icon: '💬', number: '12k+', label: 'Chủ đề thảo luận' },
    { icon: '✅', number: '98k+', label: 'Câu trả lời' },
    { icon: '🟢', number: '320+', label: 'Đang online' },
  ];

  // Forum categories
  forumCategories: ForumCategory[] = [
    { icon: '📖', name: 'Ngữ pháp', count: 4218, replies: 28640, badge: 'Phổ biến nhất', badgeColor: 'fb-blue' },
    { icon: '💬', name: 'Từ vựng', count: 2810, replies: 16390, badge: 'Đang hot 🔥', badgeColor: 'fb-green' },
    { icon: '📋', name: 'Đề thi & Đáp án', count: 860, replies: 9150, badge: 'Mới cập nhật', badgeColor: 'fb-amber' },
    { icon: '💡', name: 'Kinh nghiệm ôn thi', count: 420, replies: 5720, badge: 'Được yêu thích', badgeColor: 'fb-violet' },
    { icon: '📄', name: 'Đọc hiểu', count: 1920, replies: 11840, badge: 'Sôi nổi', badgeColor: 'fb-blue' },
    { icon: '🎧', name: 'Nghe hiểu', count: 980, replies: 6210, badge: 'Tích cực', badgeColor: 'fb-green' },
    { icon: '✍️', name: 'Kỹ năng Viết', count: 1100, replies: 7890, badge: 'Nhiều câu hỏi', badgeColor: 'fb-amber' },
    { icon: '🗣️', name: 'Phát âm & Nói', count: 640, replies: 3480, badge: 'Thú vị', badgeColor: 'fb-violet' },
  ];

  // Tabs and filters
  tabs = ['🔥 Nổi bật', '🆕 Mới nhất', '✅ Đã giải đáp', '❓ Chờ trả lời', '📌 Ghim'];
  activeTab = '🔥 Nổi bật';
  
  sortOptions = ['Hoạt động gần nhất', 'Nhiều trả lời nhất', 'Mới nhất', 'Được xem nhiều nhất'];
  
  categoryList = [
    { icon: '🗂️', name: 'Tất cả', threads: '12k' },
    { icon: '📖', name: 'Ngữ pháp', threads: '4.2k' },
    { icon: '💬', name: 'Từ vựng', threads: '2.8k' },
    { icon: '📄', name: 'Đọc hiểu', threads: '1.9k' },
    { icon: '🎧', name: 'Nghe hiểu', threads: '980' },
    { icon: '✍️', name: 'Viết', threads: '1.1k' },
    { icon: '📋', name: 'Đề thi', threads: '860' },
    { icon: '💡', name: 'Kinh nghiệm thi', threads: '420' },
  ];
  activeCategory = 'all';

  // Post categories
  postCategories = ['Ngữ pháp', 'Từ vựng', 'Đọc hiểu', 'Đề thi', 'Khác'];
  selectedPostCategory = 'Ngữ pháp';

  // Online users
  onlineUsers = [
    { name: 'Minh Anh', emoji: '😊' },
    { name: 'Thanh Lan', emoji: '😄' },
    { name: 'Hoàng Nam', emoji: '🙂' },
    { name: 'Thu Hà', emoji: '😁' },
    { name: 'Đức Hùng', emoji: '😎' },
    { name: 'Quỳnh Anh', emoji: '🤓' },
    { name: 'Bảo Châu', emoji: '😇' },
    { name: 'Gia Huy', emoji: '🥳' },
  ];

  // Tags cloud
  tagCloud = ['thì hiện tại đơn', 'câu bị động', 'đề 2026', 'từ vựng', 'viết lại câu', 'đọc hiểu', 'câu điều kiện', 'mệnh đề quan hệ', 'câu gián tiếp', 'phát âm', 'đề cương', 'kinh nghiệm'];

  // Thread list
  threadsList: Thread[] = [
    {
      id: 1,
      avatar: '👨‍🏫',
      avatarBg: 'linear-gradient(135deg,#0284c7,#38bdf8)',
      isPinned: true,
      isHot: false,
      badges: ['pin', 'teacher'],
      category: 'Ngữ pháp',
      title: '📚 [TÀI LIỆU] Tổng hợp đầy đủ cấu trúc ngữ pháp lớp 9–10 chuẩn thi 2026 – Update mới nhất',
      excerpt: 'Bộ tài liệu được biên soạn kỹ lưỡng bởi đội ngũ giáo viên TaO10, bao gồm tất cả các chủ điểm ngữ pháp trọng tâm...',
      author: 'GV. Nguyễn Thị Hoa',
      date: '📅 15/03/2026',
      tags: '🏷️ Ngữ pháp · Tài liệu',
      replies: 284,
      views: 18400,
    },
    {
      id: 2,
      avatar: '📢',
      avatarBg: 'linear-gradient(135deg,#f59e0b,#fcd34d)',
      isPinned: true,
      isHot: false,
      badges: ['pin', 'new'],
      category: 'Thông báo',
      title: '🎉 Lịch thi tuyển sinh vào lớp 10 năm 2026 các tỉnh thành – Cập nhật đầy đủ nhất',
      excerpt: 'TaO10 tổng hợp lịch thi chính thức từ Sở GD&ĐT các tỉnh thành trên cả nước. Hà Nội dự kiến thi ngày 15–16/05/2026...',
      author: 'Admin TaO10',
      date: '📅 10/03/2026',
      tags: '🏷️ Thông báo · Lịch thi',
      replies: 136,
      views: 32100,
    },
    {
      id: 3,
      avatar: 'N',
      avatarBg: 'linear-gradient(135deg,#8b5cf6,#a78bfa)',
      isPinned: false,
      isHot: true,
      badges: ['hot', 'solved'],
      category: 'Ngữ pháp',
      title: 'Phân biệt cách dùng "Although", "Despite" và "In spite of" – Khi nào dùng cái nào?',
      excerpt: 'Mình hay bị nhầm 3 từ này với nhau vì chúng đều có nghĩa "mặc dù". Ai có thể giải thích rõ sự khác biệt giữa chúng không ạ?',
      author: 'Nguyễn Minh Anh',
      date: '📅 16/03/2026',
      tags: '💬 Ngữ pháp · Liên từ',
      replies: 47,
      views: 4200,
    },
    {
      id: 4,
      avatar: 'T',
      avatarBg: 'linear-gradient(135deg,#10b981,#34d399)',
      isPinned: false,
      isHot: false,
      badges: ['new'],
      category: 'Từ vựng',
      title: 'Bộ từ vựng chủ đề Môi trường – Environment thường xuất hiện trong đề thi lớp 10',
      excerpt: 'Mình tổng hợp khoảng 80 từ vựng hay gặp về môi trường, có phiên âm và câu ví dụ. Các bạn tham khảo nhé!',
      author: 'Trần Thị Lan',
      date: '📅 17/03/2026',
      tags: '🏷️ Từ vựng · Môi trường',
      replies: 32,
      views: 2800,
    },
    {
      id: 5,
      avatar: 'L',
      avatarBg: 'linear-gradient(135deg,#e11d48,#fb7185)',
      isPinned: false,
      isHot: true,
      badges: ['hot'],
      category: 'Đề thi',
      title: 'Thảo luận đề thi thử lớp 10 Hà Nội đợt 1 năm 2026 – Câu nào khó nhất?',
      excerpt: 'Vừa thi xong đợt 1, câu 38 về mệnh đề quan hệ mình vẫn chưa chắc đáp án. Mọi người làm câu đó thế nào?',
      author: 'Lê Hoàng Nam',
      date: '📅 16/03/2026',
      tags: '🏷️ Đề thi · Thi thử · 2026',
      replies: 89,
      views: 7600,
    },
    {
      id: 6,
      avatar: 'P',
      avatarBg: 'linear-gradient(135deg,#0ea5e9,#38bdf8)',
      isPinned: false,
      isHot: false,
      badges: ['solved'],
      category: 'Ngữ pháp',
      title: 'Câu điều kiện loại 3 – Tại sao dùng "had + V3" trong mệnh đề "if"?',
      excerpt: 'Mình không hiểu tại sao câu điều kiện loại 3 lại dùng had + V3/Vpp. Bình thường past perfect dùng khi nào?',
      author: 'Phạm Thu Hà',
      date: '📅 15/03/2026',
      tags: '🏷️ Câu điều kiện · Ngữ pháp',
      replies: 23,
      views: 1900,
    },
    {
      id: 7,
      avatar: 'V',
      avatarBg: 'linear-gradient(135deg,#d97706,#fbbf24)',
      isPinned: false,
      isHot: false,
      badges: ['new'],
      category: 'Kinh nghiệm',
      title: 'Chia sẻ kinh nghiệm ôn thi 2 tháng đạt 9.25 điểm môn Tiếng Anh vào lớp 10 Hà Nội',
      excerpt: 'Mình là Vũ Đức Hùng, vừa trải qua kỳ thi 2025 và đạt 9.25. Mình muốn chia sẻ lộ trình 2 tháng của mình để các bạn tham khảo...',
      author: 'Vũ Đức Hùng',
      date: '📅 14/03/2026',
      tags: '🏷️ Kinh nghiệm · Lộ trình',
      replies: 156,
      views: 12300,
    },
    {
      id: 8,
      avatar: 'Q',
      avatarBg: 'linear-gradient(135deg,#7c3aed,#a78bfa)',
      isPinned: false,
      isHot: true,
      badges: ['hot', 'solved'],
      category: 'Đọc hiểu',
      title: 'Kỹ thuật skimming và scanning trong bài đọc hiểu – Ai có thể giải thích rõ hơn không?',
      excerpt: 'Cô giáo hay nói skimming để đọc lướt, scanning để tìm thông tin cụ thể. Nhưng mình vẫn không biết áp dụng vào bài thi thế nào...',
      author: 'Quỳnh Anh Ngô',
      date: '📅 13/03/2026',
      tags: '🏷️ Đọc hiểu · Kỹ năng',
      replies: 68,
      views: 5100,
    },
    {
      id: 9,
      avatar: 'B',
      avatarBg: 'linear-gradient(135deg,#0891b2,#22d3ee)',
      isPinned: false,
      isHot: false,
      badges: [],
      category: 'Viết',
      title: 'Mẫu bài viết đoạn văn về "Tác động của Internet đến giới trẻ" – Ai check giúp mình với?',
      excerpt: 'Mình viết thử đoạn văn 100 từ về chủ đề này nhưng không chắc cấu trúc câu có ổn không. Mọi người góp ý nhé!',
      author: 'Bảo Châu Lý',
      date: '📅 12/03/2026',
      tags: '🏷️ Viết · Đoạn văn',
      replies: 19,
      views: 1400,
    },
    {
      id: 10,
      avatar: 'G',
      avatarBg: 'linear-gradient(135deg,#16a34a,#4ade80)',
      isPinned: false,
      isHot: false,
      badges: ['solved'],
      category: 'Ngữ pháp',
      title: 'Cách phân biệt mệnh đề quan hệ xác định và không xác định – Bài tập ví dụ minh họa',
      excerpt: 'Mình hay nhầm khi nào thì cần dấu phẩy, khi nào thì không trong mệnh đề quan hệ. Có bạn nào giải thích được không?',
      author: 'Gia Huy Trần',
      date: '📅 11/03/2026',
      tags: '🏷️ Mệnh đề quan hệ',
      replies: 41,
      views: 3300,
    },
  ];

  // Activity list
  activityList: ActivityItem[] = [
    { avatar: 'M', avatarBg: 'linear-gradient(135deg,#0ea5e9,#38bdf8)', title: 'Phân biệt "Although", "Despite" và "In spite of"...', userName: 'Minh Anh', action: 'đã trả lời', time: '2 phút trước', actionType: 'reply' },
    { avatar: 'T', avatarBg: 'linear-gradient(135deg,#10b981,#34d399)', title: 'Bộ từ vựng chủ đề Môi trường – Environment', userName: 'Thanh Lan', action: 'đã đăng bài mới', time: '8 phút trước', actionType: 'new' },
    { avatar: 'L', avatarBg: 'linear-gradient(135deg,#e11d48,#fb7185)', title: 'Chia sẻ kinh nghiệm ôn thi 2 tháng đạt 9.25 điểm...', userName: 'Hoàng Nam', action: 'đã thích bài viết', time: '12 phút trước', actionType: 'like' },
    { avatar: 'P', avatarBg: 'linear-gradient(135deg,#7c3aed,#a78bfa)', title: 'Câu điều kiện loại 3 – dùng had + V3...', userName: 'Thu Hà', action: 'đã được đánh dấu "Đã giải đáp"', time: '25 phút trước', actionType: 'solved' },
    { avatar: 'V', avatarBg: 'linear-gradient(135deg,#f59e0b,#fcd34d)', title: 'Thảo luận đề thi thử Hà Nội đợt 1 năm 2026...', userName: 'Vũ Hùng', action: 'đã trả lời', time: '34 phút trước', actionType: 'reply' },
    { avatar: 'B', avatarBg: 'linear-gradient(135deg,#0891b2,#22d3ee)', title: 'Mẫu bài viết đoạn văn về "Tác động của Internet..."', userName: 'Bảo Châu', action: 'đã đăng bài mới', time: '42 phút trước', actionType: 'new' },
    { avatar: 'Q', avatarBg: 'linear-gradient(135deg,#d97706,#fbbf24)', title: 'Kỹ thuật skimming và scanning trong bài đọc hiểu...', userName: 'Quỳnh Anh', action: 'đã thích bài trả lời', time: '58 phút trước', actionType: 'like' },
  ];

  // Leaderboard
  leaderboardList: LeaderboardItem[] = [
    { rank: 1, emoji: 'N', name: 'Nguyễn Minh Anh', meta: '186 trả lời · 42 bài', points: 9870 },
    { rank: 2, emoji: 'T', name: 'Trần Thị Lan', meta: '142 trả lời · 38 bài', points: 8450 },
    { rank: 3, emoji: 'V', name: 'Vũ Đức Hùng', meta: '120 trả lời · 31 bài', points: 7210 },
    { rank: 4, emoji: 'Q', name: 'Quỳnh Anh Ngô', meta: '98 trả lời · 24 bài', points: 6340 },
    { rank: 5, emoji: 'B', name: 'Bảo Châu Lý', meta: '87 trả lời · 19 bài', points: 5890 },
  ];

  ngOnInit(): void {}

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  setSortBy(value: string) {
    console.log('Sort by:', value);
  }

  setPostCategory(category: string) {
    this.selectedPostCategory = category;
  }

  setBadgeColor(badge: string): string {
    const badgeMap: { [key: string]: string } = {
      'pin': 'tb-pin',
      'hot': 'tb-hot',
      'new': 'tb-new',
      'solved': 'tb-solved',
      'teacher': '',
    };
    return badgeMap[badge] || '';
  }

  getBadgeColor(badge: string): string {
    const colorMap: { [key: string]: string } = {
      'pin': 'tb-pin',
      'hot': 'tb-hot',
      'new': 'tb-new',
      'solved': 'tb-solved',
    };
    return colorMap[badge] || '';
  }

  getBadgeLabel(badge: string): string {
    const labelMap: { [key: string]: string } = {
      'pin': '📌 Ghim',
      'hot': '🔥 Hot',
      'new': '🆕 Mới',
      'solved': '✅ Đã giải đáp',
      'teacher': '✅ Giáo viên',
    };
    return labelMap[badge] || badge;
  }

  getActivityActionClass(actionType: string): string {
    const classMap: { [key: string]: string } = {
      'reply': 'aa-reply',
      'new': 'aa-new',
      'like': 'aa-like',
      'solved': 'aa-solved',
    };
    return classMap[actionType] || '';
  }

  getActivityActionLabel(actionType: string): string {
    const labelMap: { [key: string]: string } = {
      'reply': 'Trả lời',
      'new': 'Bài mới',
      'like': 'Thích ❤️',
      'solved': 'Đã giải ✅',
    };
    return labelMap[actionType] || '';
  }

  formatViews(views: number): string {
    if (views >= 1000) {
      return '👁 ' + (views / 1000).toFixed(1) + 'k';
    }
    return '👁 ' + views;
  }

  getRankClass(rank: number): string {
    const classMap: { [key: number]: string } = {
      1: 'rank-1',
      2: 'rank-2',
      3: 'rank-3',
    };
    return classMap[rank] || 'rank-other';
  }

  getRankEmoji(rank: number): string {
    const emojiMap: { [key: number]: string } = {
      1: '🥇',
      2: '🥈',
      3: '🥉',
    };
    return emojiMap[rank] || rank.toString();
  }

  getAvatarGradient(index: number): string {
    const gradients = [
      'linear-gradient(135deg,#0ea5e9,#38bdf8)',
      'linear-gradient(135deg,#10b981,#34d399)',
      'linear-gradient(135deg,#f59e0b,#fcd34d)',
      'linear-gradient(135deg,#8b5cf6,#a78bfa)',
      'linear-gradient(135deg,#e11d48,#fb7185)',
      'linear-gradient(135deg,#0284c7,#38bdf8)',
      'linear-gradient(135deg,#d97706,#fbbf24)',
      'linear-gradient(135deg,#7c3aed,#a78bfa)',
    ];
    return gradients[index % gradients.length];
  }
}
