import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../app/components/home/home.component';
import { ListingComponent } from '../app/views/inner/listing/listing.component';
import { QuizComponent } from '../app/views/inner/quiz/quiz.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { DisclaimerComponent } from './others/disclaimer/disclaimer.component';
import { PrivacyPolicyComponent } from './others/privacy-policy/privacy-policy.component';
import { ComingSoonComponent } from './404_page/coming-soon/coming-soon.component';
import { PagenotfoundComponent } from './404_page/pagenotfound/pagenotfound.component';
import { ExamplesComponent } from './views/home/examples/examples.component';
import { SearchComponent } from './views/inner/search/search.component';
import { DashboardComponent } from './shared/dashboard/dashboard.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';


const routes: Routes = [
  {
    path: '', component: HomeComponent,
    data: {
      title: 'Home Component',
      descrption: 'Description of Home Component',
      ogTitle: 'Description of Home Component for social media',
    }
  },
  {
    path: 'quiz/:topic', component: ListingComponent,
    data: {
      title: 'Listing Component ',
      descrption: 'Description of list Component',
      ogTitle: 'Description of list Component for social media',
    }
  },
  {
    path: 'quiz/:topic/:subtopic', component: ListingComponent,
    data: {
      title: 'Topic Component ',
      descrption: 'Description of topic Component',
      ogTitle: 'Description of topic Component for social media',
    }
  },
  {
    path: 'quiz/:topic/:subtopic/:quiz', component: QuizComponent,
    data: {
      title: 'Quiz Component ',
      descrption: 'Description of quiz Component',
      ogTitle: 'Description of quiz Component for social media',
    }
  },
  { path: 'search/:topic', component: SearchComponent },

  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'examples/:topic', component: ExamplesComponent },

  { path: 'disclaimer', component: DisclaimerComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  {
    path: 'reset-password/:token', component: ResetPasswordComponent,
    data: {
      title: 'Reset password Component ',
      descrption: 'Description of Reset password Component',
      ogTitle: 'Description of Reset password Component for social media',
    }
  },
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
