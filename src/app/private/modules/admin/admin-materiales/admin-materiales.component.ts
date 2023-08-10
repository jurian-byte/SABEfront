import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Material } from 'src/app/models/materiales';
import { MaterialService } from 'src/app/services/core/materiales.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-admin-materiales',
  templateUrl: './admin-materiales.component.html',
  styleUrls: ['./admin-materiales.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class AdminMaterialesComponent implements OnInit {

  materialDialog: boolean = false;
  deleteMaterialDialog: boolean = false;
  deleteMaterialesDialog: boolean = false;
  materiales: Material[] = [];
  material: Material = {

    idMateriales: 0,
    Estado: 'Disponible',
 
    Tipo: 0
  };
  tipoMaterial: any[] = [];
  selectedMateriales: Material[] = [];
  submitted: boolean = false;
  selectedMaterial: Material[] = [];

  rowsPerPageOptions = [5, 10, 20];

  constructor(
    private materialService: MaterialService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.getMateriales();
    this.tipoMaterial = [
      { label: 'Computadora', value: 1 },
      { label: 'Cubiculo', value: 2 },
      { label: 'Sala de estudios', value: 3 },


    ];

  }
  getMateriales(): void {
    this.materialService.getMateriales().subscribe(
      (materiales: Material[]) => {
        this.materiales = materiales;
      },
      (error: any) => {
        console.error('Error al obtener los materiales:', error);
      }
    );
  }


  


  openNewMaterial(): void {
    this.material = {
      idMateriales: 0,
      Estado: 'Disponible',
      
      Tipo: 0
    };
    this.submitted = false;
    this.materialDialog = true;
  }

  deleteSelectedMateriales() {
    this.deleteMaterialesDialog = false;
    const selectedIds = this.selectedMateriales.map(material => material.idMateriales);
    this.materialService.deleteMateriales(this.selectedMateriales).toPromise()
      .then(() => {
        this.materialService.getMateriales().subscribe({
          next: (materiales: Material[]) => {
            this.materiales = materiales;
            this.messageService.add({
              severity: 'success',
              summary: 'Exito',
              detail: 'Materiales eliminados',
              life: 3000
            });
          
          },
          error: (error: any) => {
            console.error('Error al obtener los materiales:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Error al obtener los materiales',
              life: 3000
            });
          }
        });
      })
      .catch((error: HttpErrorResponse) => {
        const errorMessage = error.error.message || 'No se pudo eliminar el libro';
        this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage, life: 3000 });
      });
  }
  

  saveMaterial() {
    this.submitted = true;
    if (!this.material.Tipo || isNaN(this.material.Tipo)) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Tipo de material inválido',
        life: 3000
      });
      return;
    }
  
    if (this.material.idMateriales) {
      const index = this.materiales.findIndex(material => material.idMateriales === this.material.idMateriales);
      if (index >= 0) {
        this.materialService.updateMaterial(this.material).subscribe(() => {
          this.materiales[index] = this.material;
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Material actualizado',
            life: 3000
          });
          this.materialDialog = false;
        }, (error: any) => {
          console.error('Error al actualizar el material:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al actualizar el material',
            life: 3000
          });
        });
      }
    } else {
      this.materialService.addMaterial(this.material).subscribe(() => {
        this.materialService.getMateriales().subscribe({
          next: (materiales: Material[]) => {
            this.materiales = materiales;
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Material agregado',
              life: 3000
            });
            this.materialDialog = false;
          },
          error: (error: any) => {
            console.error('Error al obtener los materiales:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Error al obtener los materiales',
              life: 3000
            });
          }
        });
      }, (error: any) => {
        console.error('Error al agregar el material:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al agregar el material',
          life: 3000
        });
      });
    }
  }
  
  



  showDeleteMaterialesDialog() {
    this.deleteMaterialesDialog = true;
  }

  
  showDeleteMaterialDialog(material: Material) {
    this.material = material;
    this.deleteMaterialDialog = true;
  }

  confirmDeleteSelectedMaterial() {
    this.deleteMaterialDialog = false;
    if (!this.material || !this.material.idMateriales) {
      return;
    }
    const index = this.materiales.findIndex(
      (material: Material) => material.idMateriales === this.material.idMateriales
    );
    if (index === -1) {
      return;
    }
    this.materialService.deleteMaterial(this.material.idMateriales).toPromise()
      .then(() => {
        this.materialService.getMateriales().subscribe({
          next: (materiales: Material[]) => {
            this.materiales = materiales;
            this.messageService.add({
              severity: 'success',
              summary: 'Exito',
              detail: 'Material eliminado',
              life: 3000
            });
          },
          error: (error: HttpErrorResponse) => {
            const errorMessage = error.error.message || 'Error al obtener los materiales';
            console.error('Error al obtener los materiales:', errorMessage);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: errorMessage,
              life: 3000
            });
          }
        });
      })
      .catch((error: HttpErrorResponse) => {
        const errorMessage = error.error.message || 'Error al eliminar el material';
        console.error('Error al eliminar el material:', errorMessage);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: errorMessage,
          life: 3000
        });
      });
  }
  



  deleteMaterial(material: Material) {
    this.materialService.deleteMaterial(material.idMateriales).toPromise()
      .then((response: any) => {
        this.materiales = this.materiales.filter(
          (m: Material) => m.idMateriales !== material.idMateriales
        );
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Material eliminado',
          life: 3000
        });
      })
      .catch((error: HttpErrorResponse) => {  
        const errorMessage = error.error ? error.error.message : 'No se pudo eliminar el material';
        this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage, life: 3000 });
      });
      
    this.deleteMaterialDialog = false;
  }
  



  hideDialog() {
    this.materialDialog = false;
    this.submitted = false;
  }

  editMaterial(material: Material) {
    this.material = { ...material };
    this.materialDialog = true;
  }


  getTipoLabel(numero: number): string {
    const tipo = this.tipoMaterial.find(item => item.value === numero);
    return tipo ? tipo.label : '';
  }

 

}