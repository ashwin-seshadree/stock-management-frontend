import { Component } from '@angular/core';
import { SessionService } from '../../../services/session.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-topnav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './topnav.html',
  styleUrl: './topnav.sass'
})
export class Topnav {
  constructor(
    public sessionService: SessionService
  ) { }

  logout() {
    console.log('Logging out');
    this.sessionService.endSession();
  }

}
