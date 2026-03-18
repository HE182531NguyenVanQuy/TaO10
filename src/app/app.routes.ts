import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'de-thi',
    loadComponent: () => import('./pages/exam/exam.component').then((m) => m.ExamComponent),
  },
  {
    path: 'test',
    loadComponent: () => import('./pages/test/test.component').then((m) => m.TestComponent),
  },
  {
    path: 'ai-analysis',
    loadComponent: () => import('./features/AI-analysis/ai-analysis.component').then((m) => m.AiAnalysisComponent),
  },
  {
    path: 'ngu-phap',
    loadComponent: () => import('./pages/grammar/grammar.component').then((m) => m.GrammarComponent),
  },
  {
    path: 'tu-vung',
    loadComponent: () => import('./pages/vocabulary/vocabulary.component').then((m) => m.VocabularyComponent),
  },
  {
    path: 'tai-lieu',
    loadComponent: () => import('./pages/document/document.component').then((m) => m.DocumentComponent),
  },
  {
    path: 'dien-dan',
    loadComponent: () => import('./pages/forum/forum.component').then((m) => m.ForumComponent),
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
