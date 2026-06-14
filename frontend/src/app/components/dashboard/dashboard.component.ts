import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatChipsModule } from '@angular/material/chips';
import { TaskService } from '../../services/task.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatIconModule,
    MatToolbarModule,
    MatChipsModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  tasks: any[] = [];
  showForm = false;
  editingTask: any = null;

  newTask = {
    title: '',
    description: '',
    priority: 'medium',
    due_date: ''
  };

  constructor(private taskService: TaskService, private auth: AuthService, private router: Router) {}

  async ngOnInit() {
    await this.loadTasks();
  }

  async loadTasks() {
    try {
      this.tasks = await this.taskService.getTasks();
    } catch (err) {
      this.router.navigate(['/login']);
    }
  }

  async createTask() {
    if (!this.newTask.title) return;
    try {
      await this.taskService.createTask(this.newTask);
      this.newTask = { title: '', description: '', priority: 'medium', due_date: '' };
      this.showForm = false;
      await this.loadTasks();
    } catch (err) {
      console.error(err);
    }
  }

  async toggleComplete(task: any) {
    try {
      await this.taskService.updateTask(task.id, { completed: !task.completed });
      await this.loadTasks();
    } catch (err) {
      console.error(err);
    }
  }

  async deleteTask(id: number) {
    try {
      await this.taskService.deleteTask(id);
      await this.loadTasks();
    } catch (err) {
      console.error(err);
    }
  }

  startEdit(task: any) {
    this.editingTask = { ...task };
  }

  async saveEdit() {
    try {
      await this.taskService.updateTask(this.editingTask.id, this.editingTask);
      this.editingTask = null;
      await this.loadTasks();
    } catch (err) {
      console.error(err);
    }
  }

  cancelEdit() {
    this.editingTask = null;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  getPriorityColor(priority: string) {
    if (priority === 'high') return 'warn';
    if (priority === 'medium') return 'accent';
    return 'primary';
  }
}