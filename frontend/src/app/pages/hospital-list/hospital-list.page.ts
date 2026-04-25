import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.services';

@Component({
  selector: 'app-hospital-list',
  templateUrl: './hospital-list.page.html',
  styleUrls: ['./hospital-list.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})

export class HospitalListPage implements OnInit {

  hospitals:any[] = [];
  selectedBloodType: string = '';

  constructor(
    private api:ApiService,
    private route:ActivatedRoute
  ){}

  ngOnInit(){

    this.route.queryParams.subscribe(params=>{

      const blood = params['blood'];
      this.selectedBloodType = blood || '';

      this.api.getHospitals().subscribe((data:any)=>{

        if(blood){

          this.hospitals = data.filter((h:any)=>
            h.bloodTypes?.includes(blood)
          );

        }else{

          this.hospitals = data;

        }

      });

    });

  }

  openHospitalLocation(hospital: any) {
    if (!hospital) return;

    const query = encodeURIComponent(`${hospital.name ?? ''} ${hospital.address ?? ''}`.trim());
    if (!query) return;

    const url = `https://www.google.com/maps/search/?api=1&query=${query}`;
    window.open(url, '_blank');
  }

}