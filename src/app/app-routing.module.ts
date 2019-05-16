import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { HomeComponent } from './home/home.component';
import { CreatePostComponent } from './post/create-post/create-post.component';
import { ListPostComponent } from './post/list-post/list-post.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'registration', component: RegistrationComponent },
  { path: 'home', component: HomeComponent, canActivate:[AuthGuard] },
  { path: 'createPost', component: CreatePostComponent , canActivate:[AuthGuard]},
  { path: 'listPost', component: ListPostComponent, canActivate:[AuthGuard] },
  { path : '', redirectTo:'login', pathMatch : 'full'},
  { path: '**', redirectTo:'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
