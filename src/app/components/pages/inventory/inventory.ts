import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { InventoryService } from '../../../services/inventory.service';
import { tap, catchError, map } from 'rxjs/operators';

interface InventoryItem {
  id: number;
  product_name: string;
  product_description: string;
  product_price: number;
  product_quantity: number;
}

@Component({
  selector: 'app-inventory',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './inventory.html',
  styleUrls: ['./inventory.sass', '../../pagesstyles.scss']
})
export class Inventory implements OnInit {
  title: string = 'Inventory';
  inventoryList$!: Observable<InventoryItem[]>;
  inventoryListMeta: any;

  loading$ = new BehaviorSubject<boolean>(true);

  constructor(
    private inventoryService: InventoryService
  ) { }

  ngOnInit() {
    this.getInventory();
  }

  private getInventory() {
    this.inventoryList$ = this.inventoryService.getInventory().pipe(
      map((response: any) => {
        if (typeof response.data === 'object' && !Array.isArray(response.data)) {
          return Object.values(response.data) as InventoryItem[];
        }
        return response.data as InventoryItem[];
      }),
      tap((inventoryData: InventoryItem[]) => {
        this.loading$.next(false);
      }),
      catchError((error: any) => {
        console.error('Error fetching inventory:', error);
        this.loading$.next(false);
        return of([]);
      })
    );
  }
}