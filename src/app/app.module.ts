import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
// Components
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { VideosListComponent } from './main/videos-list/videos-list.component';
import { VideosSearchComponent } from './main/videos-search/videos-search.component';
import { VideoPlayerComponent } from './main/video-player/video-player.component';
// Services
import { YoutubeApiService } from './shared/services/youtube-api.service';
import { YoutubePlayerService } from './shared/services/youtube-player.service';
// Pipes
import { VideoDurationPipe } from './shared/pipes/video-duration.pipe';
import { VideoLikesViewsPipe } from './shared/pipes/video-likes-views.pipe';
import { VideoNamePipe } from './shared/pipes/video-name.pipe';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    MainComponent,

    VideosListComponent,
    VideosSearchComponent,
    VideoPlayerComponent,

    VideoDurationPipe,
    VideoLikesViewsPipe,
    VideoNamePipe
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    YoutubeApiService,
    YoutubePlayerService
  ]
})
export class AppModule {
}
