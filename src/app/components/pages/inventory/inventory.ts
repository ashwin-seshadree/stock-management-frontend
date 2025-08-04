import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryService } from '../../../services/inventory.service';
import { Observable, of } from 'rxjs';
import { Paginator } from "../../../layout/paginator/paginator";

interface InventoryItem {
  id: number;
  product_name: string;
  product_description: string;
  product_price: number;
  product_weight: string;
  product_quantity: number;
}

@Component({
  selector: 'app-inventory',
  imports: [CommonModule, Paginator],
  standalone: true,
  templateUrl: './inventory.html',
  styleUrls: ['./inventory.sass', '../../pagesstyles.scss']
})
export class Inventory {
  title: string = 'Inventory';
  inventoryList!: Observable<InventoryItem[]> | null;
  inventoryListMeta: any;

  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 10;

  constructor(
    private inventoryService: InventoryService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.getInventory();
  }

  ngAfterViewInit() { }

  private getInventory() {
    this.inventoryService.getInventory({
      page: this.currentPage,
      limit: this.pageSize,
    }).subscribe({
      next: (response: any) => {
        this.inventoryList = of(response.data as InventoryItem[]);
        this.inventoryListMeta = response.meta;
        this.handlePageChange(this.currentPage);
        this.cdRef.detectChanges();
      },
      error: (error: any) => {
        console.error('Error fetching inventory:', error);
      }
    });
  }

  handlePageChange(page: number, refetch: boolean = false): void {
    this.currentPage = page;
    this.pageSize = this.inventoryListMeta.pageSize
    this.totalItems = this.inventoryListMeta.totalItems;
    if (refetch) this.getInventory();
  }

}