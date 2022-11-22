import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

 
    email: string;
    password: string;

  constructor(
    private navCtrl: NavController,
    private auth: AuthService,
    private toastr: ToastController,
    private router: Router
    ) { }

  ngOnInit() {
  }
  
  login(){
    if(this.email && this.password)
    {
      this.auth.signIn(this.email, this.password);
    } else {
      this.toast('Please enter your email & password!', 'warning');
    }
  }
  async toast (message, status)
  {
    const toast = await this.toastr.create({
      message: message,
      color: status,
      position: 'top',
      duration: 2000
    });
    toast.present()
  }
  // fazerLogin() {
  //   console.log(this.usuario)
  //   //Logar no autentication
  //   this.afAuth.signInWithEmailAndPassword(this.usuario.email, this.usuario.senha).then(() => {
  //     this.afAuth.setPersistence(firebase.auth.Auth.Persistence.SESSION)
  //     console.log('logado')

  //     //Verificar se está cadastrado como admin
  //     this.afs.firestore.collection('usuarios').where('email', '==', this.usuario.email)
  //       .get()
  //       .then((r) => {
  //         let array = [];
  //         r.forEach((rr) => {
  //           array.push(rr.data());
  //         });
          
  //         if (array.length > 0) {
            

  //           //Acesso liberado
  //           this.router.navigate(['vagas']);
  //         }
  //         else {
  //           alert('Ops! Acesso não liberado');
  //         }
  //       })

  //   })
  //   .catch(() => {
  //     alert('Ops! Acesso não liberado');
  //   })
  // }
  entrar(){
    this.navCtrl.navigateForward('vagas');
  }
  voltar(){
    this.navCtrl.navigateForward('inicio');
  }

}
