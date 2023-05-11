import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tile } from '../tiles/tile';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TilesImagesService {
  readonly api: string = 'http://localhost:3000';
  selectedTiles: Tile[] = [];

  constructor(private http: HttpClient) {}

  getImages(): Observable<Tile[]> {
    return this.http.get<Tile[]>(`${this.api}/images`);
  }

  // ??
  getCategory(): Observable<string> {
    return this.http.get<string>(`${this.api}/category`);
  }

  checkSelected(): Observable<any> {
    return this.http.post(`${this.api}/verification`, this.selectedTiles);
  }
}
