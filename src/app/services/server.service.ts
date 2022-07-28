import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import * as cheerio from "cheerio";

import * as axios from 'axios';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  server = 'https://nld.com.vn';
  option ='tin-moi-nhat.rss';
  corsAnywhere ='https://mycorsproxy01.herokuapp.com';

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }
  //home - hot-news tags
  getHotNewsTags():string[] {
    const ajax = new XMLHttpRequest();
    let tags:any[] = [];
    // ajax.timeout = 3000;
    const url= `${this.corsAnywhere}/${this.server}`;
    const asyns = true;
    const method = "GET";
    ajax.open(method, url, asyns);
    ajax.send();
    // @ts-ignore
    ajax.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const $ = cheerio.load(this.responseText);
        $('.hot-news > .hot-news-item').each((i,tag)=> {
          // @ts-ignore
          tags.push({
            id:i,
            name: $(tag).text(),
            link : $(tag).find('a').attr("href"),
            title: $(tag).find('a').attr("title")
          });
        })
      }
    }
    return tags;
  }
  //home - topics
  getTopics():string[] {
    const ajax = new XMLHttpRequest();
    let topics:any[] = [];
    // ajax.timeout = 3000;
    const url= `${this.corsAnywhere}/${this.server}`;
    const asyns = true;
    const method = "GET";
    ajax.open(method, url, asyns);
    ajax.send();
    // @ts-ignore
    ajax.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const $ = cheerio.load(this.responseText);
        $('.topic > .list-topic > li > a').each((i,topic)=> {
          // @ts-ignore
          topics.push({
            id:i,
            title: $(topic).attr('title'),
            link: $(topic).attr('href'),
          });
        })

      }
    }
    return topics;
  }
  //home - menu
  getMenuData():string[] {
    const ajax = new XMLHttpRequest();
    let menuTitle:any[] = [];
    // ajax.timeout = 3000;
    const url= `${this.corsAnywhere}/${this.server}`;
    const asyns = true;
    const method = "GET";
    ajax.open(method, url, asyns);
    ajax.send();
    // @ts-ignore
    ajax.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const $ = cheerio.load(this.responseText);
        $('#MenuTopPage > .menu-top > li').each((i,title)=> {
          // @ts-ignore
          menuTitle.push({
            id:i,
            title: $(title).text().trim()
          });
        })

      }
    }
    return menuTitle;
  }
//  home - tinnong
  getHotNewsData():string[] {
    const ajax = new XMLHttpRequest();
    let data:any[] = [];
    // ajax.timeout = 3000;
    const url= `${this.corsAnywhere}/${this.server}`;
    const asyns = true;
    const method = "GET";
    ajax.open(method, url, asyns);
    ajax.send();
    // @ts-ignore
    ajax.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const $ = cheerio.load(this.responseText);
        $('#content-newest .news-thumb-title > a').each((i,item)=> {
          // @ts-ignore
          data.push({
            id:i,
            title: $(item).attr('title'),
            link: $(item).attr('href'),
          });
        })
      }
    }
    return data;
  }
//  home - tinmoinhat rss
  getData(option:string):any[] {
    this.option = option;
    let data:any[] = [];
    const ajax = new XMLHttpRequest();
    const url= `${this.corsAnywhere}/${this.server}/${this.option}`;
    const asyns = true;
    const method = "GET";
    ajax.open(method, url, asyns);
    ajax.send();
    // @ts-ignore
    const getImg= (text:string) =>{
      const $ = cheerio.load(text, {xmlMode: true});
      return $('img');
    }
    ajax.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const $ = cheerio.load(this.responseText, {xmlMode: true});
        $('item').each((i,item)=> {
          // @ts-ignore

          data.push({
              id: i,
              title: $(item).find('title').text().trim(),
              link: $(item).find('link').text().trim(),
              guid: $(item).find('guid').text().trim(),
              description: {
                // @ts-ignore
                url: getImg($(item).find('description').text().trim()).attr("src"),
                alt: getImg($(item).find('description').text().trim()).attr("alt"),
                // @ts-ignore
                text:$(item).find('description').text().slice($(item).find('description').text().lastIndexOf(">")+1).trim(),
              },
              pubDate: $(item).find('pubDate').text().trim(),
            }
          );
        })
      }
    }
    return data;
  }

}
