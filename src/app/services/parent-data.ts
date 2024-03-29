import {DetailData} from "./detail-data";


import {Injectable} from '@angular/core';

@Injectable()
export class ParentData {
  data: any[] = [];


  constructor() {
    setInterval(() => {
      this.clearCache();
    }, 3600000);
  }

  clearCache() {
    this.data = [];

  }

  addCommentByUrl(url: string, comment: {}) {
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].url === url) {
        this.data[i].comments.push(comment);
      }
    }
  }

  addLoveToCommentById(url: string, idComment: string, love: boolean) {
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].url === url) {
        for (let j = 0; j < this.data[i].comments.length; j++) {
          if (this.data[i].comments[j].idComment === idComment) {
            if (love) {
              this.data[i].comments[j].love += 1;
            } else {
              if (this.data[i].comments[j].love > 0)
                this.data[i].comments[j].love -= 1;
            }
            return;
          }
        }
      }
    }
  }

  loadDataDetailPage(url: string): DetailData {
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].url === url) {
        return this.data[i];
      }
    }
    const newPage: DetailData = new DetailData(url);
    this.data.push(newPage);
    return newPage;
  }

  checkExitsURL(url: string): boolean {
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].url === url) {
        return true;
      }
    }
    return false;
  }
}
