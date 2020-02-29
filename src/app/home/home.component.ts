import {Component, OnInit} from '@angular/core';
import {Conditions, Item} from '../core/models';
import {ItemsService} from '../core/services';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup, FormArray, FormControl} from '@angular/forms';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';

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

  public filterForm: FormGroup;
  public cities: string[] = ['Boston', 'New York', 'Toronto'];
  public conditions: string[] = Conditions;

  constructor(private route: ActivatedRoute, private router: Router,
              private itemsService: ItemsService, private formBuilder: FormBuilder) {
    this.route.queryParams.subscribe(params => {
      this.filterForm = this.formBuilder.group({
        keyword: params.keyword || '',
        minPrice: params.minPrice || '',
        maxPrice: params.maxPrice || '',
        location: params.location || '',
        conditionsCheckbox: this.formBuilder.array(params.conditionsCheckbox || [])
      });
    });
  }

  ngOnInit(): void {
    this.$items = this.itemsService.find();
  }

  onConditionCheckBoxChange(e: any) {
    const checkArray: FormArray = this.filterForm.get('conditionsCheckbox') as FormArray;
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

  onSearchSubmit(): void {
    const navigationExtras: NavigationExtras = {
      queryParams: {...this.filterForm.value}
    };
    this.router.navigate([], navigationExtras);
  }

}
