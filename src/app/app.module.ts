import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { CreatePostComponent } from './post/create-post/create-post.component';
import { ListPostComponent } from './post/list-post/list-post.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ListCommentsComponent } from './post/list-comments/list-comments.component';
import { AuthIntercepterService } from './auth/auth-intercepter.service';
import { GetPostsService } from './post/get-posts.service';
import { EditPostComponent } from './post/edit-post/edit-post.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HomeComponent,
    NavigationComponent,
    CreatePostComponent,
    ListPostComponent,
    ListCommentsComponent,
    EditPostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthIntercepterService,
    multi: true
  }, GetPostsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
