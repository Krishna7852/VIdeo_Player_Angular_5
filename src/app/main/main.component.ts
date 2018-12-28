import { Component } from '@angular/core';

@Component({
  selector: 'main-block',
  templateUrl: 'main.component.html',
  styleUrls: ['main.component.scss']
})

export class MainComponent {
  public videoList: any[] = [];


 public handleSearchVideo(videos: Array<any>): void {
    this.videoList = videos;
  }
}
