import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  apiUrl = `${environment.apiUrl}/api`;

  constructor(private http: HttpClient) {}

  // Hospitals
  getHospitals(){
    return this.http.get(this.apiUrl + "/hospitals");
  }

  // Donors
  getDonors(){
    return this.http.get(this.apiUrl + "/donors");
  }

  // Smart donor matching
  getSmartDonors(bloodGroup: string, city: string){
    const params: any = { bloodGroup };
    if (city) {
      params.city = city;
    }
    return this.http.get(this.apiUrl + "/smart-donors", { params });
  }

  // Donor rewards
  getDonorRewards(){
    return this.http.get(this.apiUrl + "/donor-rewards");
  }

}
