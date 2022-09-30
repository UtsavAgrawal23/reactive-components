import { Component, OnInit } from '@angular/core';
import { catchError, combineLatest, EMPTY, map } from 'rxjs';
import { VehicleService } from '../service/vehicle.service';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css'],
})
export class VehicleDetailsComponent implements OnInit {
  constructor(private vehicleService: VehicleService) {}

  selectedVehicle$ = this.vehicleService.seletedVehicle$.pipe(
    catchError((err) => EMPTY)
  );
  pageTitle$ = this.selectedVehicle$.pipe(
    map((v) => (v ? `Details of ${v.name}` : null))
  );

  vm$ = combineLatest([this.selectedVehicle$, this.pageTitle$]).pipe(
    map(([vehicle, pageTitle]) => ({ vehicle, pageTitle }))
  );

  ngOnInit() {}
}
