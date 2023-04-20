import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Article, NewsResponse } from '../interfaces';
import { map } from "rxjs/operators";
import {  storedArticlesByCategory } from "../data/mock-news";
import { ArticlesByCategoryAndPage } from '../interfaces/index';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private apikey=environment.apiKey;

  private articlesByCategoryAndPage:ArticlesByCategoryAndPage=storedArticlesByCategory
  constructor(private http:HttpClient) { }

  getTopHeadlines():Observable<Article[]>{

    return this.getTopHeadlinesByCategory('business');
    /*
    return this.http.get<NewsResponse>(`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${this.apikey}`/* ,{
      params:{
        apiKey:this.apikey
      }
    } *//*).pipe(
        map(({articles }) => articles)
    );*/
  }

  getTopHeadlinesByCategory(category:string):Observable<Article[]>{
    return of(this.articlesByCategoryAndPage[category].articles);

    // return this.http.get<NewsResponse>(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${this.apikey}`/* ,{
    //   params:{
    //     apiKey:this.apikey
    //   }
    // } */).pipe(
    //     map(({articles }) => articles)
    // );
  }





}

