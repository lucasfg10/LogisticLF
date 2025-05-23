import { inject, Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, deleteDoc, updateDoc, addDoc } from '@angular/fire/firestore';
import { Chofer } from '../models/Chofer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChoferService {
  private path = 'choferes';
  private firestore = inject(Firestore);

 getAll(): Observable<Chofer[]> {
    const choferesCollection = collection(this.firestore, this.path);
    return collectionData(choferesCollection, { idField: 'id' }) as Observable<Chofer[]>;
  }

  add(chofer: Chofer): Promise<any> {
    const choferesCollection = collection(this.firestore, this.path);
    return addDoc(choferesCollection, chofer);
  }

  update(id: string, chofer: Chofer): Promise<void> {
    const choferDocRef = doc(this.firestore, `${this.path}/${id}`);
    return updateDoc(choferDocRef, { ...chofer });
  }

  delete(id: string): Promise<void> {
    const choferDocRef = doc(this.firestore, `${this.path}/${id}`);
    return deleteDoc(choferDocRef);
  }
}
