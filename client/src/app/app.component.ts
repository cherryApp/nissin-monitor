import { Component, OnInit } from '@angular/core';
import { LineService } from './service/line.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'client';

  tableData: BehaviorSubject<any> = this.lineService.serverData;

  cols: {title: string, key: string}[] = [
    {title: 'id', key: 'id'},
    {title: 'name', key: 'name'},
    {title: 'itemNo', key: 'itemNo'},
    {title: 'quantity', key: 'quantity'},
  ];

  data: any[] = [];

  constructor(
    private lineService: LineService,
  ) {


  }

  ngOnInit() {
    this.lineService.isConnected.subscribe(
      ev => {
        this.lineService.exampleSocket.send(
          JSON.stringify({ type: 'read', path: 'line' })
        );
      }
    );
  }

  onUpdate(row: any): void {
    this.lineService.update(row.id, row);
  }

  onDelete(row: any): void {

  }

}
