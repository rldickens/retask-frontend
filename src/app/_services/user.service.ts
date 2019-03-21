import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { User } from '@app/_models';
import {ReTaskService} from '@app/_services/retask.service';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient, private reTaskService: ReTaskService) { }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    getById(id: number) {
        return this.http.get(`${environment.apiUrl}/users/${id}`);
    }

    // register the user
    register(user: User) {
        let tempUser = new User
        return new Promise(resolve => {
            this.reTaskService.registerUser(user)
                .subscribe(user => {         
                    tempUser.errorMessage = user.errorMessage;
                    resolve(tempUser);
                 },
                err => {
                    tempUser.errorMessage = err.status+" "+err.message;
                    resolve(tempUser);
                }, () => {
                    tempUser.errorMessage = "";
                    resolve(tempUser);
                });
        });
        
    }

    update(user: User) {
        return this.http.put(`${environment.apiUrl}/users/${user.id}`, user);
    }

    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/users/${id}`);
    }
}