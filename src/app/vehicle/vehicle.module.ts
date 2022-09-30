import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleShellComponent } from './vehicle-shell/vehicle-shell.component';
import { RouterModule } from '@angular/router';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: VehicleShellComponent }]),
  ],
  declarations: [
    VehicleShellComponent,
    VehicleListComponent,
    VehicleDetailsComponent,
  ],
})
export class VehicleModule {}
