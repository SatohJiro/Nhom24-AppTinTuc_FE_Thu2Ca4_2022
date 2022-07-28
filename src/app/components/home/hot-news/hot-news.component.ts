import { Component, OnInit, Input } from '@angular/core';
import {ServerService} from "../../../services/server.service";

@Component({
  selector: 'app-hot-news',
  templateUrl: './hot-news.component.html',
  styleUrls: ['./hot-news.component.scss']
})
export class HotNewsComponent implements OnInit {
  list:number = 12;
  dateTime:Date = new Date();
  hotNewsTags:any[] =  [];
  hotNewsData: any[] = [];
  @Input() data:any[] = [];

  constructor(private serverService: ServerService) { }

  ngOnInit(): void {
    this.hotNewsTags = this.serverService.getHotNewsTags();
    this.hotNewsData = this.serverService.getHotNewsData();
  }

}
