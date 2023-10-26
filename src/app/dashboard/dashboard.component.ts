import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Fournisseur } from '../shared/models/fournisseur';
import { FournisseurService } from '../services/fournisseur.service';
import { NgForm } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../shared/models/employee';
import { ProductService } from '../services/product.service';
import { Product } from '../shared/models/product';
import { Observable, repeat } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  selectedMenu:any='Home';
  public fournisseurs!: Fournisseur[];
  public employees!: Employee[];
  public products!: Product[];
  public deleteFournisseur!: Fournisseur;
  public deleteEmployee!: Employee;
  public deleteProduct!: Product;
  public editfournisseur!: Fournisseur;
  public editEmployee!: Employee;
  public editProduct!: Product;
  public addFournisseur!: Fournisseur;
  public addEmployee!: Employee;
  public addProduct!: Product;
  dashboardLetters: string[] = [];
  dashboardLetters$: Observable<string[]> | undefined;
  constructor(private router: Router,@Inject(FournisseurService) private fournisseurService: FournisseurService, private employeeService: EmployeeService , private productService: ProductService) { }

  ngOnInit(): void {
    this.getFourinsseurs();
    this.getEmployee();
    this.getProduct();
    this.dashboardLetters = 'Dashboard'.split('');
    this.dashboardLetters$ = this.getLettersStream(this.dashboardLetters);
  }
  getLettersStream(letters: string[]): Observable<string[]> {
    return new Observable(observer => {
      let index = 0;
      const showLetters = () => {
        if (index < letters.length) {
          observer.next(letters.slice(0, index + 1));
          index++;
          setTimeout(showLetters, 500);
        } else {
          setTimeout(() => {
            observer.next([]);
            index = 0;
            showLetters();
          }, 1500);
        }
      };
      showLetters();
    });
  }
  logout(){
    localStorage.removeItem('loggedIn');
    this.router.navigate(['/login']);
  }
  goTo(paramText:String) {
    this.selectedMenu=paramText;
  }
 
  public getFourinsseurs(): void {
    this.fournisseurService.getFournisseurs().subscribe(
      (response: Fournisseur[]) => {
        this.fournisseurs = response;
        console.log(this.fournisseurs);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getEmployee(): void {
    this.employeeService.getEmployee().subscribe(
      (response: Employee[]) => {
        this.employees= response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  
  public getProduct():void {
    this.productService.getProducts().subscribe(
      (response: Product[]) => {
        this.products= response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddFournisseur(addForm: NgForm): void {
    this.fournisseurService.addFournisseur(addForm.value).subscribe(
      (response: Fournisseur) => {
        console.log(response);
        this.getFourinsseurs();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onAddEmployee(addForm: NgForm):void {
    this.employeeService.addEmployee(addForm.value).subscribe(
      (response: Employee) => {
        this.getEmployee();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onAddProduct(addForm: NgForm):void {
    this.productService.addProduct(addForm.value).subscribe(
      (response: Product) => {
        this.getProduct();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateFournisseur(fournisseur: Fournisseur): void {
    this.fournisseurService.updateFournisseur(fournisseur).subscribe(
      (response: Fournisseur) => {
        console.log(response);
        this.getFourinsseurs();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onUpdateEmployee(employee: Employee): void {
    this.employeeService.updateEmployee(employee).subscribe(
      (response: Employee) => {
        this.getEmployee();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onUpdateProduct(product: Product): void {
    this.productService.updateProduct(product).subscribe(
      (response: Product) => {
        this.getProduct();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  onDeleteFournisseur(fournisseurId:number):void{
    this.fournisseurService.deleteFournisseur(fournisseurId).subscribe(
      (response: void) => {
        console.log(response);
        this.getFourinsseurs();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  onDeleteEmployee(employeeId:Number): void {
    this.employeeService.deleteEmployee(employeeId).subscribe(
      (response: void) => {
        this.getEmployee();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  } 

  onDeleteProduct(productId:Number) :void {
    this.productService.deleteProduct(productId).subscribe(
      (response: void) => {
        this.getProduct();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModalFournisseur(fournisseur: Fournisseur, mode: string): void {
    const container = document.getElementById('main-container-fournisseur');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addFournisseurModal');
    }
    if (mode === 'edit') {
      this.editfournisseur = fournisseur;
      button.setAttribute('data-target', '#updateFournisseurModal');
    }
    if (mode === 'delete') {
      this.deleteFournisseur = fournisseur;
      button.setAttribute('data-target', '#deleteFournisseurModal');
    }
    if(container != null){
      container.appendChild(button);
    }
    button.click();
  }

  public onOpenModalEmployee(employee: Employee, mode: string): void {
    const container = document.getElementById('main-container-employee');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    if (mode === 'edit') {
      this.editEmployee = employee;
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    if (mode === 'delete') {
      this.deleteEmployee = employee;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    if(container != null){
      container.appendChild(button);
    }
    button.click();
  }

  public onOpenModalProduct(product: Product, mode: string): void {
    const container = document.getElementById('main-container-product');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addProductModal');
    }
    if (mode === 'edit') {
      this.editProduct = product;
      button.setAttribute('data-target', '#updateProductModal');
    }
    if (mode === 'delete') {
      this.deleteProduct = product;
      button.setAttribute('data-target', '#deleteProductModal');
    }
    if(container != null){
      container.appendChild(button);
    }
    button.click();
  }

  public searchFournisseurs(key: String): void{
    const results: Fournisseur[] = [];
    for(const fournisseur of this.fournisseurs) {
      if(fournisseur.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || fournisseur.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || fournisseur.num.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || fournisseur.entreprise.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ){
        results.push(fournisseur);
      }
    }
    this.fournisseurs = results;
    if (results.length === 0 || !key) {
      this.getFourinsseurs();
    }
  }

  public searchEmployees(key: String) : void {
    const results: Employee[] = [];
    for(const employee of this.employees) {
      if(employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.num.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.poste.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ){
        results.push(employee);
      }
    }
    this.employees= results;
    if (results.length === 0 || !key) {
      this.getEmployee();
    }
  }

  public searchProducts(key: String) : void {
    const results: Product[] = [];
    for(const product of this.products) {
      if(product.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || product.code.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ){
        results.push(product);
      }
    }
    this.products= results;
    if (results.length === 0 || !key) {
      this.getProduct();
    }
  }

}
