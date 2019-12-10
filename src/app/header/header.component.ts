import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output()
  public sidenavToggle = new EventEmitter();

  public onToggleSidenav = () =>
  {
    this.sidenavToggle.emit();
  }

  constructor() { }

  ngOnInit() {
  }

}
