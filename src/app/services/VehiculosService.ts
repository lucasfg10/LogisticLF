import { inject, Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, deleteDoc, updateDoc, addDoc } from '@angular/fire/firestore';
import { Vehiculo } from '../models/Vehiculo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {
  private path = 'vehiculos';
  private firestore = inject(Firestore);

 getAll(): Observable<Vehiculo[]> {
    const vehiculosCollection = collection(this.firestore, this.path);
    return collectionData(vehiculosCollection, { idField: 'id' }) as Observable<Vehiculo[]>;
  }

  add(vehiculo: Vehiculo): Promise<any> {
    const vehiculosCollection = collection(this.firestore, this.path);
    return addDoc(vehiculosCollection, vehiculo);
  }

  update(id: string, vehiculo: Vehiculo): Promise<void> {
    const vehiculoDocRef = doc(this.firestore, `${this.path}/${id}`);
    return updateDoc(vehiculoDocRef, { ...vehiculo });
  }

  delete(id: string): Promise<void> {
    const vehiculoDocRef = doc(this.firestore, `${this.path}/${id}`);
    return deleteDoc(vehiculoDocRef);
  }
}
