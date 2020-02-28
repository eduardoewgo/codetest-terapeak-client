import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit, AfterViewInit {

  @ViewChild(CdkVirtualScrollViewport) virtualScroll: CdkVirtualScrollViewport;
  @Input() data: any[] = [];
  @Input() fields: string[] = [];
  @Input() columns: string[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.virtualScroll.renderedRangeStream
      .subscribe(event => {
        // TODO: handle this properly.
        console.log(`event: `, event);
        console.log('scrolled');
      });
  }

  trackByFn(idx) {
    return idx;
  }

}
