import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../../services/session.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink],
  templateUrl: './layout.html',
  styleUrl: './layout.sass'
})
export class Layout {
  constructor(
    public sessionService: SessionService,
    private activatedRoute: ActivatedRoute,
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
