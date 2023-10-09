import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  showWarning: boolean = false;
  isQuizStarted: boolean = false;
  isQuizEnded: boolean = false;
  questionsList: any[] = [];
  currentQuestionNo: number = 0;
  correctAnswerCount: number = 0;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadQuestions();
  }

  loadQuestions() {
    this.http.get("assets/questions.json").subscribe((res: any) => {
      this.questionsList = res;
    })
  }

  nextQuestion() {
    if (this.currentQuestionNo < this.questionsList.length - 1) {
      this.currentQuestionNo++;
    }
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
    this.correctAnswerCount = 0
  }

  replay() {
    this.showWarning = false;
    this.isQuizEnded = false;
    this.isQuizStarted = true;
    this.currentQuestionNo = 0;
    this.loadQuestions();
    this.correctAnswerCount = 0;
  }


  showWarningPopup() {
    this.showWarning = true;
  }
  startQuiz() {
    this.showWarning = false;
    this.isQuizStarted = true;
  }

  selectOption(option: any) {
    if (option.isCorrect) {
      this.correctAnswerCount++;
    }
    option.isSelected = true;
  }

  isOptionSelected(options: any) {
    const selectionCount = options.filter((m: any) => m.isSelected == true).length;
    if (selectionCount == 0) {
      return false;
    } else {
      return true;
    }
  }



}
