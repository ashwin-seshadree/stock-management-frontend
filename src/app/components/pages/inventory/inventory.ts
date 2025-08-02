import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryService } from '../../../services/inventory.service';
import { Observable, of } from 'rxjs';

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
  imports: [CommonModule],
  standalone: true,
  templateUrl: './inventory.html',
  styleUrls: ['./inventory.sass', '../../pagesstyles.scss']
})
export class Inventory {
  title: string = 'Inventory';
  inventoryList!: Observable<InventoryItem[]>;
  inventoryListMeta: any;

  constructor(
    private inventoryService: InventoryService,
    private cdRef: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.getInventory();
  }

  ngAfterViewInit() {
  }

  private getInventory() {
    this.inventoryService.getInventory().subscribe({
      next: (response: any) => {
        this.inventoryList = of(response.data as InventoryItem[]);
        this.inventoryListMeta = response.meta;
        this.cdRef.detectChanges();
      },
      error: (error: any) => {
        console.error('Error fetching inventory:', error);
      }
    });
  }
}