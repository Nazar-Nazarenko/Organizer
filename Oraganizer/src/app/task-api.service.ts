import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TaskModel } from './models/task.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskApiService {
  public taskUrl = 'https://console.firebase.google.com/project/organizer-a3317/database/organizer-a3317-default-rtdb/data/~2F';

  constructor( private http: HttpClient) { }

  public createTask(task: TaskModel): Observable<TaskModel> {
    return  this.http.post<TaskModel>(`${this.taskUrl}/${task.date}.json`, task)
    .pipe(
      // tslint:disable-next-line:no-shadowed-variable
      map((task) => {
        console.log('task->', task);
        return task;
      })
    );
  }
}
