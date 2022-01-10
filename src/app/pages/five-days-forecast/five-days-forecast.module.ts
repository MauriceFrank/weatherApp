import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FiveDaysForecastPage } from './five-days-forecast.page';
import { RouterModule } from '@angular/router';
import { WeatherDataService } from 'src/app/services/weather-data.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: FiveDaysForecastPage }]),
  ],
  declarations: [FiveDaysForecastPage],
})
export class FiveDaysForecastPageModule {}
