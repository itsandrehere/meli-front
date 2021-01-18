import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ml-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  search = new FormControl('');
  @Output() query = new EventEmitter<string>();

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params) {
        params.search ? this.search.setValue(params.search) : this.search.setValue('');
      }
    });
  }

  sendMessage() {
    this.query.emit(this.search.value);
  }

}
