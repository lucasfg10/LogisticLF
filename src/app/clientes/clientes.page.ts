import { Component, OnInit } from '@angular/core';
import { Cliente } from '../models/Cliente';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from '../services/ClienteService';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
  standalone: false,

})
export class ClientesPage implements OnInit {

  clientes: Cliente[] = [];
  form: FormGroup;
  isEditing = false;
  selectedId: string | null = null;
  showForm = false;

  constructor(
    private clienteService: ClienteService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      telefono: [''],
      direccion: ['']
      
    });
  }

  ngOnInit() {
    this.loadClientes();
  }

  loadClientes() {
    this.clienteService.getAll().subscribe(data => this.clientes = data);
  }

  nuevo(){
    this.showForm = true;
  }

  editar(cliente: Cliente) {
    this.isEditing = true;
    this.selectedId = cliente.id!;
    this.showForm = true;
    this.form.patchValue({
      nombre: cliente.nombre,
      telefono: cliente.telefono,
      direccion: cliente.direccion
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

    const data: Cliente = this.form.value;

    if (this.isEditing && this.selectedId) {
      this.clienteService.update(this.selectedId, data).then(() => this.cancelar());
    } else {
      this.clienteService.add(data).then(() => this.form.reset());
    }

    this.showForm = false;
  }

  eliminar(id: string) {
    if (confirm('¿Estás seguro de que quieres eliminar este cliente?')) {
      this.clienteService.delete(id);
    }
  }

}
