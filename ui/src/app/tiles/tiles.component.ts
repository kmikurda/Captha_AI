import { Component, OnDestroy, OnInit } from '@angular/core';
import { TilesImagesService } from '../services/tiles-images.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tiles',
  templateUrl: './tiles.component.html',
  styleUrls: ['./tiles.component.scss'],
})
export class TilesComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  tiles: any[] = [];

  category!: string;

  constructor(private tilesImagesService: TilesImagesService) {}

  ngOnInit(): void {
    this.subscription.add(
      this.tilesImagesService.getImages().subscribe((images: any) => {
        images = JSON.parse(images).map((path: string) => {
          const parts = path.split('\\');
          const index = parts.indexOf('natural_images');
          if (index !== -1) {
            const result =
              parts.slice(index).join('\\').replace(/\\/g, '/') + '.jpg';
            return result;
          }
        });
        this.tiles = this.shuffle(images);
      })
    );
    this.subscription.add(
      this.tilesImagesService
        .getCategory()
        .subscribe((category) => (this.category = category))
    );
  }

  toggleImageSelection(image: any): void {
    const index = this.tilesImagesService.selectedTiles.findIndex(
      (selectedImage) => selectedImage === image
    );
    if (index === -1) {
      this.tilesImagesService.selectedTiles.push(image);
    } else {
      this.tilesImagesService.selectedTiles.splice(index, 1);
    }
  }

  shuffle(array: any[]): any[] {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
