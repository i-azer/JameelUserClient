import { Component, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { User } from './models/user.model';
import { Store } from '@ngrx/store';
import { State } from './models/state.model';
import { NgForm } from '@angular/forms';
import { AddUser } from './actions/user.action';
import { ToastrService } from 'ngx-toastr';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { JameelServiceProxy } from './services/jameel.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  users$!: Observable<Array<User>>;
  destroy$!: Subject<boolean>;

  datePickerConfig = {
    format: 'YYYY-MM-DD'
  }
  constructor(private store: Store<State>,private toastr: ToastrService, private jameelServiceProxy: JameelServiceProxy) {}
  selectedDate: string = ''
  newUserId: string = crypto.randomUUID();
  private hubConnectionBuilder!: HubConnection;

  ngOnInit(): void {
    this.users$ = this.store.select((store) => store.users);
    this.destroy$ = new Subject<boolean>();
    
    this.hubConnectionBuilder = new HubConnectionBuilder()
      .withUrl('http://localhost:5256/JameelUserHubBroadcaster')
      .configureLogging(LogLevel.Trace)
      .build();

      this.hubConnectionBuilder.on('JameelUserHubBroadcaster', (result:User[]) => {
        result.forEach(element => {
          this.store.dispatch(AddUser({user: element}));
        });
      });

      this.hubConnectionBuilder.on('BroadcastingNewUser', (result:any) => {
        console.log(result);
        this.store.dispatch(AddUser({user: result}));
        
      });


    this.hubConnectionBuilder
      .start()
      .then(() => console.log('Connection started.......!'))
      .catch(err => console.log('Error while connect with server'));
  }

  addNewUser(form: NgForm) {
    this.store.dispatch(AddUser({user: form.value}));
    this.toastr.success('Success !! ...', 'Record Saved');
    console.log(form.value);
    this.jameelServiceProxy.addUser(form.value).pipe(takeUntil(this.destroy$)).subscribe(data => {
     this.hubConnectionBuilder.invoke("OnBroadcastingNewUser",data);

    });
    form.reset();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
