import { Component, OnInit, ViewChild } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { Article } from '../../interfaces/index';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  public categories:string[]=['business','entertainment','general' ,'health' ,'science' ,'sports' ,'technology']
  public selectedCategory:string=this.categories[0];
  public articles:Article[]=[];
  
  @ViewChild(IonInfiniteScroll, {static:true}) infiniteScroll:IonInfiniteScroll;

  constructor(private newsService:NewsService) {}
  ngOnInit(): void {
    console.log(this.infiniteScroll);
    this.newsService.getTopHeadlinesByCategory(this.selectedCategory)
      .subscribe( articles => {
        console.log(articles)
        this.articles=[...this.articles,...articles];
      })
  }

  

  segmentChanged(event:Event){

    //console.log(event);
    this.selectedCategory=(event as CustomEvent).detail.value;
    //console.log(event.detail.value);
    this.newsService.getTopHeadlinesByCategory(this.selectedCategory)
      .subscribe( articles => {
        console.log(articles)
        this.articles=[...articles];
      })
  }

  loadData(){
    // console.log(event);
    this.newsService.getTopHeadlinesByCategory(this.selectedCategory)
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
