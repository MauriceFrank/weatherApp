import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'weather/current-weather',
    pathMatch: 'full',
  },
  {
    path: 'weather/current-weather',
    loadChildren: () =>
      import('./pages/current-weather/current-weather.module').then(
        (m) => m.CurrentWeatherPageModule
      ),
  },
  {
    path: 'weather/five-days-forecast',
    loadChildren: () =>
      import('./pages/five-days-forecast/five-days-forecast.module').then(
        (m) => m.FiveDaysForecastPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
