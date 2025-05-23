import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../models/Vehiculo';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehiculoService } from '../services/VehiculosService';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.page.html',
  styleUrls: ['./vehiculos.page.scss'],
  standalone: false,

})
export class VehiculosPage implements OnInit {

  vehiculos: Vehiculo[] = [];
  form: FormGroup;
  isEditing = false;
  selectedId: string | null = null;
  showForm = false;

  constructor(
    private vehiculoService: VehiculoService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      marca: ['', Validators.required],
      modelo: [''],
      direccion: ['']
      
    });
  }

  ngOnInit() {
    this.loadVehiculos();
  }

  loadVehiculos() {
    this.vehiculoService.getAll().subscribe(data => this.vehiculos = data);
  }

  nuevo(){
    this.showForm = true;
  }

  editar(vehiculo: Vehiculo) {
    this.isEditing = true;
    this.selectedId = vehiculo.id!;
    this.showForm = true;
    this.form.patchValue({
      marca: vehiculo.marca,
      modelo: vehiculo.modelo
    });
  }

  cancelar() {
    this.isEditing = false;
    this.selectedId = null;
    this.form.reset();
    this.showForm = false;
  }

  guardar() {
    if (this.form.invalid) return;

    const data: Vehiculo = this.form.value;

    if (this.isEditing && this.selectedId) {
      this.vehiculoService.update(this.selectedId, data).then(() => this.cancelar());
    } else {
      this.vehiculoService.add(data).then(() => this.form.reset());
    }

    this.showForm = false;
  }

  eliminar(id: string) {
    if (confirm('¿Estás seguro de que quieres eliminar este vehiculo?')) {
      this.vehiculoService.delete(id);
    }
  }

}
