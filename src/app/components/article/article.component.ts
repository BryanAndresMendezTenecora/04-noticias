import { Component, Input, OnInit } from '@angular/core';
import { Article, Source } from '../../interfaces/index';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { browser } from 'protractor';
import { ActionSheetButton, ActionSheetController, Platform } from '@ionic/angular';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent  {


  @Input() article:Article;
  @Input() indice:number;
  constructor(private iab:InAppBrowser,
              private platform:Platform,
              private actionSheetCtrl:ActionSheetController,
              private socialSharing: SocialSharing,
              private storageService:StorageService) { }

 

  openArticle(){
    if(this.platform.is('ios') || this.platform.is('android')){
      const browser=this.iab.create(this.article.url)
      browser.show();
      return;
    }
    window.open(this.article.url,'_blank');
  }

   async onOpenMenu(){
    const articleInFavorite=this.storageService.articleInFavorites(this.article);

    const normalBts:ActionSheetButton[]=[
      {
        text:articleInFavorite? 'Remover favorito' : 'Favorito',
        icon:articleInFavorite? 'heart':'heart-outline',
        handler: () => this.onToggleFavorite()
      },{
        text:'Cancelar',
        icon:'close-outline',
        role:'cancel',
      }
    ]
    
    const shareBtn:ActionSheetButton={
      text:'Compartir',
      icon:'share-outline',
      handler: () => this.onShareArticle()
    };

    console.log('Estamos en capacitor:'+this.platform.is('capacitor'));

    if(this.platform.is('capacitor')){
      normalBts.unshift(shareBtn)
      // actionSheet.buttons.unshift(share)
    }

    const actionSheet = await this.actionSheetCtrl.create({
      header:'Opciones',
      buttons: normalBts //[
        // {
        //   text:'Compartir',
        //   icon:'share-outline',
        //   handler: () => this.onShareArticle()
        // },
      //   {
      //     text:'Favorito',
      //     icon:'heart-outline',
      //     handler: () => this.onToggleFavorite()
      //   },{
      //     text:'Cancelar',
      //     icon:'close-outline',
      //     role:'cancel',
      //   }
      // ]
    });

   

   

    await actionSheet.present();

  }

  onShareArticle(){
    // console.log('share article');

    const {title, source, url}=this.article;
    this.socialSharing.share(
      this.article.title,
      this.article.source.name,
      null,
      this.article.url
    )
    console.log('Algo');
  }

  onToggleFavorite(){
    console.log('toggle favorite');
    this.storageService.saveRemoveArticle(this.article);
  }

}
