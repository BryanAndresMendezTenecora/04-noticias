import { Component, OnInit, ViewChild } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { Article } from '../../interfaces/index';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  public articles:Article[]=[]; 

  @ViewChild(IonInfiniteScroll, {static:true}) infiniteScroll:IonInfiniteScroll

  constructor(private newsService:NewsService) {}

  ngOnInit(): void {
    

    this.newsService.getTopHeadlines()
      .subscribe(articles => {
        console.log(articles);
        this.articles.push(...articles);
      })
    

  }

  loadData(){
    this.newsService.getTopHeadlinesByCategory('business')
      .subscribe(articles =>{
        if(articles.length === this.articles.length){
            // event.target.disabled=true;
            this.infiniteScroll.disabled=true
            return;
        }
        this.articles=articles;
          // event.target.complete();
          this.infiniteScroll.complete(); 
      })

  }

}



