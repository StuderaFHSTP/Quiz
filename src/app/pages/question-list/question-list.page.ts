import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonButtons, IonBackButton, IonIcon, IonList, IonItem, IonLabel, IonItemOptions, IonItemSliding, IonItemOption } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Question } from 'src/app/services/question';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.page.html',
  styleUrls: ['./question-list.page.scss'],
  standalone: true,
  imports: [IonItemOption, IonItemSliding, IonItemOptions, IonLabel, IonItem, IonIcon, IonBackButton, IonButtons, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonList]
})
export class QuestionListPage implements OnInit {

  private router = inject(Router);
  public data = inject(DataService);

  constructor() { }

  ngOnInit() {
  }

  public show(qid: string) {
    this.router.navigate(['/question', qid]);
  }

  public delete(q: Question) {
  this.data.deleteQuestion(q);
  }

}
