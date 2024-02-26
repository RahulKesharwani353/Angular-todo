import { Component, inject } from '@angular/core';
import { TaskTitleComponent } from '../task-title/task-title.component';
import { TaskListComponent } from '../task-list/task-list.component';
import { StateService } from '../../../services/state.service';
import { HttpService } from '../../../services/http.service';

@Component({
  selector: 'app-completed-task',
  standalone: true,
  imports: [TaskTitleComponent, TaskListComponent],
  templateUrl: './completed-task.component.html',
  styleUrl: './completed-task.component.scss'
})
export class CompletedTaskComponent {
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

  getAllTasks() {
    this.httpService.getAllTasks()
    .subscribe((result: any) => {
      this.intialTaskList = this.taskList = result.filter(
        (x:any) => x.completed == true
      );
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
}