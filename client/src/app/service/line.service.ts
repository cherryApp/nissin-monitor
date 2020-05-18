import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LineService {

  socketUrl = 'ws://localhost:3210';
  exampleSocket = new WebSocket(this.socketUrl);
  isConnected: Subject<any> = new Subject();
  serverData: BehaviorSubject<any> = new BehaviorSubject([]);

  constructor() {

    // Listen connection events.
    this.exampleSocket.onopen = (ev) => {
      console.log('Socket opened: ', ev);
      this.isConnected.next(true);
    };

    this.exampleSocket.onmessage = (m) => {
      const message = JSON.parse(m.data);
      this.serverData.next(message.data);
      console.log('Message: ', message);
    };

    this.exampleSocket.onclose = (ev) => {
      console.log('Socket closed: ', ev);
    };

  }


  connect() {

  }

  update(id: number|string, data: any): void {
    this.exampleSocket.send(
      JSON.stringify(
          {
              type: 'update',
              path: 'line',
              id,
              data,
          }
      )
  );
  }


}
