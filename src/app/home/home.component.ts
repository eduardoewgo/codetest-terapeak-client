import {Component, OnInit} from '@angular/core';
import {Conditions, Item, ItemFilter} from '../core/models';
import {ItemsService} from '../core/services';
import {FormBuilder, FormGroup, FormArray, FormControl} from '@angular/forms';
import {ActivatedRoute, NavigationExtras, Params, Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public items: Item[] = [];
  public fields = [
    {type: 'image', value: 'image'},
    {type: 'string', value: 'name'},
    {type: 'string', value: 'location'},
    {type: 'currency', value: 'price'}
  ];
  public columns = ['Image', 'Name', 'Location', 'Price'];

  public pagination = {offset: 0, limit: 50, reachedEnd: false};
  public itemFilters: ItemFilter;
  public itemFilterForm: FormGroup;
  public cities: string[] = ['Boston', 'New York', 'Toronto'];
  public conditions: { value: string, checked: boolean }[] = Conditions.map(el => ({value: el, checked: false}));

  constructor(private route: ActivatedRoute, private router: Router,
              private itemsService: ItemsService, private formBuilder: FormBuilder) {
    this.route.queryParams.subscribe(params => {

      // Query conditionsParam
      const conditionsParam = params.conditions ? Array.isArray(params.conditions) ? params.conditions : [params.conditions] : [];
      // Setting UI checked values
      this.conditions = this.conditions.map(el => {
        el.checked = (conditionsParam.filter(c => c == el.value).length > 0);
        return el;
      });

      this.itemFilterForm = this.formBuilder.group({
        keyword: params.keyword,
        minPrice: Number(params.minPrice),
        maxPrice: Number(params.maxPrice),
        location: params.location,
        conditions: this.formBuilder.array(conditionsParam)
      });
    });
  }

  ngOnInit(): void {
    this.itemFilters = this.cleanObj({
      ...this.itemFilterForm.value,
      offset: `${this.pagination.offset}`,
      limit: `${this.pagination.limit}`
    }) as ItemFilter;
    this.getItems(this.itemFilters);
  }

  getItems(itemFilter: ItemFilter): void {
    // Validate if it's the end
    if (this.pagination.reachedEnd) {
      return;
    }

    // Request data
    this.itemsService.find(itemFilter).subscribe(data => {
      if (data.length < this.pagination.limit) {
        this.pagination.reachedEnd = true;
        console.log(`Reached end`);
      }
      this.items = [...this.items, ...data];
    });
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

  onDataScroll(e: { start: number, end: number, total: number }): void {
    // Request more data once it gets close to the end
    if (e.end > (e.total - 25)) {
      const itemFilter: ItemFilter = {
        ...this.itemFilters,
        offset: `${e.total}`,
        limit: `${this.pagination.limit}`,
      };
      this.getItems(itemFilter);
    }

    // console.log(`onScroll e`, e);
  }

  onSearchSubmit(): void {
    this.itemFilters = this.cleanObj({
      ...this.itemFilterForm.value,
      offset: `${this.pagination.offset}`,
      limit: `${this.pagination.limit}`
    }) as ItemFilter;

    // Request for filtered items
    this.itemsService.find(this.itemFilters).subscribe(data => {
      this.items = [...data];
    });

    // Update URL
    const navigationExtras: NavigationExtras = {
      queryParams: this.itemFilters
    };
    this.router.navigate([], navigationExtras);
  }

  cleanObj(obj: {}) {
    // This should be in a utils.ts
    // Basic validation
    // tslint:disable-next-line:variable-name
    const _obj = {};
    Object.keys(obj).forEach(prop => {
      if (obj[prop]) {
        // Check if it's a valid string
        if (typeof obj[prop] == 'string' && obj[prop].trim() != '') {
          _obj[prop] = obj[prop];
        }

        // Check if it's a valid number
        if (typeof obj[prop] == 'number' && !isNaN(obj[prop])) {
          _obj[prop] = obj[prop];
        }

        // Check if it's a valid array
        if (Array.isArray(obj[prop]) && obj[prop].length > 0) {
          _obj[prop] = obj[prop];
        }
      }
    });
    return _obj;
  }

}
