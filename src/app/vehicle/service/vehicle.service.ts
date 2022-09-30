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
  of,
  reduce,
  switchMap,
  tap,
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

  //Action stream
  private vehicleSelectedSubject = new BehaviorSubject<string>('');
  vehicleSeleted$ = this.vehicleSelectedSubject.asObservable();

  constructor(private http: HttpClient) {}

  // All pages vehicles
  allVehicles$ = this.http.get<VehicleResponse>(this.url).pipe(
    expand((data) =>
      data.next ? this.http.get<VehicleResponse>(data.next) : EMPTY
    ),
    reduce((acc, data) => acc.concat(data.results), [] as Vehicle[])
  );

  //vehicle selected

  seletedVehicle$ = this.vehicleSeleted$.pipe(
    tap((name) => console.log(name)),
    switchMap((vehicleName) =>
      vehicleName.length
        ? this.http
            .get<VehicleResponse>(`${this.url}?search=${vehicleName}`)
            .pipe(
              map((data) => data.results[0]),
              //Fill the random price if missing
              map((v) => ({
                ...v,
                cost_in_credits: isNaN(Number(v.cost_in_credits))
                  ? String(Math.random() * 100000)
                  : v.cost_in_credits,
              })),
              tap((data) => console.log(data)),
              catchError(this.handleError)
            )
        : of(null)
    )
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

  // emits the selected vehicle class
  vehicleClassSelected(vehicleClass: string): void {
    this.vehicleClassSubject.next(vehicleClass);
  }

  onVehicleSelected(vehicle: string) {
    this.vehicleSelectedSubject.next(vehicle);
  }

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
