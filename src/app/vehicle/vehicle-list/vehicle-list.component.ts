import { Component, OnInit } from '@angular/core';
import { combineLatest, map } from 'rxjs';
import { VehicleService } from '../service/vehicle.service';
import { VehicleClassService } from '../vehicle-classes/vehicle-class.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css'],
})
export class VehicleListComponent implements OnInit {
  constructor(
    private vehicleService: VehicleService,
    private vehicleClassService: VehicleClassService
  ) {}
  vehicles$ = this.vehicleService.vehicles$;
  vehicleClasses$ = this.vehicleClassService.vehicleClassifications$;

  vm$ = combineLatest([this.vehicleClasses$, this.vehicles$]).pipe(
    map(([vehicleClasses, vehicles]) => ({ vehicles, vehicleClasses }))
  );
  ngOnInit() {}
}
