import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Chofer } from '../models/Chofer';
import { ChoferService } from '../services/ChoferService';
import { Vehiculo } from '../models/Vehiculo';
import { VehiculoService } from '../services/VehiculosService';

import { terminate } from 'firebase/firestore';

@Component({
  selector: 'app-choferes',
  templateUrl: './choferes.page.html',
  styleUrls: ['./choferes.page.scss'],
  standalone: false
})
export class ChofersPage implements OnInit {

  choferes: Chofer[] = [];
  vehiculos: Vehiculo[] = [];
  form: FormGroup;
  isEditing = false;
  selectedId: string | null = null;
  showForm = false;

  constructor(
    private choferService: ChoferService,
    private vehiculoService: VehiculoService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      telefono: [''],
      direccion: [''],
      vehiculoId: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadChofers();
    this.loadVehiculos();
  }

  loadChofers() {
    this.choferService.getAll().subscribe(data => this.choferes = data);
  }

  loadVehiculos() {
    this.vehiculoService.getAll().subscribe(data => this.vehiculos = data);
  }



  edit(chofer: Chofer) {
    this.isEditing = true;
    this.selectedId = chofer.id!;
    this.form.patchValue(chofer);
    this.showForm = true;
  }

  cancel() {
    this.isEditing = false;
    this.selectedId = null;
    this.form.reset();
    this.showForm = false;
  }

  save() {
    if (this.form.invalid) return;

    const data: Chofer = this.form.value;

    if (this.isEditing && this.selectedId) {
      this.choferService.update(this.selectedId, data).then(() => this.cancel());
    } else {
      this.choferService.add(data).then(() => this.form.reset());
    }

    this.showForm = false;
  }

  delete(id: string) {
    if (confirm('¿Estás seguro de que quieres eliminar este chofer?')) {
      this.choferService.delete(id);
    }
  }

  nuevo() {
    this.isEditing = false;
    this.selectedId = null;
    this.form.reset();
    this.showForm = true;
  } 

  cancelar() {
    this.isEditing = false;
    this.selectedId = null;
    this.form.reset();
    this.showForm = false;
  } 

  getVehiculoMarca(id: string): string {
    const vehiculo = this.vehiculos.find(a => a.id === id);
    return vehiculo ? vehiculo.marca : 'Desconocido';
  }
}
