import { Injectable } from '@angular/core';
import axios from 'axios';
import { AuthService } from './auth.service';

const API = 'https://task-manager-ten-kappa-10.vercel.app';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private auth: AuthService) {}

  private getHeaders() {
    return {
      Authorization: `Bearer ${this.auth.getToken()}`
    };
  }

  async getTasks() {
    const response = await axios.get(`${API}/tasks/`, {
      headers: this.getHeaders()
    });
    return response.data;
  }

  async createTask(task: any) {
    const response = await axios.post(`${API}/tasks/`, task, {
      headers: this.getHeaders()
    });
    return response.data;
  }

  async updateTask(id: number, task: any) {
    const response = await axios.put(`${API}/tasks/${id}`, task, {
      headers: this.getHeaders()
    });
    return response.data;
  }

  async deleteTask(id: number) {
    const response = await axios.delete(`${API}/tasks/${id}`, {
      headers: this.getHeaders()
    });
    return response.data;
  }
}