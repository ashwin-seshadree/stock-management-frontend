import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet, RouterLink, ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../../services/session.service';
import { CommonModule } from '@angular/common';
import { config } from '../../configs/config';
import { Modal } from 'bootstrap';

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
  @ViewChild('logoutModal') logoutModal!: ElementRef;
  _logoutModal!: Modal;

  constructor(
    public sessionService: SessionService,
    private router: Router
  ) { }

  ngAfterViewInit() {
    this._logoutModal = new Modal(this.logoutModal.nativeElement, {
      backdrop: 'static',
      keyboard: false
    });
  }

  isActive(route: string): boolean {
    return this.router.url.includes(route);
  }

  logout(type: number = 1) {
    if (type == 1) this._logoutModal.show();
    else this.sessionService.endSession();
  }

  ngOnDestroy() {
    if (this._logoutModal) {
      this._logoutModal.dispose();
    }
  }
}
