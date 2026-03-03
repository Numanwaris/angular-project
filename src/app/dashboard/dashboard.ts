import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../auth/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
standalone: true,
  imports: [CommonModule, FormsModule ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {

  user: any;
   selectedMenu: string = 'Home';
   isEditMode: boolean = false;
   homeImages: string[] = [];
   userAnswers: string[] = [];

  constructor(private auth: Auth, private router: Router) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('loggedInUser');

  if (!userData) {
    this.router.navigate(['/login']);
    return;
  }

  this.user = JSON.parse(userData);
}
onImageUpload(event: any) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    this.user.photo = reader.result;
    localStorage.setItem('loggedInUser', JSON.stringify(this.user));
  };

  reader.readAsDataURL(file);
}

saveProfile() {
  localStorage.setItem('loggedInUser', JSON.stringify(this.user));
  this.isEditMode = false;
}
onHomeImageUpload(event: any) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    this.homeImages.push(reader.result as string);
    localStorage.setItem('homeImages', JSON.stringify(this.homeImages));
  };

  reader.readAsDataURL(file);
}
deleteImage(index: number) 
{ this.homeImages.splice(index, 1);
   localStorage.setItem('homeImages', JSON.stringify(this.homeImages)); 
  }

  quizQuestions = [
    { question: "What is the capital of India?", 
      options: ["Delhi", "Mumbai", "Chennai", "Kolkata"],
       answer: "Delhi" }, 


       { question: "2 + 2 = ?",
         options: ["3", "4", "5", "6"], 
         answer: "4" }, 

         { question: "Angular is a ?",
           options: ["Framework", "Language", "Database", "Browser"], 
           answer: "Framework" }, 

           { question:"3 +2 = ?", 
            options :["5", "2", "4", "7"], 
            answer:"5" },

            {
              question:"CM of Up =?",
              options:["Akhileash", "Yogitakla","Rajpal","Ramesh"],
              answer:"Yogitakla"
            }

  ];
    currentQuestionIndex = 0;
    score = 0;
    wrong = 0;
    selectedOption = '';
    quizFinished = false;

  selectOption(option: string) {
   this.selectedOption = option;
}
        
    nextQuestion(){
      if (this.selectedOption === this.quizQuestions[this.currentQuestionIndex].answer) {
     this.score++;
}    else {
     this.wrong++;
}      this.selectedOption = '';

      if (this.currentQuestionIndex < this.quizQuestions.length - 1) {
  this.currentQuestionIndex++;
} else {
  this.quizFinished = true;
}
    } 
    restartQuiz() { 
      this.currentQuestionIndex = 0; 
      this.score = 0; 
      this.wrong = 0; 
      this.quizFinished = false;
     }
    



  logout() {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/login']);
  }

}