import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { Modal } from 'bootstrap';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Product as ProductService } from '../../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { Paginator } from "../../../layout/paginator/paginator";

interface ProductItem {
  id: number;
  product_name: string;
  description: string;
}

@Component({
  selector: 'app-products',
  imports: [CommonModule, ReactiveFormsModule, Paginator],
  standalone: true,
  templateUrl: './products.html',
  styleUrls: ['./products.sass', '../../pagesstyles.scss']
})
export class Products {
  @ViewChild('productModal') productModal!: ElementRef;

  title: string = 'Products';
  productList!: Observable<ProductItem[]> | null;
  productListMeta: any;
  _productModal!: Modal;
  productForm!: FormGroup;
  productsModalTitle: string = 'Add';

  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 10;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private toastr: ToastrService,
    private cdRef: ChangeDetectorRef
  ) {
    this.initForm();
  }

  ngOnInit() {
    this.getAllProducts();
  }

  ngAfterViewInit() {
    this._productModal = new Modal(this.productModal.nativeElement, {
      backdrop: 'static',
      keyboard: false
    });
  }

  showModal(isUpdate: boolean = false) {
    if (isUpdate) this.productsModalTitle = 'Update';
    this._productModal.show();
  }

  initForm() {
    this.productForm = this.fb.group({
      product_name: ['', [Validators.required, Validators.minLength(1)]],
      description: [''],
    });
  }

  get f() {
    return this.productForm.controls;
  }

  onProductAction() {
    console.log('Product Form Value:', this.productForm.value);
    if (this.productForm.invalid) {
      return;
    }
    const productData = this.productForm.value;

    this.productService.product(productData, this.productsModalTitle === "Update" ? true : false).subscribe({
      next: (response: any) => {
        this.toastr.success(response.message, 'Successs', {
          progressBar: true,
          progressAnimation: 'increasing'
        });
        this._productModal.hide();
        this.productForm.reset();
        this.getAllProducts();
        this.productsModalTitle = 'Add';
      },
      error: (error: any) => {
        const { message } = error.error;
        this.toastr.error(message, 'Error', {
          disableTimeOut: true,
          closeButton: true,
        });
      }
    })
  }

  getAllProducts() {
    this.productService.getAllProducts({
      page: this.currentPage,
      limit: this.pageSize,
    }).subscribe({
      next: (response: any) => {
        this.productList = of(response.data as ProductItem[]);
        this.productListMeta = response.meta;
        this.handlePageChange(this.currentPage);
        this.cdRef.detectChanges();
      },
      error: (error: any) => {
        console.error('Error fetching products:', error);
      }
    });
  }

  handlePageChange(page: number, refetch: boolean = false): void {
    this.currentPage = page;
    this.pageSize = this.productListMeta.pageSize
    this.totalItems = this.productListMeta.totalItems;
    if (refetch) this.getAllProducts();
  }

  ngOnDestroy() {
    if (this._productModal) {
      this._productModal.dispose();
    }
  }
}
