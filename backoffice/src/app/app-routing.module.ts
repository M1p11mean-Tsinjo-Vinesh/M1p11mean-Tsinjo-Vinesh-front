import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DefaultLayoutComponent} from './containers';


const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
    ]
  },
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/common-pages/pages.module').then((m) => m.PagesModule)
      },
    ]
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: 'crm',
        loadChildren: () => import("./pages/crm/crm.module").then(m => m.CrmModule)
      },
      {
        path: 'management',
        loadChildren: () => import("./pages/admin/admin.module").then(m => m.AdminModule)
      },
      {
        path: '',
        loadChildren: () => import('./pages/logged-common/logged-common.module').then(m => m.LoggedCommonModule)
      }
    ]
  },
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
      // relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
