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
  isResultDetails: boolean = false;
  isAnswerDescription: boolean = false;
  questionsList: any[] = [];
  qns: any = [];
  resultDetails: any;
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
  statusMessage: String = "";
  _id: string = "";
  id: string = "";
  obj: any;
  token: any = "";
  rightAnsCount: number = 0;
  userLogin: boolean = false;
  qnsList: any;
  shuffled: any;
  shuffledList: any;


  constructor(
    private http: HttpClient,
    public commonservice: CommonService,
    private router: ActivatedRoute,
    private router2: Router,
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
      console.log("Token in ngOnInit", this.token);
    })

  }

  shuffle(array: any) {
    var currentIndex = array.length, temporaryValue, randomIndex

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  async loadQuestions() {
    this.param = this.router.snapshot.params['topic'];
    await this.commonservice
      .get(`page/quiz/${this.getslug}`)
      .subscribe((res: any) => {
        const apiResult = JSON.parse(JSON.stringify(res));

        if (apiResult && apiResult.status == 'SUCCESS') {
          this.questionsList = apiResult && apiResult.payload;
          this.shuffled = this.shuffle(this.questionsList);
          console.log(this.shuffled);
        }
      });
  }


  nextQuestion(payload: any) {

    console.log("OBJ>>>>", this.obj);
    this.activeId = 10;

    if (payload.rightoption == this.userSelected) {
      this.attendedAnswer++;
      this.rightAnsCount++;
      if (!this.userSelected) {
        this.userPoint = 0;
        console.log("NOT SELECTED", this.userPoint);
      }
      else {
        this.userPoint = this.userPoint + parseFloat(payload.point);
        console.log("this.userPoint", this.userPoint);
        console.log("IN IF part ALL QUESTION ATTEND", this.attendedAnswer);
      }
    }
    else if (payload.rightoption !== this.userSelected) {
      console.log("IN ELSE part ALL QUESTION ATTEND", this.attendedAnswer = this.attendedAnswer + 1);
      if (!this.userSelected) {
        this.rightAnsCount = 0;
        console.log("Not select any option", this.userPoint);
      }
    }

    if (this.currentQuestionNo < this.questionsList.length - 1) {
      this.currentQuestionNo++;
      this.attenedQuestion++;
      console.log("ATTEND QUESTION", this.attenedQuestion);
    }
    console.log("IN NEXT Button", this.attendedAnswer);
  }

  finish(payload: any) {
    this.commonservice.setQuizStatus(false, this.router2.url, "");
    if (payload.rightoption == this.userSelected) {
      this.userPoint = this.userPoint + parseFloat(payload.point);
      this.rightAnsCount++;
    }
    else if (payload.rightoption !== this.userSelected) {
      if (!this.userSelected) {
        this.userPoint = 0;
        this.rightAnsCount = 0;
        console.log("Not select any option ATLAST", this.userPoint);
      }
    }
    console.log("IN FINISH Button", this.attendedAnswer++);


    if (this.token) {
      this.userLogin = true;
      console.log("TOKENNNNNNNN>>>>>", this.token);
      this.getslug = this.router.snapshot.params['quiz'];
      let totalPoint = Math.ceil((this.rightAnsCount / this.attendedAnswer) * 100)
      if (totalPoint < 60) {
        this.statusMessage = "You are not Qualified, You first upgrade your skill as soon as possible."
      }
      if (totalPoint >= 60 && totalPoint < 70) {
        this.statusMessage = "You are Qualified, but you need to improve yourself and practice more."
      }
      else if (totalPoint >= 70 && totalPoint < 80) {
        this.statusMessage = "You are Good, but you need to practice more and improve your skill more."
      }
      else if (totalPoint >= 80 && totalPoint < 90) {
        this.statusMessage = "You are Awesome, but you need to practice more quiz to upgrade yourself."
      }
      else if (totalPoint >= 90 && totalPoint < 100) {
        this.statusMessage = "You are Excellent, but you access our more excitement quiz."
      }
      else if (totalPoint == 100) {
        this.statusMessage = "You are Extraordinary, you just follow up the same way of your skill."
      }
      const data = {
        topic_id: this.commonservice.selectedTopicID,
        user_id: this._id,
        attendedQuestionCount: this.attendedAnswer,
        rightAnswerCount: this.rightAnsCount,
        status: Math.ceil((this.rightAnsCount / this.attendedAnswer) * 100) >= 60 ? 'pass' : 'failed',
        point: this.userPoint,
      }
      console.log(">>>>>data>>>>", data);

      this.commonservice.post(data, 'topic/analytics').subscribe((res) => {
        const apiResult2 = JSON.parse(JSON.stringify(res));
        if (apiResult2 && apiResult2.status == 'SUCCESS') {
          this.resultDetails = apiResult2 && apiResult2.payload;
          console.log(this.resultDetails);


        }
      })
      this.isQuizEnded = true;
      this.isQuizStarted = false;
    } else {
      this.isQuizEnded = true;
      this.isQuizStarted = false;
    }


  }

  inDetails() {
    this.isQuizEnded = false;
    this.isQuizStarted = false;
    this.isResultDetails = true;
  }

  description() {
    this.isQuizEnded = false;
    this.isQuizStarted = false;
    this.isResultDetails = false;
    this.isAnswerDescription = true;
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
    this.isResultDetails = false;
    this.rightAnsCount = 0;
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
    this.isResultDetails = false;
    this.rightAnsCount = 0;

  }

  showWarningPopup() {

    console.log(">>>>>>this.obj>>>showWarningPopup>>>>>", this.obj);
    if (this.status == false) {
      if (localStorage.getItem('notInterested') !== 'yes') {
        const modalDiv = document.getElementById('myModal');
        if (modalDiv != null) {
          modalDiv.style.display = 'block'
          this.showWarning = false;
        }
      } else {
        this.showWarning = true;
        this.isResultDetails = false;
      }
    } else {

      this.showWarning = true;
      this.isResultDetails = false;
    }
  }

  startQuiz() {
    this.isResultDetails = false;
    this.showWarning = false;
    this.isQuizStarted = true;
    localStorage.removeItem('notInterested');
    this.commonservice.setQuizStatus(true, this.router2.url, "");
  }

  selectOption(event: any, option: any) {
    this.userSelected = option;
    this.activeId = event;
  }

  capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
