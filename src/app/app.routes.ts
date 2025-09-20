import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/work/work.component').then(m => m.WorkComponent) },
  { path: 'about', loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent) },

  { path: 'work/playdora',  loadComponent: () => import('./pages/case-playdora/case-playdora.component').then(m => m.PlaydoraComponent), data:{title:'Playdora — Case Study'} },
  { path: 'work/quiet',     loadComponent: () => import('./pages/case-quiet/case-quiet.component').then(m => m.CaseQuietComponent),         data:{title:'Quiet.nl — Case Study'} },

  { path: '**', redirectTo: '' }
];
