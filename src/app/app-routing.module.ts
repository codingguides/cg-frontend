import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../app/components/home/home.component';
import { BannerComponent } from './components/banner/banner.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { FeaturesComponent } from './components/features/features.component';
import { SliderLatestPostsComponent } from './components/slider-latest-posts/slider-latest-posts.component';
import { ListingComponent } from '../app/views/inner/listing/listing.component';
import { QuizComponent } from '../app/views/inner/quiz/quiz.component';



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'banner', component: BannerComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'features', component: FeaturesComponent },
  { path: 'slider-latest-posts', component: SliderLatestPostsComponent },
  { path: ':topic', component: ListingComponent },
  { path: ':topic/:subtopic', component: ListingComponent },
  { path: ':topic/:subtopic/:quiz', component: QuizComponent }, //topic/subtopic/quiz
  //            topic/          subtopic/      quiz
  //      javascript/quiz-for-beginners/JS Beginners Quiz 1  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
