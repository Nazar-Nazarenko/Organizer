import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateService } from '../infrastructure/date.service';
import { TaskApiService } from '../task-api.service';
import { TaskModel } from '../models/task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit, AfterViewInit {

  constructor(private formBuilder: FormBuilder,
              private taskService: TaskApiService,
              private dateService: DateService) { }

  public form = this.getInitForm();
  public isDisabled = true;
  private minCharsCount = 3;
  private entered: string;
  public date = this.dateService.date;

  private getControlValue(): void {
    this.form.get('title').valueChanges.pipe().subscribe( (value) => {
       this.entered = value;
       if (this.entered.length >= this.minCharsCount) {
         this.isDisabled = false;
       }
       if (this.entered.length < this.minCharsCount) {
        this.isDisabled = true;
      }
    });
  }

  ngOnInit(): void {

  }
   private getInitForm(): FormGroup {
    return this.formBuilder.group({
      title: new FormControl('', Validators.required )
    });
   }


  public submit(): void {
    const title = this.form.value.title;
    console.log('title', title);

    const task: TaskModel = {
      title,
      date: this.dateService.date.value.format('DD-MM-YYYY')
    };

    this.taskService.createTask(task).subscribe( task => {
      console.log(task);
      this.form.reset();
      },
        error => console.error(error));
  }


  ngAfterViewInit(): void {
    this.getControlValue();
  }


}
