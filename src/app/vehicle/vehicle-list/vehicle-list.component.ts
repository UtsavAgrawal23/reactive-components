import { Component } from '@angular/core';
import { combineLatest, map } from 'rxjs';
import { VehicleService } from '../service/vehicle.service';
import { VehicleClassService } from '../vehicle-classes/vehicle-class.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css'],
})
export class VehicleListComponent {
  pageTitle = 'Vehicles';
  constructor(
    private vehicleService: VehicleService,
    private vehicleClassService: VehicleClassService
  ) {}

  vehicles$ = this.vehicleService.vehicles$;
  vehicleClasses$ = this.vehicleClassService.vehicleClassifications$;

  selectedVehicle$ = this.vehicleService.seletedVehicle$;

  vm$ = combineLatest([
    this.vehicleClasses$,
    this.selectedVehicle$,
    this.vehicles$,
  ]).pipe(
    map(([vehicleClasses, selectedVehicle, vehicles]) => ({
      vehicles,
      vehicleClasses,
      selectedVehicle,
    }))
  );

  // Trigger when select vehicle class from dropdown
  // Emits the selected vehicle class
  onVehicleClassSelected(vehicleClass: string) {
    this.vehicleService.vehicleClassSelected(vehicleClass);
  }

  onVehicleSelected(vehicle: string) {
    this.vehicleService.onVehicleSelected(vehicle);
  }
}
