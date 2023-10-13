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


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
