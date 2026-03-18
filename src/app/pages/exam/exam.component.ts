import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-exam',
  standalone: true,
  imports: [RouterLink, NgClass],
  templateUrl: './exam.component.html',
  styleUrl: './exam.component.scss',
})
export class ExamComponent {
  activeTab = 'all';
  activeYear = 'all';
  activeDifficulty = 'all';
  activeType = 'all';
  viewMode: 'grid' | 'list' = 'grid';
  currentPage = 1;

  tabs = [
    { id: 'all', label: 'Tất cả' },
    { id: 'thu', label: 'Đề thi thử' },
    { id: 'chinh-thuc', label: 'Đề chính thức' },
    { id: 'chuyen-de', label: 'Theo chuyên đề' },
    { id: 'nhanh', label: 'Kiểm tra nhanh' },
  ];

  yearChips = [
    { id: 'all', label: 'Tất cả' },
    { id: '2026', label: '2026' },
    { id: '2025', label: '2025' },
    { id: '2024', label: '2024' },
    { id: '2023', label: '2023' },
  ];

  typeFilters = [
    { id: 'all', label: '🗂️ Tất cả', count: '300+' },
    { id: 'thu', label: '📝 Đề thi thử tổng hợp', count: '120' },
    { id: 'chinh-thuc', label: '✅ Đề chính thức', count: '86' },
    { id: 'chuyen-de', label: '🎯 Đề theo chuyên đề', count: '64' },
    { id: 'nhanh', label: '⚡ Kiểm tra nhanh', count: '30' },
  ];

  difficultyFilters = [
    { id: 'all', label: 'Tất cả', count: '300+' },
    { id: 'easy', label: '🟢 Dễ', count: '90' },
    { id: 'medium', label: '🟡 Trung bình', count: '140' },
    { id: 'hard', label: '🔴 Khó', count: '70' },
  ];

  examCardsMain = [
    { id: 1, title: 'Đề thi thử tổng hợp vào lớp 10 – Bộ đề số 1 năm 2026', questions: 40, duration: 60, views: '42.8k lượt', progress: 0, difficulty: 'Khó', difficultyClass: 'diff-hard', action: 'Làm bài →', cover: 'cover-blue', tag: '🔥 Hot', tagClass: 'tag-hot' },
    { id: 2, title: 'Đề thi thử tổng hợp vào lớp 10 – Bộ đề số 2 năm 2026', questions: 40, duration: 60, views: '36.1k lượt', progress: 60, difficulty: 'Khó', difficultyClass: 'diff-hard', action: 'Tiếp tục →', cover: 'cover-sky', tag: '✨ Mới', tagClass: 'tag-new' },
    { id: 3, title: 'Đề thi thử tổng hợp vào lớp 10 – Bộ đề số 3 năm 2026', questions: 40, duration: 60, views: '29.4k lượt', progress: 100, difficulty: 'Trung bình', difficultyClass: 'diff-medium', action: 'Xem KQ →', cover: 'cover-teal', tag: 'Miễn phí', tagClass: 'tag-free' },
    { id: 4, title: 'Đề thi thử tổng hợp vào lớp 10 – Bộ đề số 4 năm 2026', questions: 40, duration: 60, views: '24.7k lượt', progress: 0, difficulty: 'Trung bình', difficultyClass: 'diff-medium', action: 'Làm bài →', cover: 'cover-indigo', tag: '🔥 Hot', tagClass: 'tag-hot' },
    { id: 5, title: 'Đề thi thử tổng hợp vào lớp 10 – Bộ đề số 5 năm 2026', questions: 40, duration: 60, views: '19.3k lượt', progress: 35, difficulty: 'Dễ', difficultyClass: 'diff-easy', action: 'Tiếp tục →', cover: 'cover-emerald', tag: '✨ Mới', tagClass: 'tag-new' },
    { id: 6, title: 'Đề thi thử tổng hợp vào lớp 10 – Bộ đề số 6 năm 2026', questions: 40, duration: 60, views: '15.6k lượt', progress: 0, difficulty: 'Dễ', difficultyClass: 'diff-easy', action: 'Làm bài →', cover: 'cover-violet', tag: 'Miễn phí', tagClass: 'tag-free' },
  ];

  examCardsChuyenDe = [
    { title: 'Chuyên đề Ngữ pháp – 100 câu trắc nghiệm tổng hợp thì động từ', questions: 100, duration: 45, views: '18.2k lượt', progress: 80, difficulty: 'Trung bình', difficultyClass: 'diff-medium', action: 'Tiếp tục →', cover: 'cover-rose', coverLabel: 'NGP', tag: '🔥 Hot', tagClass: 'tag-hot' },
    { title: 'Chuyên đề Đọc hiểu – 50 bài đọc chuẩn cấu trúc thi 2026', questions: 50, duration: 60, views: '11.4k lượt', progress: 0, difficulty: 'Khó', difficultyClass: 'diff-hard', action: 'Làm bài →', cover: 'cover-amber', coverLabel: 'ĐH', tag: 'Miễn phí', tagClass: 'tag-free' },
    { title: 'Chuyên đề Từ vựng – Điền từ, từ đồng nghĩa / trái nghĩa', questions: 80, duration: 40, views: '9.7k lượt', progress: 50, difficulty: 'Dễ', difficultyClass: 'diff-easy', action: 'Tiếp tục →', cover: 'cover-cyan', coverLabel: 'TV', tag: '✨ Mới', tagClass: 'tag-new' },
  ];

  topics = [
    { name: 'Thì động từ', count: '12 chủ điểm · 240 bài', emoji: '⏰' },
    { name: 'Câu bị động', count: '8 chủ điểm · 160 bài', emoji: '🔄' },
    { name: 'Câu gián tiếp', count: '6 chủ điểm · 120 bài', emoji: '💬' },
    { name: 'Câu điều kiện', count: '4 chủ điểm · 80 bài', emoji: '❓' },
    { name: 'Mệnh đề quan hệ', count: '5 chủ điểm · 100 bài', emoji: '📖' },
    { name: 'Liên từ & Giới từ', count: '9 chủ điểm · 180 bài', emoji: '🔗' },
    { name: 'Từ loại & Cấu tạo từ', count: '10 chủ điểm · 200 bài', emoji: '📝' },
    { name: 'Kỹ năng đọc hiểu', count: '15 chủ điểm · 300 bài', emoji: '🗣️' },
  ];

  pages = [1, 2, 3, 4, 5];
  lastPage = 12;

  setTab(id: string): void {
    this.activeTab = id;
  }
  setYear(id: string): void {
    this.activeYear = id;
  }
  setDifficulty(id: string): void {
    this.activeDifficulty = id;
  }
  setType(id: string): void {
    this.activeType = id;
  }
  setView(mode: 'grid' | 'list'): void {
    this.viewMode = mode;
  }
  setPage(p: number): void {
    this.currentPage = p;
  }
}
