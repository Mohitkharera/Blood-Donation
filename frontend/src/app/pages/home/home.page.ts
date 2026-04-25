import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

interface BloodType {
  type: string;
  count: number;
  percentage: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class HomePage {

  totalDonors = 156;
  totalDonations = 342;
  livesSaved = 1026;
  thisMonth = 28;

  bloodTypes: BloodType[] = [
    { type: 'A+', count: 45, percentage: 29 },
    { type: 'A-', count: 12, percentage: 8 },
    { type: 'B+', count: 18, percentage: 12 },
    { type: 'B-', count: 6, percentage: 4 },
    { type: 'AB+', count: 8, percentage: 5 },
    { type: 'AB-', count: 3, percentage: 2 },
    { type: 'O+', count: 52, percentage: 33 },
    { type: 'O-', count: 12, percentage: 8 }
  ];

  constructor(private router: Router) {}

  refreshData() {}

  viewDonors() {
    this.router.navigate(['/donors']);
  }

  viewHospitals() {
    this.router.navigate(['/hospital-list']);
  }

  addDonor() {
    this.router.navigate(['/donor-registration']);
  }

  goBack() {
    this.router.navigate(['/login']);
  }

  openSmartDonorMatch() {
    this.router.navigate(['/smart-donor-match']);
  }

  viewRewards(){
    this.router.navigate(['/donor-rewards']);
  }

  openPlasmaDonation() {
    this.router.navigate(['/plasma-home']);
  }

  openBloodHospitals(blood: string) {

    this.router.navigate(
      ['/hospital-list'],
      { queryParams: { blood: blood } }
    );

  }

}