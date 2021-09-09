import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor() { }

  checkUserLogin(loginData) {
    const users = sessionStorage.getItem("users");
    let allUsers = users ? JSON.parse(users) : [];

    const user = allUsers.find(user => (user.username === loginData.username || user.email === loginData.username) && user.password === loginData.password);
    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
      return user;
    } else return null;
  }

  updateUser(userToUpdate): void {
    const users = sessionStorage.getItem("users");
    let allUsers = users ? JSON.parse(users) : [];

    const userInd = allUsers.findIndex(user => user.username === userToUpdate.username || user.id === userToUpdate.id);
    userToUpdate = {...allUsers[userInd], ...userToUpdate};
    allUsers[userInd] = userToUpdate;
    sessionStorage.setItem("users", JSON.stringify(allUsers));
    return userToUpdate;
  }
  
  deleteUser(username: string) {
    const users = sessionStorage.getItem("users");
    let allUsers = users ? JSON.parse(users) : [];

    const userInd = allUsers.findIndex(user => user.username === username);
    allUsers.splice(userInd, 1);
    sessionStorage.setItem("users", JSON.stringify(allUsers));
  }

  getUserWIthUsername(username: string) {
    const users = sessionStorage.getItem("users");
    let allUsers = users ? JSON.parse(users) : [];

    const user = allUsers.find(user => user.username === username);
    return user;
  }

}
