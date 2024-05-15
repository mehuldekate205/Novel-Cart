import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { OrdersComponent } from './components/orders/orders.component';
import { RegisterComponent } from './components/register/register.component';
import { NovelCardComponent } from './components/home/novel-card/novel-card.component';
import { AdminPanelComponent } from './components/admin/admin-panel/admin-panel.component';
import { AddNovelComponent } from './components/admin/add-novel/add-novel.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { NovelDetailsComponent } from './components/novel-details/novel-details.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { adminGuard } from './guards/admin-guard.guard';
import { userGuard } from './guards/user-guard.guard';
import { AllOrdersComponent } from './components/admin/all-orders/all-orders.component';

const routes: Routes = [
    {path:'',component: HomeComponent},
    {path:'register',component: RegisterComponent},
    {path:'login',component: LoginComponent},
    {path:'filter', component: HomeComponent, canActivate: [userGuard]},
    {path:'search', component: HomeComponent, canActivate: [userGuard]},
    {path:'cart',component: CartComponent, canActivate: [userGuard]},
    {path:'orders',component: OrdersComponent, canActivate: [userGuard]},
    {path:'checkout',component: CheckoutComponent, canActivate: [userGuard]},
    {path:'novels',component: NovelCardComponent, canActivate: [userGuard]},
    {path:'noveldetails/:id', component: NovelDetailsComponent, canActivate: [userGuard]},
    {path:'adminpanel',component: AdminPanelComponent, canActivate: [adminGuard]},
    {path:'adminpanel/novel', component: AddNovelComponent, canActivate: [adminGuard]},
    {path:'adminpanel/novel/:id', component: AddNovelComponent, canActivate: [adminGuard]},
    {path:'allorders', component: AllOrdersComponent, canActivate: [adminGuard]},
    {path:'**',component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
