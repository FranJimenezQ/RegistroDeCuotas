import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { Login } from './components/login/login';
import { MonthDetail } from './components/month-detail/month-detail';

export const routes: Routes = [
    {
        path: '',
        component: Dashboard
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: 'month-details',
        component: MonthDetail
    }    
];
