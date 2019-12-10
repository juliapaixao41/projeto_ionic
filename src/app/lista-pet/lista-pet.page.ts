import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ServiceService } from './../service/service.service';


@Component({
  selector: 'app-lista-pet',
  templateUrl: './lista-pet.page.html',
  styleUrls: ['./lista-pet.page.scss'],
})

export class ListaPetPage implements OnInit {

  
  pets: any;
  nomeAnimal : string;
  raca : string;
  peso : number;
  porteAnimal:string;
  dataNascimento : number;
  especie : string;
  genero : string;
 

  constructor(public navCtrl: NavController, private api: ServiceService) { 
    
  }

  ngOnInit() {
    
    this.api.read_Pet().subscribe(data => {
      this.pets = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          nomeAnimal: e.payload.doc.data()['nomeAnimal'],
          raca: e.payload.doc.data()['raca'],
          peso: e.payload.doc.data()['peso'],
          porteAnimal: e.payload.doc.data()['porteAnimal'],
          dataNascimento: e.payload.doc.data()['dataNascimento'],
          especie: e.payload.doc.data()['especie'],
          genero: e.payload.doc.data()['genero'],
        };
      })
      
    });
  }

  abrirPagina(nomePagina :  string){
    this.navCtrl.navigateForward(nomePagina)
  }
  RemovePet(rowID) {
    this.api.delete_Pet(rowID);
  }
  EditPet(record) {
    record.isEdit = true;
    record.EditNomeAnimal = record.nomeAnimal;
    record.EditRaca = record.raca;
    record.EditPeso = record.peso;
    record.EditPorteAnimal = record.porteAnimal;
    record.EditDataNascimento = record.dataNascimento;
    record.EditEspecie = record.especie;
    record.EditGenero = record.genero;
  }
  UpdatePet(recordRow) {
    let record = {};
    record['nomeAnimal'] = recordRow.EditNomeAnimal
    record['raca'] = recordRow.EditRaca;
    record['peso'] = recordRow.EditPeso;
    record['porteAnimal'] = recordRow.EditPorteAnimal;
    record['dataNascimento'] = recordRow.EditDataNascimento;
    record['especie'] = recordRow.EditEspecie;
    record['genero'] = recordRow.EditGenero;
    this.api.update_Pet(recordRow.id, record);
    recordRow.isEdit = false;
  }

  
}

