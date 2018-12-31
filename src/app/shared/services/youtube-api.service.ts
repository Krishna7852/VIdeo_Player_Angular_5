import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { YOUTUBE_API_KEY } from '../constants';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class YoutubeApiService {
  base_url = 'https://www.googleapis.com/youtube/v3/';
  max_results = 50;

  constructor(private http: HttpClient) { }

  public searchVideos(query: string): Observable<any> {
    const url = `${this.base_url}search?q=${query}&maxResults=${this.max_results}&type=video&part=snippet,id&key=${YOUTUBE_API_KEY}&videoEmbeddable=true`; // tslint:disable-line
    return this.http.get(url);
  }

  public getVideos(ids: string[]): Observable<any> {
    const url = `${this.base_url}videos?id=${ids.join(',')}&maxResults=${this.max_results}&type=video&part=snippet,contentDetails,statistics&key=${YOUTUBE_API_KEY}`; // tslint:disable-line
    return this.http.get(url);
  }
}
