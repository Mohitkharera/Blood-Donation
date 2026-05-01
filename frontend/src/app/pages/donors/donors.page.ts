import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

import {
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonSearchbar
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-donors',
  templateUrl: './donors.page.html',
  styleUrls: ['./donors.page.scss'],
  standalone: true,

  imports: [
    CommonModule,
    FormsModule,

    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonButton,
    IonIcon,
    IonSearchbar
  ]
})

export class DonorsPage implements OnInit {

  donors: any[] = [];
  allDonors: any[] = [];
  searchText: string = "";

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {

    this.loadDonors();

  }

  loadDonors() {

    this.http.get(`${environment.apiUrl}/api/donors`)
    .subscribe((data: any) => {

      /* First 15 donors not available */

      data.forEach((donor: any, index: number) => {

        if(index < 15){
          donor.available = false;
        } else {
          donor.available = true;
        }

        // Set default donorType if not present
        if (!donor.donorType) {
          donor.donorType = 'blood';
        }

      });

      this.donors = data;
      this.allDonors = data;

    });

  }

  searchDonor(){

    const text = this.searchText.toLowerCase();

    this.donors = this.allDonors.filter((donor:any) =>
      donor.name.toLowerCase().includes(text)
    );

  }

  addPlasmaDonor() {
    this.router.navigate(['/donor-registration'], { queryParams: { donorType: 'plasma' } });
  }

}