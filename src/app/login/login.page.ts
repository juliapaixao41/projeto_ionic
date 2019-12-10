import { Component, OnInit, ViewChild  } from '@angular/core';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import {User} from '../interfaces/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { ListaPetPage } from '../lista-pet/lista-pet.page';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
 

  
  user = {} as User;

  public loading : any;

  constructor(public navCtrl : NavController, private loadingCtrl: LoadingController, private toastCtrl: ToastController, private afAuth: AngularFireAuth,) {
     
   }

  ngOnInit() {
    
  }

  abrirPagina(nomePagina :  string){
    this.navCtrl.navigateForward(nomePagina)
  }

  async login(user: User) {
    try {
      console.log(user);
      const result = this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      if (result) {
        localStorage.setItem("nomeDono", user.email);
          this.navCtrl.navigateForward('/lista-pet');
         console.log(localStorage.getItem("nomeDono")); 
      }
      
      
    } catch (e) {
      console.error(e.m.message);
    }
    console.log('Logando...');
  }
  
  
  }
  

  


