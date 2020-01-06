import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule, TabsModule } from 'ngx-bootstrap';
import { JwtModule } from '@auth0/angular-jwt';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { ErrorInterceptorProvider } from './helpers';
import { MemberDetailResolver, MemberListResolver, MemberEditResolver } from './resolver';
import { NgxGalleryModule } from 'ngx-gallery';
import { PreventUnsavedChanges } from './guards';

import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { ListsComponent } from './components/lists/lists.component';
import { MessagesComponent } from './components/messages/messages.component';
import { MemberListComponent, MemberCardComponent, MemberDetailComponent, MemberEditComponent } from './components/members';

export function tokenGetter() {
  return localStorage.getItem('token');
}

export class CustomHammerConfig extends HammerGestureConfig {
  overrides = {
    pinch: { enable: false },
    rotate: { enable: false }
  };
}

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    ListsComponent,
    MessagesComponent,
    MemberCardComponent,
    MemberDetailComponent,
    MemberEditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    NgxGalleryModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['localhost:5000', '5000-f7593444-8386-473b-ba63-f31f8a56b9af.ws-us02.gitpod.io'],
        blacklistedRoutes: ['localhost:5000/api/auth', '5000-f7593444-8386-473b-ba63-f31f8a56b9af.ws-us02.gitpod.io/api/auth']
      }
    })
  ],
  providers: [
    ErrorInterceptorProvider,
    PreventUnsavedChanges,
    MemberDetailResolver,
    MemberListResolver,
    MemberEditResolver,
    { provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
