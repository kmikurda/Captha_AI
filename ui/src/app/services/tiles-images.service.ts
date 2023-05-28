import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TilesImagesService {
  readonly api: string = 'https://localhost:27527';
  selectedTiles: any[] = [];

  constructor(private http: HttpClient) {}

  getImages(): Observable<any> {
    return this.http.get(`${this.api}/images`, { responseType: 'text' });
  }

  getCategory(): Observable<any> {
    return this.http.get(`${this.api}/category`, { responseType: 'text' });
  }

  checkSelected(): Observable<any> {
    const results = {
      imageNames: this.selectedTiles.map((tile) =>
        tile.split('/')[2].slice(0, -4)
      ),
    };
    return this.http.post(`${this.api}/check`, results, {
      responseType: 'text',
    });
  }
}
