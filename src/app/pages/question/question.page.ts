import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonButtons, IonItem, IonLabel, IonList, IonInput } from '@ionic/angular/standalone';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Question } from 'src/app/services/question';

@Component({
  selector: 'app-question',
  templateUrl: './question.page.html',
  styleUrls: ['./question.page.scss'],
  standalone: true,
  imports: [IonInput, IonList, IonLabel, IonItem, IonButtons, IonBackButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class QuestionPage implements OnInit {
  public data: DataService = inject(DataService);
  private route = inject(ActivatedRoute);
  public question!: Question;

  constructor() { 

  }

  ngOnInit() {
    let questionid = this.route.snapshot.paramMap.get('id');
    if(questionid == null) {
      questionid = "0";
    }
    if (questionid == "0") {
      this.question = this.data.getNewQuestion();
    }
    else {
      this.question = this.data.getQuestion(questionid) || this.data.getNewQuestion();
    }
    console.log("Question: ", this.question);
  }


  ionViewWillLeave() {
    if(this.question.title.length > 3 && this.question.id === '0') {
      this.question.correct = parseInt(String(this.question.correct), 10) || 0;
      this.data.addQuestion(this.question);
    }
    this.data.saveQuiz();
  }
}
