import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class LoginPage {
  email: string = '';
  password: string = '';
  rememberMe: boolean = true;
  showPassword: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alertController: AlertController,
    private authService: AuthService
  ) { }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  async onLogin() {
    if (this.email && this.password) {
      this.authService.login(this.email, this.password).subscribe({
        next: () => {
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
          this.router.navigateByUrl(returnUrl);
        },
        error: async () => await this.showInvalidCredentialsAlert()
      });
    } else {
      await this.showMissingCredentialsAlert();
    }
  }

  async showInvalidCredentialsAlert() {
    const alert = await this.alertController.create({
      header: 'Login Failed',
      message: 'Invalid username or password. Please try again.',
      buttons: ['OK'],
      cssClass: 'custom-alert'
    });
    await alert.present();
  }

  async showMissingCredentialsAlert() {
    const alert = await this.alertController.create({
      header: 'Missing Information',
      message: 'Please enter both username and password.',
      buttons: ['OK'],
      cssClass: 'custom-alert'
    });
    await alert.present();
  }

  continueAsGuest() {
    this.router.navigate(['/donors']);
  }

  goToDonorRewards() {
    this.router.navigate(['/donor-rewards']);
  }

  goToSignup() {

    console.log('Navigate to signup');
  }
}
