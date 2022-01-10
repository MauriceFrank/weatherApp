import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { WeatherDataService } from './services/weather-data.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent], //components
  entryComponents: [], //pages
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    WeatherDataService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
