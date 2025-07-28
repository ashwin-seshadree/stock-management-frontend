import { Component } from '@angular/core';
import { Topnav } from '../pages/topnav/topnav';
import { Sidenav } from '../pages/sidenav/sidenav';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, Topnav, Sidenav],
  templateUrl: './layout.html',
  styleUrl: './layout.sass'
})
export class Layout {

}
