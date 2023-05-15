import { Component, OnInit } from '@angular/core';
import { Tile } from './tile';
import { TilesImagesService } from '../services/tiles-images.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tiles',
  templateUrl: './tiles.component.html',
  styleUrls: ['./tiles.component.scss'],
})
export class TilesComponent implements OnInit {
  private subscription: Subscription = new Subscription();
  // mocked images
  tiles: Tile[] = [
    {
      id: 'tile1',
      srcPath: '../../assets/images/cat_0168.jpg',
      category: 'cat',
    },
    {
      id: 'tile2',
      srcPath: '../../assets/images/person_0656.jpg',
      category: 'person',
    },
    {
      id: 'tile3',
      srcPath: '../../assets/images/car_0517.jpg',
      category: 'car',
    },
    {
      id: 'tile1',
      srcPath: '../../assets/images/cat_0168.jpg',
      category: 'cat',
    },
    {
      id: 'tile2',
      srcPath: '../../assets/images/person_0656.jpg',
      category: 'person',
    },
    {
      id: 'tile3',
      srcPath: '../../assets/images/car_0517.jpg',
      category: 'car',
    },
    {
      id: 'tile1',
      srcPath: '../../assets/images/cat_0168.jpg',
      category: 'cat',
    },
    {
      id: 'tile2',
      srcPath: '../../assets/images/person_0656.jpg',
      category: 'person',
    },
    {
      id: 'tile3',
      srcPath: '../../assets/images/car_0517.jpg',
      category: 'car',
    },
  ];

  selectedIds: number[] = [1];

  constructor(private tilesImagesService: TilesImagesService) {}

  ngOnInit(): void {
    this.subscription.add(
      this.tilesImagesService.getImages().subscribe((images) => {
        this.tiles = images;
      })
    );
  }

  toggleImageSelection(image: any): void {
    const index = this.tilesImagesService.selectedTiles.findIndex(
      (selectedImage) => selectedImage.id === image.id
    );
    if (index === -1) {
      this.tilesImagesService.selectedTiles.push(image);
    } else {
      this.tilesImagesService.selectedTiles.splice(index, 1);
    }
  }
}
