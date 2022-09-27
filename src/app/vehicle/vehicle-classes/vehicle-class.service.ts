import { Injectable } from '@angular/core';
import { map, of, shareReplay } from 'rxjs';
import { VehicleClassData } from './vehicle-class-data';

@Injectable({
  providedIn: 'root',
})
export class VehicleClassService {
  vehicleClassifications$ = of(VehicleClassData.classes).pipe(
    map((classes) => classes.sort((a, b) => a.name.localeCompare(b.name))),
    shareReplay(1)
  );
}
