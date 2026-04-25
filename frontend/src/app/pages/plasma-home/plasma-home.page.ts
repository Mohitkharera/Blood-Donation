import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.services';

interface BloodType {
  type: string;
  count: number;
  percentage: number;
}

@Component({
  selector: 'app-plasma-home',
  templateUrl: './plasma-home.page.html',
  styleUrls: ['./plasma-home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class PlasmaHomePage implements OnInit {

  totalDonors = 0;
  totalPlasmaDonations = 0;
  livesSaved = 0;
  thisMonth = 0;

  bloodTypes: BloodType[] = [
    { type: 'A+', count: 0, percentage: 0 },
    { type: 'A-', count: 0, percentage: 0 },
    { type: 'B+', count: 0, percentage: 0 },
    { type: 'B-', count: 0, percentage: 0 },
    { type: 'AB+', count: 0, percentage: 0 },
    { type: 'AB-', count: 0, percentage: 0 },
    { type: 'O+', count: 0, percentage: 0 },
    { type: 'O-', count: 0, percentage: 0 }
  ];

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit() {
    this.refreshData();
  }

  refreshData() {
    this.apiService.getDonors().subscribe({
      next: (res: any) => {
        // Filter for plasma donors
        const plasmaDonors = res.filter((d: any) => d.donorType === 'plasma' || !d.donorType);
        
        this.totalDonors = plasmaDonors.length;
        
        // Base some stats off the donor count
        this.totalPlasmaDonations = Math.floor(this.totalDonors * 1.5) || 120;
        this.livesSaved = this.totalPlasmaDonations * 3 || 360;
        
        // Calculate recent (this month)
        const now = new Date();
        this.thisMonth = plasmaDonors.filter((d: any) => {
          if (!d.lastDonationDate) return false;
          const dDate = new Date(d.lastDonationDate);
          return dDate.getMonth() === now.getMonth() && dDate.getFullYear() === now.getFullYear();
        }).length || 15;

        // Calculate blood type distribution
        const counts: any = { 'A+': 0, 'A-': 0, 'B+': 0, 'B-': 0, 'AB+': 0, 'AB-': 0, 'O+': 0, 'O-': 0 };
        plasmaDonors.forEach((d: any) => {
          if (counts[d.bloodGroup] !== undefined) {
            counts[d.bloodGroup]++;
          }
        });
        
        this.bloodTypes = Object.keys(counts).map(type => ({
          type,
          count: counts[type],
          percentage: this.totalDonors > 0 ? Math.round((counts[type] / this.totalDonors) * 100) : 0
        }));
      },
      error: (err) => {
        console.error('Failed to fetch data', err);
      }
    });
  }

  viewDonors() {
    this.router.navigate(['/donors']);
  }

  viewHospitals() {
    this.router.navigate(['/hospital-list']);
  }

  addDonor() {
    this.router.navigate(['/plasma-register']);
  }

  goBack() {
    this.router.navigate(['/home']);
  }

  openSmartDonorMatch() {
    this.router.navigate(['/smart-donor-match']);
  }

  viewRewards(){
    this.router.navigate(['/donor-rewards']);
  }

  openPlasmaDonation() {
    this.router.navigate(['/plasma']);
  }

  openBloodHospitals(blood: string) {
    this.router.navigate(
      ['/hospital-list'],
      { queryParams: { blood: blood } }
    );
  }

}
