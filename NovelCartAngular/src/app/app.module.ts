import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./material.module"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminPanelComponent } from './components/admin/admin-panel/admin-panel.component';
import { AddNovelComponent } from './components/admin/add-novel/add-novel.component';
import { DeleteNovelComponent } from './components/admin/delete-novel/delete-novel.component';
import { HomeComponent } from './components/home/home.component';
import { CategoryFilterComponent } from './components/home/category-filter/category-filter.component';
import { PriceFilterComponent } from './components/home/price-filter/price-filter.component';
import { NovelCardComponent } from './components/home/novel-card/novel-card.component';
import { AddToCartComponent } from './components/home/add-to-cart/add-to-cart.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SearchComponent } from './components/search/search.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CartComponent } from './components/cart/cart.component';
import { OrdersComponent } from './components/orders/orders.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CommonModule } from '@angular/common';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { tokenInterceptor } from './interceptors/token.interceptor';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { NovelDetailsComponent } from './components/novel-details/novel-details.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AllOrdersComponent } from './components/admin/all-orders/all-orders.component';
import { errorInterceptor } from './interceptors/error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    AdminPanelComponent,
    AllOrdersComponent,
    AddNovelComponent,
    DeleteNovelComponent,
    HomeComponent,
    CategoryFilterComponent,
    PriceFilterComponent,
    NovelCardComponent,
    AddToCartComponent,
    NavBarComponent,
    SearchComponent,
    LoginComponent,
    RegisterComponent,
    CartComponent,
    OrdersComponent,
    CheckoutComponent,
    NovelDetailsComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([tokenInterceptor, errorInterceptor])),
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2000}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
