import { Component, AfterContentInit } from '@angular/core';
import { YoutubePlayerService } from '../../shared/services/youtube-player.service';

@Component({
  selector: 'video-player',
  templateUrl: 'video-player.component.html',
  styleUrls: ['video-player.component.scss']
})

export class VideoPlayerComponent implements AfterContentInit {

  constructor(private youtubePlayer: YoutubePlayerService) {
  }

  public ngAfterContentInit() {
    const doc = window.document;
    const playerApi = doc.createElement('script');
    playerApi.type = 'text/javascript';
    playerApi.src = 'https://www.youtube.com/iframe_api';
    doc.body.appendChild(playerApi);
    this.youtubePlayer.createPlayer();
  }
}
