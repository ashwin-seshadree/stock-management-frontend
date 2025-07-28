import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidenav',
  imports: [CommonModule],
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.sass'
})
export class Sidenav {
  collapsed = false;
  constructor() { }


  toggleSideNav() {
    this.collapsed = !this.collapsed;
  }
}
