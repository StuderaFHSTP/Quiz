import { Injectable } from '@angular/core';
import { Quiz } from './quiz';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public currentQuiz: Quiz = {
    id: '1',
    quizName: 'Test Your Knowledge',
    questions: [
    
    ]
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
}
