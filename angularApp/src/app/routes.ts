import { Routes } from '@angular/router';
import { AuthGuard, PreventUnsavedChanges } from './guards';
import { MemberListResolver, MemberDetailResolver, MemberEditResolver } from './resolver';
import { HomeComponent } from './components/home/home.component';
import { ListsComponent } from './components/lists/lists.component';
import { MessagesComponent } from './components/messages/messages.component';
import { MemberListComponent, MemberDetailComponent, MemberEditComponent } from './components/members';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'members', component: MemberListComponent, resolve: {users: MemberListResolver} },
      { path: 'members/:id', component: MemberDetailComponent, resolve: {user: MemberDetailResolver} },
      { path: 'member/edit', component: MemberEditComponent, resolve: {user: MemberEditResolver},
        canDeactivate: [PreventUnsavedChanges]},
      { path: 'messages', component: MessagesComponent },
      { path: 'lists', component: ListsComponent },
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
