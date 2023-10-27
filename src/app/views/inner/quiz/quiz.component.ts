import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../../../common/common.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit {
  showWarning: boolean = false;
  isQuizStarted: boolean = false;
  isQuizEnded: boolean = false;
  questionsList: any[] = [];
  currentQuestionNo: number = 0;
  correctAnswerCount: number = 0;
  menu_sidebar: any;
  level: any = '';
  final: any;
  userPoint: number = 0;
  payload: any;
  option: any;

  userSelected: any = '';
  activeId: any;

  getslug: string = ""

  constructor(
    private http: HttpClient,
    public commonservice: CommonService,
    private router: ActivatedRoute
  ) {
    this.getslug = this.router.snapshot.params['quiz']
  }

  ngOnInit(): void {
    this.loadQuestions();
    this.selectOption(this.payload, this.option);
  }

  async loadQuestions() {
    await this.commonservice
      .get(`page/quiz/${this.getslug}`)
      .subscribe((res: any) => {
        const apiResult = JSON.parse(JSON.stringify(res));

        if (apiResult && apiResult.status == 'SUCCESS') {
          this.questionsList = apiResult && apiResult.payload;
        }
      });
  }


  nextQuestion(payload: any) {
    this.activeId = 10;

    if (payload.rightoption == this.userSelected) {
      this.userPoint = this.userPoint + parseFloat(payload.point);
    }
    if (this.currentQuestionNo < this.questionsList.length - 1) {
      this.currentQuestionNo++;
    }
    this.userSelected = '';
  }

  finish() {
    this.isQuizEnded = true;
    this.isQuizStarted = false;
  }

  start() {
    this.showWarning = false;
    this.isQuizEnded = false;
    this.isQuizStarted = false;
    this.currentQuestionNo = 0;
    this.loadQuestions();
    this.userPoint = 0;
  }

  replay() {
    this.showWarning = false;
    this.isQuizEnded = false;
    this.isQuizStarted = true;
    this.currentQuestionNo = 0;
    this.loadQuestions();
    this.userPoint = 0;
  }

  showWarningPopup() {
    this.showWarning = true;
  }
  startQuiz() {
    this.showWarning = false;
    this.isQuizStarted = true;
  }

  selectOption(event: any, option: any) {
    this.userSelected = option;
    this.activeId = event;
  }
}
