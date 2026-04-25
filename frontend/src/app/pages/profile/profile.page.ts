import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

interface Donation {
  date: string;
  location: string;
  amount: number;
}

interface UserProfile {
  name: string;
  role: string;
  bloodGroup: string;
  avatar?: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  location: string;
  weight: number;
  height: number;
  medicalConditions?: string;
  totalDonations: number;
  lifesSaved: number;
  lastDonation: string;
  recentDonations: Donation[];
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class ProfilePage implements OnInit {
  userProfile: UserProfile = {
    name: 'John Smith',
    role: 'Blood Donor',
    bloodGroup: 'A+',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: 'March 15, 1990',
    location: 'New York, NY',
    weight: 75,
    height: 180,
    medicalConditions: 'None',
    totalDonations: 12,
    lifesSaved: 36,
    lastDonation: '2 weeks ago',
    recentDonations: [
      {
        date: '2 weeks ago',
        location: 'NYC Blood Center',
        amount: 450
      },
      {
        date: '3 months ago',
        location: 'Community Hospital',
        amount: 450
      },
      {
        date: '6 months ago',
        location: 'Red Cross Center',
        amount: 450
      }
    ]
  };

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Load user profile data
  }

  editProfile() {
    // Navigate to edit profile page
    console.log('Edit profile');
  }

  changeAvatar() {
    // Handle avatar change
    console.log('Change avatar');
  }

  changePassword() {
    // Navigate to change password page
    console.log('Change password');
  }

  notificationSettings() {
    // Navigate to notification settings
    console.log('Notification settings');
  }

  privacySettings() {
    // Navigate to privacy settings
    console.log('Privacy settings');
  }

  viewAllDonations() {
    // Navigate to all donations page
    console.log('View all donations');
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
