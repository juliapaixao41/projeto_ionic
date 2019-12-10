import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { ServiceService } from '../service/service.service';
import {User} from '../interfaces/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

    usuarios: any;
    nomeDono : string;
    login : string;
    senha : string;
    dataNascimento : number;

    user = {} as User;

  constructor(private navCtrl : NavController, private afs: AngularFirestore, private afAuth: AngularFireAuth, private api: ServiceService, private toastCtrl : ToastController) {}

  ngOnInit() {
    this.api.read_Usuario().subscribe(data => {
      this.usuarios = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          nomeDono: e.payload.doc.data()['nomeDono'],
          login: e.payload.doc.data()['login'],
          senha: e.payload.doc.data()['senha'],
          dataNascimento: e.payload.doc.data()['dataNascimento'],
        };
      })
      
    });
  }

  
  abrirPagina(nomePagina :  string){
    this.navCtrl.navigateForward(nomePagina)
  }

  async register(user: User) {
    try {
      console.log(user);
      const newUser = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
        await this.afs.collection('Usuarios').doc(newUser.user.uid).set(this.user);
          if (newUser) {
            localStorage.setItem("nomeDono", user.email);
             this.navCtrl.navigateForward('/cadastro-pet');
        
          }
    } catch (e) {
      console.error(e);
    }
  }


}
