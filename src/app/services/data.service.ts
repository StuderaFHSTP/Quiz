import { inject, Injectable } from '@angular/core';
import { Quiz } from './quiz';
import { Question } from './question';
import {v4 as uuidv4} from 'uuid';
import {Preferences} from '@capacitor/preferences';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private http: HttpClient = inject(HttpClient);
  public currentQuiz: Quiz = {
    id: '1',
    quizName: 'Test Your Knowledge',
    questions: []
  }

  constructor() { 
    // this.currentQuiz.questions.push({
    //     id: '1',
    //     title: 'In welchem Modus ist Mona?',
    //     a1: 'normal',
    //     a2: 'gechillt',
    //     a3: 'BAKAAAAAA',
    //     a4: 'wütend',
    //     correct: 3
    //   });
    this.loadQuiz();
  }

  // ngOnInit() {
  //   this.loadQuiz();
  // }

  public loadQuiz() {
    return Preferences
    .get({key: 'quiz'})
    .then((result) => {
      if(result.value) {
        this.currentQuiz = JSON.parse(result.value) as Quiz;
        console.info('Loaded quiz', this.currentQuiz);
      }
    })
    .catch((error) => {
      console.error('Failed to load quiz', error);
    });
  }

  public saveQuiz() {
    Preferences.set({key: 'quiz', value: JSON.stringify(this.currentQuiz)});
  }

  public getNewQuestion(): Question {
    return {
      id: '0',
      title: '',
      a1: '',
      a2: '',
      a3: '',
      a4: '',
      correct: 1
    }
  }

  public getQuestion(id: string): Question | undefined {
    return this.currentQuiz.questions.find(q => q.id === id);
  }

  public addQuestion(q: Question) {
    if(q.id === '0') {
      q.id = uuidv4();
    }
    this.currentQuiz.questions.push(q);
  }

  public deleteQuestion(q: Question) {
    this.currentQuiz.questions = this.currentQuiz.questions.filter(qq => qq.id !== q.id);
  }

  public loadQuizFromJson() {
    this.http.get<Quiz>('assets/data.json').subscribe((data: Quiz) => {
      if(data && data.hasOwnProperty('quizName')) {
        this.currentQuiz = data;
      } else {
        console.error('Failed to load quiz from JSON', data);
      }
     

    });
  }
}
