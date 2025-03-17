import { Injectable } from '@angular/core';
import { Quiz } from './quiz';
import { Question } from './question';

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
      correct: 0
    }
  }

  public getQuestion(id: string): Question | undefined {
    return this.currentQuiz.questions.find(q => q.id === id);
  }
}
