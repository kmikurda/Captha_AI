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

  selectedIds: number[] = [1];
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
        this.tiles = images;
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
