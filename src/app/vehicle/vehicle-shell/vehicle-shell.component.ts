import { Component } from '@angular/core';

@Component({
  template: `
  <div class='row'>
  <div class='col-md-4'>
     <app-vehicle-list></app-vehicle-list>
  </div>
  <div class='col-md-8'>
   vehicle details
  </div>
</div>`,
})
export class VehicleShellComponent {}
