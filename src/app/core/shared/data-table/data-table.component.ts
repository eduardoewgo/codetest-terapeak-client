import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit, AfterViewInit {

  @ViewChild(CdkVirtualScrollViewport) virtualScroll: CdkVirtualScrollViewport;
  @Input() data: any[] = [];
  @Input() fields: { type: string, value: any }[] = [];
  @Input() columns: string[] = [];
  @Output() scroll = new EventEmitter<{ start: number, end: number }>();

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.virtualScroll.renderedRangeStream
      .subscribe(event => {
        this.scroll.emit(event);
      });
  }

  trackByFn(idx) {
    return idx;
  }

}
