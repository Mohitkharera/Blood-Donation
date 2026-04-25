import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ApiService } from '../../services/api.services';

@Component({
  selector: 'app-donor-rewards',
  templateUrl: './donor-rewards.page.html',
  styleUrls: ['./donor-rewards.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class DonorRewardsPage implements OnInit {

  donors: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadRewards();
  }

  loadRewards() {
    this.api.getDonorRewards().subscribe({
      next: (data: any) => {
        this.donors = data || [];
      },
      error: () => {
        this.donors = [];
      }
    });
  }
}

