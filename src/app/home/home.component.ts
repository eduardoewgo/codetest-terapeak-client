import {Component, OnInit} from '@angular/core';
import {Item} from '../core/models';
import {ItemsService} from '../core/services';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public $items: Observable<Item[]> = new Observable<Item[]>();
  public fields = ['image', 'name', 'price'];
  public columns = ['Image', 'Name', 'Price'];

  constructor(private itemsService: ItemsService) {
  }

  ngOnInit(): void {
    this.$items = this.itemsService.find();
  }

}
