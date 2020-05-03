import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html'
})
export class SidenavComponent implements OnInit {

  @Output() public sidenavClose = new EventEmitter
  constructor() { }

  ngOnInit() {
  }

  public onSidenavClose = () =>{
    this.sidenavClose.emit();
  }

}
