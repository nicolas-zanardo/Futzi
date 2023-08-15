import {Component, OnInit} from '@angular/core';
import {TeamService} from "../../services/team/team.service";
import {BehaviorSubject, tap} from "rxjs";
import {Team} from "../../interface/team.interface";
import {User} from "../../interface/user.interface";
import {Meta} from "@angular/platform-browser";
import {environment} from "../../../../environments/environement.dev";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public team: BehaviorSubject<Team|null> = this.teamService.currentTeam$;
  public contact: BehaviorSubject<User|null> = this.teamService.contact$;


  constructor(
    private teamService: TeamService,
    private metaService: Meta
    ) {
  }


  ngOnInit() {
    this.teamService.getTeam().subscribe();
    // FACEBOOK AND COMMON
    this.metaService.addTags([
      { name: 'url', property:'og:url',content: environment.domainName},
      { name: 'type', property:'og:type',content: "website"},
      { name: 'title', property:'og:title',content: environment.teamName},
      { name: 'description', property:'og:description',content: "Club de football familial et convivial. Permettre aux enfants, aux jeunes et aux plus anciens de s'amuser" },
      { name: 'image', property:'og:image', content: `${environment.imagesPUBLIC}/LOGO_OSNY.png`}
    ]);
    // TWITTER
    this.metaService.addTags([
      { name: "twitter:card", content: "Club de football familial et convivial. Permettre aux enfants, aux jeunes et aux plus anciens de s'amuser"  },
      { name: "twitter:site", content: environment.twitterXShareAccount }
    ]);
  }

  public fbShare() {
    this.popupCenter(`https://www.facebook.com/sharer/sharer.php?u=${environment.domainName}`, this.team.value!.name_team.toString() );
  }

  public twitXShare() {
    this.popupCenter(`https://twitter.com/intent/tweet?text=${this.team.value!.name_team.toString()}&via=${this.team.value!.name_team.toString()}"&url="${environment.domainName}`, this.team.value!.name_team.toString());
  }

  public linkedinShare() {
    this.popupCenter(`https://www.linkedin.com/shareArticle?url=${environment.domainName}`, this.team.value!.name_team.toString() );
  }

  public mastodonShare() {
    this.popupCenter(`https://mastodon.social/share?url=${environment.domainName}`, this.team.value!.name_team.toString() );
  }


  private popupCenter(url:string, title:string, w:number = 800, h:number = 500) {

    const dualScreenLeft: number = window.screenLeft !==  undefined ? window.screenLeft : window.screenX;
    const dualScreenTop: number = window.screenTop !==  undefined   ? window.screenTop  : window.screenY;

    const width: number = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    const height: number = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    const systemZoom: number = width / window.screen.availWidth;
    const left: number = (width - w) / 2 / systemZoom + dualScreenLeft
    const top: number = (height - h) / 2 / systemZoom + dualScreenTop

    window.open(url, title,
      `
      scrollbars=yes,
      toolbar=no,
      width=${w / systemZoom},
      height=${h / systemZoom},
      top=${top},
      left=${left}
      `
    );
  }
}
