import { Component, Input, Output, EventEmitter } from '@angular/core';
import { YoutubePlayerService } from '../../shared/services/youtube-player.service';

@Component({
  selector: 'videos-list',
  templateUrl: 'videos-list.component.html',
  styleUrls: ['videos-list.component.scss']
})

export class VideosListComponent {
  @Input() videoList;
  @Input() loadingInProgress;
  @Output() videoPlaylist = new EventEmitter();

  constructor(
    private youtubePlayer: YoutubePlayerService
  ) { }

  public onPlay(video: any): void {
    this.youtubePlayer.playVideo(video.id, video.snippet.title);
    this.addToPlaylist(video);
  }

  private addToPlaylist(video: any): void {
    // TODO: Awesome playList Will come soon
    this.videoPlaylist.emit(video);
  }
}
