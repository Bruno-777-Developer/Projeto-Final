import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {SideNavInnerToolbarModule, SideNavOuterToolbarModule, SingleCardModule} from './layouts';
import {FooterModule, LoginFormModule} from './shared/components';
import {AppInfoService, AuthService, ScreenService} from './shared/services';
import {UnauthenticatedContentModule} from './unauthenticated-content';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {DxButtonModule, DxDataGridModule, DxFormModule, DxSelectBoxModule, DxTextAreaModule, DxTextBoxModule} from 'devextreme-angular';
import {HomeComponent} from './pages/home/home.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {TasksComponent} from './pages/tasks/tasks.component';
import {EstadoCidadeComponent} from './shared/components/estado-cidade/estado-cidade.component';
import { ProdutosComponent } from './pages/produtos/produtos.component';
import { ContribuinteComponent } from './pages/contribuinte/contribuinte.component';
import {FirstKeysToConsolePipe} from "./shared/core/first.keys.to.console.pipe";
import {NotaComponent} from "./pages/nota/nota.component";
import {GridItemComponent} from "./shared/components/grid-item/grid-item.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    TasksComponent,
    EstadoCidadeComponent,
    NotaComponent,
    ProdutosComponent,
    ContribuinteComponent,
    FirstKeysToConsolePipe,
    GridItemComponent
  ],
  imports: [
    BrowserModule,
    SideNavOuterToolbarModule,
    SideNavInnerToolbarModule,
    SingleCardModule,
    FooterModule,
    HttpClientModule,
    LoginFormModule,
    UnauthenticatedContentModule,
    AppRoutingModule,
    DxSelectBoxModule,
    DxDataGridModule,
    DxFormModule,
    DxButtonModule,
    DxTextBoxModule,
    DxTextAreaModule
  ],
  providers: [
    AuthService,
    ScreenService,
    AppInfoService,
    HttpClientModule
  ],
  exports: [
    HomeComponent,
    ProfileComponent,
    TasksComponent,
    NotaComponent,
    ProdutosComponent,
    ContribuinteComponent,
    FirstKeysToConsolePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
