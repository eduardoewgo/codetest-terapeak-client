import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DataTableComponent} from './core/shared/data-table/data-table.component';
import {HomeComponent} from './home/home.component';
import {HttpClientModule} from '@angular/common/http';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EnumToArrayPipe} from './core/pipes/enum-to-array.pipe';
import {NumericDirective} from './core/directives/numeric.directive';


@NgModule({
  declarations: [
    AppComponent,
    DataTableComponent,
    HomeComponent,
    EnumToArrayPipe,
    NumericDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ScrollingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [EnumToArrayPipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
