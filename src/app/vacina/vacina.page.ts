import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-vacina',
  templateUrl: './vacina.page.html',
  styleUrls: ['./vacina.page.scss'],
})
export class VacinaPage implements OnInit {

  vacinas: any;
  data : number;
  vacina : string;
  responsavel : string;
  repetir:number;
 
  
  constructor(private navCtrl : NavController, private api: ServiceService) { }

  ngOnInit() {
    this.api.read_Vacina().subscribe(data => {
      this.vacinas = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          data: e.payload.doc.data()['data'],
          vacina: e.payload.doc.data()['vacina'],
          responsavel: e.payload.doc.data()['responsavel'],
          repetir: e.payload.doc.data()['repetir'],
        };
      })
      
    });
  }
  abrirPagina(nomePagina :  string){
    this.navCtrl.navigateForward(nomePagina)
  }
  
  
  CreateVacina() {
      
    let record = {};

      record['data'] = this.data;
      record['vacina'] = this.vacina;
      record['responsavel'] = this.responsavel;
      record['repetir'] = this.repetir;
    
      this.api.cadastra_Vacina(record).then(resp => {
        this.data = undefined;
        this.vacina = "";
        this.responsavel = "";
        this.repetir = undefined;
      
        if (record) {
          this.navCtrl.navigateForward('/lista-pet');
        }
    
      })
      .catch(error => {
      
      });
      
  }

  
  RemoveVacina(rowID) {
    this.api.delete_Vacina(rowID);
  }
  EditVacina(record) {
    record.isEdit = true;
    record.EditData = record.data
    record.EditVacina = record.vacina;
    record.EditResponsavel = record.responsavel;
    record.EditRepetir = record.repetir;
    
  }

  
}
