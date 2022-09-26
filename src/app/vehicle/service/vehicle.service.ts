import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  EMPTY,
  expand,
  map,
  Observable,
  reduce,
  throwError,
} from 'rxjs';
import { Vehicle, VehicleResponse } from '../vehicle';
@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private url = 'https://swapi.py4e.com/api/vehicles';
  // Action stream
  private vehicleClassSubject = new BehaviorSubject<string>('');
  vehicleClassSelected$ = this.vehicleClassSubject.asObservable();

  constructor(private http: HttpClient) {}

  // All pages vehicles
  allVehicles$ = this.http.get<VehicleResponse>(this.url).pipe(
    expand((data) =>
      data.next ? this.http.get<VehicleResponse>(data.next) : EMPTY
    ),
    reduce((acc, data) => acc.concat(data.results), [] as Vehicle[])
  );

  // Vehicles filterd by selected class
  vehicles$ = combineLatest([
    this.allVehicles$,
    this.vehicleClassSelected$,
  ]).pipe(
    map(([vehicles, selectedVehicleClass]) =>
      vehicles.filter((v) =>
        selectedVehicleClass
          ? v.vehicle_class
              .toLowerCase()
              .includes(selectedVehicleClass.toLowerCase())
          : true
      )
    ),
    catchError(this.handleError)
  );

  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client side or network error occured
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // backend error
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
