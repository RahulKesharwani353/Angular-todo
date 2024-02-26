import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../../services/http.service';
import { TaskListComponent } from '../task-list/task-list.component';
import { StateService } from '../../../services/state.service';
import { TaskTitleComponent } from '../task-title/task-title.component';

@Component({
  selector: 'app-all-task',
  standalone: true,
  imports: [FormsModule, TaskListComponent, TaskTitleComponent],
  templateUrl: './all-task.component.html',
  styleUrl: './all-task.component.scss'
})

export class AllTaskComponent {
  newTask = '';
  intialTaskList: any[] = [];
  taskList: any[] = [];
  httpService = inject(HttpService);
  stateService = inject(StateService);

  ngOnInit() {
    this.stateService.searchSubject.subscribe((value) => {
      console.log("search",value)
      if (value) {
        this.taskList = this.intialTaskList.filter((x) =>
          x.title.toLowerCase().includes(value.toLowerCase())
        );
      }else{
        this.taskList=this.intialTaskList;
      }
    });
    this.getAllTasks();
  }

  addTask() {
    console.log('addTask', this.newTask);
    this.httpService.addTask(this.newTask).subscribe(() => {
      this.newTask = '';
      this.getAllTasks();
    });
  }

  getAllTasks() {
    this.httpService.getAllTasks().subscribe((result: any) => {
      this.intialTaskList = this.taskList = result;
    });
  }

  onComplete(task: any) {
    task.completed = !task.completed;
    console.log('complete', task);
    this.httpService.updateTask(task).subscribe(() => {
      this.getAllTasks();
    });
  }

  onImportant(task: any) {
    task.important = !task.important;
    this.httpService.updateTask(task).subscribe(() => {
      this.getAllTasks();
    });
  }

  onDelete(task: any){
    this.httpService.deleteTask(task).subscribe(() => {
      this.getAllTasks();
    });
  }
}