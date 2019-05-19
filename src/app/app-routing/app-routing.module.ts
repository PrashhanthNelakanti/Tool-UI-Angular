import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { OrderComponent } from '../register/order.component';
import { FoodComponent } from '../foodzilla/food/food.component';
import { ServiceComponent } from '../service/service.component';
import { MilestoneComponent } from '../milestone/milestone.component';
import { ChatComponent } from '../chat/chat.component';
import { EnterproductsComponent } from '../enterproducts/enterproducts.component';
import { ViewproductsComponent } from '../viewproducts/viewproducts.component';
import { LoginComponent } from '../login/login.component';
import { RequestComponent } from '../request/request.component';
import { AdminComponent } from '../admin/admin.component';
import { RequestDetailComponent } from '../request-detail/request-detail.component';
import { ErrorPageComponent } from '../error-page/error-page.component';
import { GameComponent } from '../game/game.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { PollingComponent } from '../test/polling/polling.component';


const appRoutes: Routes = [
  
  {
    path: '', component: LoginComponent
  },
  {
    path: 'game', component: GameComponent
  },
  {
    path: 'dashBoard', component: DashboardComponent
  },
  {
    path: 'chat', component: ChatComponent
  },
  {
    path: 'reg', component: OrderComponent
  },
  {
    path: 'service', component: ServiceComponent
  },
  {
    path: 'milestone', component: MilestoneComponent
  },
  {
    path: 'home', component: FoodComponent
  },
  {
    path: 'poll', component: PollingComponent
  },
  {
    path: 'uploadProd', component: EnterproductsComponent
  },
  {
    path: 'viewProd', component: ViewproductsComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'req', component: RequestComponent
  },
  {
    path: 'tickets/:name', component: AdminComponent
  },
  {
    path: 'reqD/:id/:name', component: RequestDetailComponent 
  },
  /* {
    path: '404', component: ErrorPageComponent
  },
  {
    path: '**', redirectTo:'/404'
  }, */
  
  
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes),

  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule {

}
export const routingComponents = [

];
