import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

interface DonorForm {
  fullName: string;
  age: number | null;
  gender: 'Male' | 'Female' | 'Other' | '';
  bloodType: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  lastDonationDate: string;
  emergencyDonor: boolean;
  notes: string;
  donorType: 'plasma';
}

@Component({
  selector: 'app-plasma-donor-registration',
  templateUrl: './plasma-donor-registration.page.html',
  styleUrls: ['./plasma-donor-registration.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PlasmaDonorRegistrationPage implements OnInit {
  donor: DonorForm = {
    fullName: '',
    age: null,
    gender: '',
    bloodType: '',
    phone: '',
    email: '',
    city: '',
    state: '',
    lastDonationDate: '',
    emergencyDonor: false,
    notes: '',
    donorType: 'plasma'
  };

  bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-','unknown'];
  states = ['Delhi', 'Maharashtra','Haryana', 'Karnataka', 'Tamil Nadu', 'Uttar Pradesh', 'Gujarat', 'Rajasthan', 'Punjab', 'Telangana', 'West Bengal', 'Kerala', 'Madhya Pradesh'];

  constructor(
    private toastController: ToastController,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
  }

  async submitForm() {
    if (!this.donor.fullName || !this.donor.bloodType || !this.donor.phone) {
      const toast = await this.toastController.create({
        message: 'Please fill in your name, blood type, and contact number.',
        duration: 2500,
        color: 'warning',
        position: 'top'
      });
      await toast.present();
      return;
    }

    const payload = {
      name: this.donor.fullName,
      age: this.donor.age,
      gender: this.donor.gender,
      bloodGroup: this.donor.bloodType,
      phone: this.donor.phone,
      email: this.donor.email,
      city: this.donor.city,
      state: this.donor.state,
      lastDonationDate: this.donor.lastDonationDate || null,
      notes: this.donor.notes,
      availableForEmergency: this.donor.emergencyDonor,
      donorType: this.donor.donorType
    };

    this.http.post(`${environment.apiUrl}/api/donors`, payload).subscribe({
      next: async () => {
        const toast = await this.toastController.create({
          message: 'Plasma donor registered successfully',
          duration: 2500,
          color: 'success',
          position: 'top'
        });
        await toast.present();
        this.resetForm();
        this.router.navigate(['/donors']);
      },
      error: async () => {
        const toast = await this.toastController.create({
          message: 'Failed to register plasma donor. Please try again.',
          duration: 2500,
          color: 'danger',
          position: 'top'
        });
        await toast.present();
      }
    });
  }

  resetForm() {
    this.donor = {
      fullName: '',
      age: null,
      gender: '',
      bloodType: '',
      phone: '',
      email: '',
      city: '',
      state: '',
      lastDonationDate: '',
      emergencyDonor: false,
      notes: '',
      donorType: 'plasma'
    };
  }
}
