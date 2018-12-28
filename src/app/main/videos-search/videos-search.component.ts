import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { YoutubeApiService } from '../../shared/services/youtube-api.service';
import { NotificationService } from '../../shared/services/notification.service';

@Component({
  selector: 'videos-search',
  templateUrl: 'videos-search.component.html',
  styleUrls: ['videos-search.component.scss']
})

export class VideosSearchComponent {
  @Output() videosUpdated = new EventEmitter();
  @Input() loadingInProgress;

  private last_search: string;

  public searchForm = this.fb.group({
    query: ['', Validators.required]
  });

  constructor(
    public fb: FormBuilder,
    private youtubeService: YoutubeApiService,
    private notificationService: NotificationService
  ) {
    this.youtubeService.searchVideos('')
      .then(data => {
        this.videosUpdated.emit(data);
      });
  }

 public doSearch(event): void {
    if (this.loadingInProgress ||
      (this.searchForm.value.query.trim().length === 0) ||
      (this.last_search && this.last_search === this.searchForm.value.query)) {
      return;
    }

    this.videosUpdated.emit([]);
    this.last_search = this.searchForm.value.query;

    this.youtubeService.searchVideos(this.last_search)
      .then(data => {
        if (data.length < 1) {
          this.notificationService.showNotification('No matches found.');
        }
        this.videosUpdated.emit(data);
      })
  }
}
