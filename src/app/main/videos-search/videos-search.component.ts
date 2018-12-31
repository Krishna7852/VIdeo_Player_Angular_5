import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { YoutubeApiService } from '../../shared/services/youtube-api.service';

@Component({
  selector: 'videos-search',
  templateUrl: 'videos-search.component.html',
  styleUrls: ['videos-search.component.scss']
})

export class VideosSearchComponent implements OnChanges {
  @Output() videosUpdated = new EventEmitter();
  @Input() loadingInProgress;

  private last_search: string;

  public searchForm = this.fb.group({
    query: ['', Validators.required]
  });

  constructor(
    public fb: FormBuilder,
    private youtubeService: YoutubeApiService
  ) {
    this.initializeVideos = this.initializeVideos.bind(this);
    this.toUpdateVideos = this.toUpdateVideos.bind(this);
    this.errorHandler = this.errorHandler.bind(this);
  }


  public ngOnChanges() {
    this.loadVideos();
  }

  public doSearch(): void {
    if (this.loadingInProgress ||
      (!this.searchForm.value.query.trim().length) ||
      (this.last_search && this.last_search === this.searchForm.value.query)) {
      return;
    }
    this.videosUpdated.emit([]);
    this.last_search = this.searchForm.value.query;
    this.loadVideos(this.last_search);
  }

  private loadVideos(query: string = ''): void {
    this.youtubeService.searchVideos(query).subscribe(this.initializeVideos, this.errorHandler);
  }

  private initializeVideos({ items }: any): void {
    const keys = [];
    items.forEach(({ id: { videoId } }) => {
      keys.push(videoId);
    });
    this.youtubeService.getVideos(keys).subscribe(this.toUpdateVideos, this.errorHandler);
  }

  private toUpdateVideos({ items }: any): void {
    this.videosUpdated.emit(items);
  }

  private errorHandler(error: any): void {
    console.error('Error while loading API::-->', error);
  }
}
