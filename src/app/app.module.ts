
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ButtonModule, DataTableModule, InputTextareaModule, MenubarModule, CheckboxModule, InputTextModule, PanelModule, MultiSelectModule, GrowlModule, TabViewModule, TabPanel, Calendar, CalendarModule, ConfirmDialogModule, AccordionModule, FieldsetModule, CarouselModule, CardModule, ProgressBarModule, MenuModule, SpinnerModule, SelectButtonModule, ChartModule } from 'primeng/primeng';
import { RadioButtonModule } from 'primeng/primeng';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { GalleriaModule } from 'primeng/galleria';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { CodeHighlighterModule } from 'primeng/codehighlighter';

import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';

import { AutoCompleteModule } from 'primeng/autocomplete';
import { CommonModule } from '@angular/common';
import {DataViewModule} from 'primeng/dataview';
import { FileUploadModule } from 'primeng/fileupload';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { BlockUIModule } from 'primeng/blockui';
import { TooltipModule } from 'primeng/tooltip';
import { AppRoutingModule } from './app-routing/app-routing.module';
/* import {WebStorageModule, LocalStorageService} from "angular-localstorage"; */
import { SidebarModule } from 'primeng/sidebar';
import { CarServiceComponent } from './car-service/car-service.component';
import { FoodComponent } from './foodzilla/food/food.component';
import { OrderComponent } from './register/order.component';
import { ServiceComponent } from './service/service.component';
import { MilestoneComponent } from './milestone/milestone.component';
import { ChatComponent } from './chat/chat.component';
import { EnterproductsComponent } from './enterproducts/enterproducts.component';
import { ViewproductsComponent } from './viewproducts/viewproducts.component';
import { LoginComponent } from './login/login.component';
import { MainPageComponent } from './main-page/main-page.component';
import { MessageService } from './car-service/mesgService';
import { RequestComponent } from './request/request.component';
import { AdminComponent } from './admin/admin.component';
import { RequestDetailComponent } from './request-detail/request-detail.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { GameComponent } from './game/game.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PollingComponent } from './test/polling/polling.component';

@NgModule({
  declarations: [
    AppComponent,
    
    OrderComponent,
    CarServiceComponent,
    FoodComponent,
    ServiceComponent,
    MilestoneComponent,
    ChatComponent,
    EnterproductsComponent,
    ViewproductsComponent,
    LoginComponent,
    MainPageComponent,
    RequestComponent,
    AdminComponent,
    RequestDetailComponent,
    ErrorPageComponent,
    GameComponent,
    DashboardComponent,
    PollingComponent,
  ]
  , bootstrap: [AppComponent],
  imports: [
    BrowserAnimationsModule, SidebarModule,ProgressBarModule,
    CardModule,SpinnerModule,
    BrowserModule, DialogModule,
    DataViewModule,
    HttpModule, AutoCompleteModule,
    CommonModule,ChartModule,
    CodeHighlighterModule,
    DropdownModule,
    HttpClientModule,
    ReactiveFormsModule,
    DataTableModule,
    TableModule,
    MessagesModule,
    MessageModule,
    GrowlModule,
    InputTextareaModule,
    MenubarModule,
    GalleriaModule,
    InputTextModule,
    
    
    MultiSelectModule,
    TabViewModule,
    FormsModule,
    PanelModule,
    ButtonModule,
    RadioButtonModule,
    SelectButtonModule,
    CheckboxModule,
    CalendarModule,
    FileUploadModule,
    ConfirmDialogModule,
    AccordionModule,
    BlockUIModule,
    TooltipModule,
    AppRoutingModule,
    FieldsetModule,
    CarouselModule,
    MenuModule,
    
    


  ],
  providers: [ServiceComponent,MessageService],
})
export class AppModule { }


