import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApiService } from '../../services/api.services';

@Component({
  selector: 'app-smart-donor-match',
  templateUrl: './smart-donor-match.page.html',
  styleUrls: ['./smart-donor-match.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class SmartDonorMatchPage {

  bloodGroup: string = '';
  city: string = '';

  bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  donors: any[] = [];
  loading = false;
  searched = false;

  constructor(private api: ApiService) {}

  searchDonors() {
    console.log('[SMART DONORS] search requested', {
      bloodGroup: this.bloodGroup,
      city: this.city
    });

    if (!this.bloodGroup) {
      this.searched = true;
      this.donors = [];
      return;
    }

    this.loading = true;
    this.searched = true;
    this.donors = [];

    this.api.getSmartDonors(this.bloodGroup, this.city).subscribe({
      next: (data: any) => {
        console.log('[SMART DONORS] response received', data);
        this.donors = data || [];
      },
      error: () => {
        console.error('[SMART DONORS] API error');
        this.donors = [];
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

}

