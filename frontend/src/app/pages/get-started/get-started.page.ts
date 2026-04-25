import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.page.html',
  styleUrls: ['./get-started.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class GetStartedPage {
  constructor(private router: Router) {}

  getStarted() {
    this.router.navigate(['/login']);
  }
}
