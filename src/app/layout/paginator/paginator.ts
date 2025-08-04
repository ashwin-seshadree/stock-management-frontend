import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-paginator',
  imports: [CommonModule],
  templateUrl: './paginator.html',
  styleUrl: './paginator.scss'
})
export class Paginator {
  @Input() currentPage: number = 1;
  @Input() pageSize: number = 10;
  @Input() totalItems: number = 1;

  @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();

  totalPages: number = 1;
  pages: number[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
    this.generatePageNumbers();
  }

  generatePageNumbers(): void {
    this.pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }
  }

  onPageChange(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.pageChanged.emit(this.currentPage);
  }

  onNext(): void {
    if (this.currentPage < this.totalPages) {
      this.onPageChange(this.currentPage + 1);
    }
  }

  onPrevious(): void {
    if (this.currentPage > 1) {
      this.onPageChange(this.currentPage - 1);
    }
  }

  get startIndex(): number {
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  get endIndex(): number {
    return Math.min(this.currentPage * this.pageSize, this.totalItems);
  }
}
