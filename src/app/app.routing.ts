import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { CalendarComponent } from '@app/calendar/calendar.component';
import { ForgotpasswordComponent } from '@app/forgotpassword/forgotpassword.component';
import { ForgotusernameComponent } from '@app/forgotusername/forgotusername.component';
import { AuthGuard } from './_guards';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'calendar', component: CalendarComponent, canActivate: [AuthGuard] },
    {
        path: 'forgotpassword', component: ForgotpasswordComponent,
        data: { callType: 'password', title: 'Forgot Password' }
    },
    {
        path: 'forgotusername', component: ForgotusernameComponent
    },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);