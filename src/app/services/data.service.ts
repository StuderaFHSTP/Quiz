import { Injectable } from '@angular/core';
import { Quiz } from './quiz';
import { Question } from './question';
import {v4 as uuidv4} from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public currentQuiz: Quiz = {
    id: '1',
    quizName: 'Test Your Knowledge',
    questions: []
  }

  constructor() { 
    this.currentQuiz.questions.push({
        id: '1',
        title: 'In welchem Modus ist Mona?',
        a1: 'normal',
        a2: 'gechillt',
        a3: 'BAKAAAAAA',
        a4: 'wütend',
        correct: 3
      });
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
}
