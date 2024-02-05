import { NgModule } from '@angular/core';
import { BrowserModule, Meta } from '@angular/platform-browser';

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
import { AdRightSidebarComponent } from './views/layout/ad-right-sidebar/ad-right-sidebar.component';
import { SidebarMenuComponent } from './views/layout/sidebar-menu/sidebar-menu.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginModalComponent } from './shared/login-modal/login-modal.component';
import { DisclaimerComponent } from './others/disclaimer/disclaimer.component';
import { PrivacyPolicyComponent } from './others/privacy-policy/privacy-policy.component';
import { ComingSoonComponent } from './404_page/coming-soon/coming-soon.component';
import { PagenotfoundComponent } from './404_page/pagenotfound/pagenotfound.component';
import { DashboardComponent } from './shared/dashboard/dashboard.component';
import { ExamplesComponent } from './views/inner/examples/examples.component';
import { SidebarListComponent } from './views/home/sidebar-list/sidebar-list.component';
import { SearchComponent } from './views/inner/search/search.component';
import { AdLeftSidebarComponent } from './views/layout/ad-left-sidebar/ad-left-sidebar.component';

import { MetaService } from './common/meta.service';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';
import { EmailSentComponent } from './auth/email-sent/email-sent.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { ExamplesDetailsComponent } from './views/inner/examples-details/examples-details.component';

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
    AdRightSidebarComponent,
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
    SearchComponent,
    AdLeftSidebarComponent,
    EmailSentComponent,
    ResetPasswordComponent,
    ExamplesDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    CommonModule,
    NgxPaginationModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground: true,
    }),
  ],
  providers: [Meta, MetaService],
  bootstrap: [AppComponent],
})
export class AppModule {}
