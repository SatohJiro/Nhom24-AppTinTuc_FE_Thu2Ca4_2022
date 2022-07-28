import { Component, OnInit, Input } from '@angular/core';
import {ServerService} from "../../services/server.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  data:string[] = [];
  constructor(private serverService: ServerService) { }

  ngOnInit(): void {
    this.data = this.serverService.getData('tin-moi-nhat.rss');
  }
}
