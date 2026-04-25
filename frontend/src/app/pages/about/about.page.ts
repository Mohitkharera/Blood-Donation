import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

interface BloodType {
  type: string;
  percentage: number;
  canDonateTo: string;
  canReceiveFrom: string;
}

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class AboutPage implements OnInit {
  bloodTypes: BloodType[] = [
    {
      type: 'A+',
      percentage: 30,
      canDonateTo: 'A+, AB+',
      canReceiveFrom: 'A+, A-, O+, O-'
    },
    {
      type: 'A-',
      percentage: 6,
      canDonateTo: 'A+, A-, AB+, AB-',
      canReceiveFrom: 'A-, O-'
    },
    {
      type: 'B+',
      percentage: 9,
      canDonateTo: 'B+, AB+',
      canReceiveFrom: 'B+, B-, O+, O-'
    },
    {
      type: 'B-',
      percentage: 2,
      canDonateTo: 'B+, B-, AB+, AB-',
      canReceiveFrom: 'B-, O-'
    },
    {
      type: 'AB+',
      percentage: 4,
      canDonateTo: 'AB+ only',
      canReceiveFrom: 'All blood types'
    },
    {
      type: 'AB-',
      percentage: 1,
      canDonateTo: 'AB+, AB-',
      canReceiveFrom: 'A-, B-, AB-, O-'
    },
    {
      type: 'O+',
      percentage: 39,
      canDonateTo: 'A+, B+, AB+, O+',
      canReceiveFrom: 'O+, O-'
    },
    {
      type: 'O-',
      percentage: 9,
      canDonateTo: 'All blood types',
      canReceiveFrom: 'O- only'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    // Initialize page
  }

  getStarted() {
    // Navigate to registration or home page
    this.router.navigate(['/home']);
  }
}
