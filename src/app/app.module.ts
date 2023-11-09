import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from '../app/views/layout/header/header.component';
import { FooterComponent } from '../app/views/layout/footer/footer.component';
import { SubscribeComponent } from '../app/views/layout/subscribe/subscribe.component';
import { BannerComponent } from './components/banner/banner.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { FeaturesComponent } from './components/features/features.component';
import { SliderLatestPostsComponent } from './components/slider-latest-posts/slider-latest-posts.component';
import { HomeComponent } from '../app/components/home/home.component';
import { ListingComponent } from '../app/views/inner/listing/listing.component';
import { QuizComponent } from '../app/views/inner/quiz/quiz.component';
import { HttpClientModule } from '@angular/common/http';
import { AdSidebarComponent } from './views/layout/ad-sidebar/ad-sidebar.component';
import { SidebarMenuComponent } from './views/layout/sidebar-menu/sidebar-menu.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';


import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LoginModalComponent } from './shared/login-modal/login-modal.component';
import { DisclaimerComponent } from './others/disclaimer/disclaimer.component';
import { PrivacyPolicyComponent } from './others/privacy-policy/privacy-policy.component';
import { ComingSoonComponent } from './404_page/coming-soon/coming-soon.component';
import { PagenotfoundComponent } from './404_page/pagenotfound/pagenotfound.component';
import { DashboardComponent } from './shared/dashboard/dashboard.component';
import { ExamplesComponent } from './views/home/examples/examples.component';
import { SidebarListComponent } from './views/home/sidebar-list/sidebar-list.component';






@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SubscribeComponent,
    BannerComponent,
    FeaturesComponent,
    SliderLatestPostsComponent,
    HomeComponent,
    ListingComponent,
    AboutUsComponent,
    QuizComponent,
    AdSidebarComponent,
    SidebarMenuComponent,
    LoginComponent,
    SignUpComponent,
    LoginModalComponent,
    DisclaimerComponent,
    PrivacyPolicyComponent,
    ComingSoonComponent,
    PagenotfoundComponent,
    DashboardComponent,
    ExamplesComponent,
    SidebarListComponent,






  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
