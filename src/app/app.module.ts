import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from '@app/app.component';
import { AppRoutingModule } from '@app/app-routing.module';
import { LayoutModule } from '@app/features/layout/layout.module';
import { FirebaseModule } from '@app/features/firebase/firebase.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, LayoutModule, FirebaseModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
