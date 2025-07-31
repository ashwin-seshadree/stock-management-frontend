import { Component, ViewChild, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { Modal } from 'bootstrap';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.sass', '../../pagesstyles.scss']
})
export class Dashboard implements AfterViewInit, OnDestroy {
  @ViewChild('exampleModal') exampleModal!: ElementRef;
  title: string = 'Dashboard';
  _exampleModal!: Modal;

  ngAfterViewInit() {
    this._exampleModal = new Modal(this.exampleModal.nativeElement, {
      backdrop: 'static',
      keyboard: false
    });
  }

  showModal() {
    this._exampleModal.show();
  }

  ngOnDestroy() {
    if (this._exampleModal) {
      this._exampleModal.dispose();
    }
  }
}
