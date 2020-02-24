import { NgModule } from '@angular/core';
import { redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { canActivate, redirectLoggedInTo } from '@angular/fire/auth-guard';

const redirectLoggedInToItems = redirectLoggedInTo(['user']);
const redirectUnauthorizedToLogin = redirectUnauthorizedTo(['login']);

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: '@app/features/login/login.module#LoginModule',
    ...canActivate(redirectLoggedInToItems),
  },
  {
    path: 'user',
    loadChildren: () => import('@app/features/admin-user/admin-user.module').then(mod => mod.AdminUserModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
