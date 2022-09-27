import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../service/vehicle.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {

  constructor(private vehicleService : VehicleService) { }
  vehicles$ = this.vehicleService.vehicles$
  ngOnInit() {
   
  }

}