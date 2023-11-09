import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../app/components/home/home.component';
import { BannerComponent } from './components/banner/banner.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { FeaturesComponent } from './components/features/features.component';
import { SliderLatestPostsComponent } from './components/slider-latest-posts/slider-latest-posts.component';
import { ListingComponent } from '../app/views/inner/listing/listing.component';
import { QuizComponent } from '../app/views/inner/quiz/quiz.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { DisclaimerComponent } from './others/disclaimer/disclaimer.component';
import { PrivacyPolicyComponent } from './others/privacy-policy/privacy-policy.component';
import { ComingSoonComponent } from './404_page/coming-soon/coming-soon.component';
import { PagenotfoundComponent } from './404_page/pagenotfound/pagenotfound.component';
import { ExamplesComponent } from './views/home/examples/examples.component';




const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'banner', component: BannerComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'features', component: FeaturesComponent },
  { path: 'slider-latest-posts', component: SliderLatestPostsComponent },
  { path: 'quiz/:topic', component: ListingComponent },
  { path: 'quiz/:topic/:subtopic', component: ListingComponent },
  { path: 'quiz/:topic/:subtopic/:quiz', component: QuizComponent }, //topic/subtopic/quiz
  //            topic/          subtopic/      quiz
  //      javascript/quiz-for-beginners/JS Beginners Quiz 1  
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },

  { path: 'examples/:topic', component: ExamplesComponent },
  { path: 'disclaimer', component: DisclaimerComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: '**', component: ComingSoonComponent },

  {
    path: '**', pathMatch: 'full',
    component: PagenotfoundComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
