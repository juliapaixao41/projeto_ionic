import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  
 
 

  constructor(private firestore: AngularFirestore ) { }

    cadastra_Pet(record) {
      record['nomeDono'] = localStorage.getItem('nomeDono')
      return this.firestore.collection('Pet').add(record)
  
    }
    cadastra_Usuario(record) {
      return this.firestore.collection('Usuario').add(record);
    }

    cadastra_Vacina(record) {
      return this.firestore.collection('Vacina').add(record);
    }

    read_Pet() {
    
    return this.firestore.collection('Pet').snapshotChanges()
      .pipe(map(todospets => {
        const petsdono = todospets.filter(pet => {
          return pet['nomeDono'] = localStorage.getItem('nomeDono');
        })
          return petsdono
      }))
  
    }
    read_Usuario() {
      return this.firestore.collection('Usuario').snapshotChanges();
    }
    read_Vacina() {
      return this.firestore.collection('Vacina').snapshotChanges();
    }

    update_Pet(recordID,record){
      this.firestore.doc('Pet/' + recordID).update(record);
    }
    update_Vacina(recordID,record){
      this.firestore.doc('Vacina/' + recordID).update(record);
    }

    delete_Pet(record_id) {
      this.firestore.doc('Pet/' + record_id).delete();
    }
    delete_Vacina(record_id) {
      this.firestore.doc('Vacina/' + record_id).delete();
    }
}
