import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Question } from 'src/app/services/question';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonButtons, IonBackButton, IonIcon, IonList, IonItem, IonLabel, IonItemOptions, IonItemSliding, IonItemOption } from '@ionic/angular/standalone';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss'],
  standalone: true,
  imports: [IonItemOption, IonItemSliding, IonItemOptions, IonLabel, IonItem, IonIcon, IonBackButton, IonButtons, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonList]
})
export class QuizPage implements OnInit {
  public counter = 0;
  public questions: Question[] = [];
  public currentQuestion = 0;
  public showResult:boolean = false;

  private toastController = inject(ToastController);
  public data = inject(DataService);

  constructor() { }

  ngOnInit() {
    this.showResult = false;
    this.counter = 0;
    this.currentQuestion = 0;
    this.questions = this.shuffleArray([...this.data.currentQuiz.questions]);
  }

  public answerQuestion(answer:number) {
    console.log('Answer:', answer);
    console.log('Correct:', this.questions[this.currentQuestion].correct);
    if(answer === this.questions[this.currentQuestion].correct) {
      this.counter++;
      this.showToast('Richtig!', 'success');
    } else {
      this.showToast('Falsch!', 'danger'); 
    }
    this.currentQuestion++;
    if(this.currentQuestion >= this.questions.length) {
      this.showResult = true;
    }
  }

  async showToast(message: string, color: 'success' | 'danger') {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: 'top',
      color: color
    });
    await toast.present();
  }

  shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
