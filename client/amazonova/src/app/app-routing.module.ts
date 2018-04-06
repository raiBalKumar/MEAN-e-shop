import { SearchComponent } from './search/search.component';
import { CategoryComponent } from './category/category.component';
import { MyproductsComponent } from './myproducts/myproducts.component';
import { PostProductComponent } from './post-product/post-product.component';
import { CategoriesComponent } from './categories/categories.component';
import { AddressComponent } from './address/address.component';
import { SettingsComponent } from './settings/settings.component';
import { AuthGuardService } from './auth-guard.service';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { ProductComponent } from './product/product.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'register',
    component: RegistrationComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuardService]

  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'profile/settings',
    component: SettingsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'profile/address',
    component: AddressComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'profile/postproduct',
    component: PostProductComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'profile/myproducts',
    component: MyproductsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'categories',
    component: CategoriesComponent,
    
  },
  {
    path: 'categories/:id',
    component: CategoryComponent
  },
  {
    path: 'product/:id',
    component: ProductComponent
  },
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
