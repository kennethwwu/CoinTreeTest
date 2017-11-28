import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


//components
import { AppComponent } from './app.component';
import { HomeComponent } from './page/home/home.component';
import { MainNavbarComponent } from './componnet/main-navbar/main-navbar.component';

// routeModule
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { ChartsModule } from 'ng2-charts';

// service
import{ CrytoPriceSeriveService } from './service/cryto-price-serive.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainNavbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    CurrencyMaskModule,
    ChartsModule
  ],
  providers: [CrytoPriceSeriveService],
  bootstrap: [AppComponent]
})
export class AppModule { }
