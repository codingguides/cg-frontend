import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../../../common/common.service';
import { ActivatedRoute, Router } from '@angular/router';
// import { ActivatedRoute, Router } from '@angular/router';

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

  getslug: string = "";
  name: string = "";
  loginTrue: any;
  status: boolean = false;
  param: any;
  xxx: any = 0;
  attendedAnswer: number = 0;
  attenedQuestion: number = 0;
  statuss: String = 'pass';
  _id: string = "";
  id: string = "";
  obj: any
  token: any = ""
  rightAnsCount: number = 0

  constructor(
    private http: HttpClient,
    public commonservice: CommonService,
    private router: ActivatedRoute,
    private router2: Router
  ) {
    this.getslug = this.router.snapshot.params['quiz']
    console.log("SLUG>>>>>>>>", this.getslug);
  }

  ngOnInit(): void {

    this.loadQuestions();
    this.selectOption(this.payload, this.option);


    this.commonservice.castLogin.subscribe((result) => {
      this.obj = JSON.parse(JSON.stringify(result))
      this.name = this.obj.username;
      this._id = this.obj.user_id;
      this.token = this.obj.token;
      this.status = this.obj.status;
      this.showWarning = false;
      console.log("Token in ngOnInit", this.token)
    })

  }

  async loadQuestions() {
    this.param = this.router.snapshot.params['topic'];
    await this.commonservice
      .get(`page/quiz/${this.getslug}`)
      .subscribe((res: any) => {
        const apiResult = JSON.parse(JSON.stringify(res));

        if (apiResult && apiResult.status == 'SUCCESS') {
          this.questionsList = apiResult && apiResult.payload;
          console.log(this.questionsList);
        }
      });
  }


  nextQuestion(payload: any) {

    console.log("OBJ>>>>", this.obj);
    this.activeId = 10;

    if (payload.rightoption == this.userSelected) {
      this.attendedAnswer++
      this.rightAnsCount++;
      this.userPoint = this.userPoint + parseFloat(payload.point);
      console.log("this.userPoint", this.userPoint);
      console.log("IN IF part ALL QUESTION ATTEND", this.attendedAnswer)
    }
    else if (payload.rightoption !== this.userSelected) {
      console.log("IN ELSE part ALL QUESTION ATTEND", this.attendedAnswer = this.attendedAnswer + 1)
    }

    if (this.currentQuestionNo < this.questionsList.length - 1) {
      this.currentQuestionNo++;
      this.attenedQuestion++;
      console.log("ATTEND QUESTION", this.attenedQuestion)
    }

  }

  finish(payload: any) {
    if (payload.rightoption == this.userSelected) {
      this.userPoint = this.userPoint + parseFloat(payload.point);
    }
    // console.clear()
    if (this.token) {
      console.log("TOKENNNNNNNN>>>>>", this.token)
      this.getslug = this.router.snapshot.params['quiz'];
      this.nextQuestion(this.userPoint);
      const data = {
        topic_slug: this.getslug,
        user_id: this._id,
        attendedQuestionCount: this.attendedAnswer,
        rightAnswerCount: this.rightAnsCount,
        status: Math.ceil((this.rightAnsCount / this.attendedAnswer) * 100) > 50 ? 'pass' : 'failed',
        point: this.userPoint,
      }
      console.log(">>>>>data>>>>", data);

      this.commonservice.post(data, 'topic/analytics').subscribe((res) => {
        const apiResult2 = JSON.parse(JSON.stringify(res))
        console.log(apiResult2)
      })
      this.isQuizEnded = true;
      this.isQuizStarted = false;
    } else {
      this.isQuizEnded = true;
      this.isQuizStarted = false;
    }
  }

  start() {
    this.showWarning = false;
    this.isQuizEnded = false;
    this.isQuizStarted = false;
    this.currentQuestionNo = 0;
    this.loadQuestions();
    this.userPoint = 0;
    this.selectOption(this.payload, this.option);
    this.attendedAnswer = 0;
  }

  replay() {
    this.showWarning = false;
    this.isQuizEnded = false;
    this.isQuizStarted = true;
    this.currentQuestionNo = 0;
    this.loadQuestions();
    this.userPoint = 0;
    this.selectOption(this.payload, this.option);
    this.attendedAnswer = 0;
  }

  showWarningPopup() {

    console.log(">>>>>>this.obj>>>showWarningPopup>>>>>", this.obj)
    if (this.status == false) {
      if (localStorage.getItem('notInterested') !== 'yes') {
        const modalDiv = document.getElementById('myModal');
        if (modalDiv != null) {
          modalDiv.style.display = 'block'
          this.showWarning = false;
        }
      } else {
        this.showWarning = true;
      }
    } else {

      this.showWarning = true;
    }
  }

  startQuiz() {
    this.showWarning = false;
    this.isQuizStarted = true;
    localStorage.removeItem('notInterested');
    this.commonservice.setQuizStatus(true, this.router2.url, "")
  }

  selectOption(event: any, option: any) {
    this.userSelected = option;
    this.activeId = event;
  }

  capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
