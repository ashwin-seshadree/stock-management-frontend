import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../../services/session.service';
import { CommonModule } from '@angular/common';
import { config } from '../../configs/config';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink],
  templateUrl: './layout.html',
  styleUrl: './layout.sass'
})
export class Layout {
  appName = config.app_name;
  appVersion = config.app_version;
  constructor(
    public sessionService: SessionService,
    private router: Router
  ) { }


  isActive(route: string): boolean {
    return this.router.url.includes(route);
  }

  logout() {
    console.log('Logging out');
    this.sessionService.endSession();
  }
}
