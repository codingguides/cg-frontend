import { Component } from '@angular/core';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css'],
})
export class LoginModalComponent {
  modalClass = 'modal';
  showLogin: boolean = true;
  showLoginText: String = "Don't have an account? Sign Up";

  closeModal() {
    const modalDiv = document.getElementById('myModal');
    if (modalDiv != null) {
      modalDiv.style.display = 'none';
      localStorage.setItem('notInterested', 'yes');
    }
  }

  changeLogin(val: boolean) {
    this.showLogin = !val;
    if (val == true) {
      this.showLoginText = 'Already have an account? Sign In';
    } else {
      this.showLoginText = "Don't have an account? Sign Up";
    }
  }
}
