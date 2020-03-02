import {Component, OnInit} from '@angular/core';
import {Conditions, Item, ItemFilter} from '../core/models';
import {ItemsService} from '../core/services';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup, FormArray, FormControl} from '@angular/forms';
import {ActivatedRoute, NavigationExtras, Params, Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public $items: Observable<Item[]> = new Observable<Item[]>();
  public fields = [
    {type: 'image', value: 'image'},
    {type: 'string', value: 'name'},
    {type: 'string', value: 'location'},
    {type: 'currency', value: 'price'}
  ];
  public columns = ['Image', 'Name', 'Location', 'Price'];

  public itemFilters: ItemFilter;
  public itemFilterForm: FormGroup;
  public cities: string[] = ['Boston', 'New York', 'Toronto'];
  public conditions: string[] = Conditions;

  constructor(private route: ActivatedRoute, private router: Router,
              private itemsService: ItemsService, private formBuilder: FormBuilder) {
    this.route.queryParams.subscribe(params => {
      this.itemFilterForm = this.formBuilder.group({
        keyword: params.keyword,
        minPrice: Number(params.minPrice),
        maxPrice: Number(params.maxPrice),
        location: params.location,
        conditions: this.formBuilder.array(params.conditions || [])
      });
    });
  }

  ngOnInit(): void {
    this.itemFilters = this.cleanObj({...this.itemFilterForm.value}) as ItemFilter;
    this.getItems(this.itemFilters);
  }

  getItems(itemFilter: ItemFilter): void {
    this.$items = this.itemsService.find(itemFilter);
  }

  onConditionCheckBoxChange(e: any): void {
    const checkArray: FormArray = this.itemFilterForm.get('conditions') as FormArray;
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  onDataScroll(e: { start: number, end: number }): void {
    const itemFilter: ItemFilter = {
      offset: (e.end).toString(),
      limit: (e.end - e.start).toString(),
      ...this.itemFilters
    };
    console.log(`onScroll`, itemFilter);
  }

  onSearchSubmit(): void {
    this.itemFilters = this.cleanObj({...this.itemFilterForm.value}) as ItemFilter;

    // Request for filtered items
    this.$items = this.itemsService.find(this.itemFilters);

    // Update URL
    const navigationExtras: NavigationExtras = {
      queryParams: this.itemFilters
    };
    this.router.navigate([], navigationExtras);
  }

  cleanObj(obj: {}) {
    // This should be in a utils.ts
    // Basic validation
    let _obj = {};
    Object.keys(obj).forEach(prop => {
      if (obj[prop]) {
        // Check if it's a valid string
        if (typeof obj[prop] == 'string' && obj[prop].trim() != '')
          _obj[prop] = obj[prop];

        // Check if it's a valid number
        if (typeof obj[prop] == 'number' && !isNaN(obj[prop]))
          _obj[prop] = obj[prop];

        // Check if it's a valid array
        if (Array.isArray(obj[prop]) && obj[prop].length > 0)
          _obj[prop] = obj[prop];
      }
    });
    return _obj;
  }

}
