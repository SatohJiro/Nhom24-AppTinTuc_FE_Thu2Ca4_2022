import {Component, Inject, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {ServerService} from "../../services/server.service";
import {fromEvent, throttleTime} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit,OnChanges {
  enableSticky:boolean = false;
  topics:any[] = [];
  @Input() isMenuTop = true;
  public datas = [
    {title:'',path:"",desc:""},
    {title: "Trong nước", path:"news",desc:"lorem"},
    {title: "Quốc tế", path:"news-international",desc:"lorem"},
  ];
  // @ts-ignore
  constructor(@Inject(DOCUMENT) document: Document, private serverService: ServerService) {
  }
  ngOnInit(): void {
   this.topics = this.serverService.getTopics();

    fromEvent(window,"scroll").pipe(throttleTime(150)).subscribe((event)=> {
      // @ts-ignore
      const header = document.querySelector(".header__menu");
      // @ts-ignore
      header.classList.toggle("enable-sticky",window.scrollY > document.querySelector(".header__content").clientHeight);
    })
  }
  ngOnChanges(changes: SimpleChanges) {

  }

}
