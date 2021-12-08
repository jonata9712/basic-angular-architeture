import { Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-drop-down-div',
  templateUrl: './drop-down-div.component.html',
  styleUrls: ['./drop-down-div.component.css']
})
export class DropDownDivComponent implements OnInit {

  @Input() width: any;
  @Input() showDropDown: boolean = false;

  @Input() display: boolean = true;
  @Input() height: any;

  constructor() { }

  ngOnInit(): void {
  }


}
