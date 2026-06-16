import { Injectable } from '@angular/core';
import axios from 'axios';

const API = 'https://task-manager-ten-kappa-10.vercel.app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  async register(username: string, email: string, password: string) {
    const response = await axios.post(`${API}/users/register`, {
      username,
      email,
      password
    });
    return response.data;
  }

  async login(username: string, password: string) {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    const response = await axios.post(`${API}/users/login`, formData);
    const token = response.data.access_token;
    localStorage.setItem('token', token);
    return response.data;
  }

  logout() {
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }
}