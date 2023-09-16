import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {DpDatePickerModule} from 'ng2-date-picker';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { UserReducer } from './reducers/user.reducer';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    DpDatePickerModule,
    ToastrModule.forRoot(),
    FormsModule, 
    StoreModule.forRoot({
      users: UserReducer,
    }),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
