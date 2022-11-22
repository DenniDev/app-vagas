import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {


  name: string;
  email: string;
  phone: string;
  password: string;




  constructor(
    private navCtrl: NavController,
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastr: ToastController


    ) { }

  ngOnInit(): void  {
  }

  async cadastrar()
  {
    if(this.name && this.email && this.phone && this.password)
    {
      const loading = await this.loadingCtrl.create({
        message: 'Processing..',
        spinner: 'crescent',
        showBackdrop: true
      });

      loading.present();

      this.afAuth.createUserWithEmailAndPassword(this.email, this.password)
      .then((data)=> {
        data.user.sendEmailVerification();
        this.afs.collection('user').doc(data.user.uid).set({
          'userId': data.user.uid,
          'userName': this.name,
          'userEmail': this.email,
          'userPhone': this.phone,
          'createdAt': Date.now()
        })
        .then(()=>{
          loading.dismiss();
          this.toast('Registration Sucess! Please check Yoour Email!', 'success');
          this.router.navigate(['/login']);
        })
        .catch(error => {
          loading.dismiss();
          this.toast(error.message, 'danger');
        })
      })
      .catch(error => {
        loading.dismiss();
        this.toast(error.message, 'danger')
      })
    } else {
      this.toast('Pleasse fill the form!', 'warning');
    }
  } //end of cadastro

  async toast(message, status)
  {
    const toast = await this.toastr.create({
      message: message,
      color: status,
      position: 'top',
      duration: 2000
    });
    toast.present();
  } // end of toast

  // async cadastrar(){
  //   const {email, password, cpassword} = this
  //   if (password !=cpassword) {
  //     return console.error("Senha não bate!!")
  //   }
  //  try {
  //   const res = await this.afAuth.createUserWithEmailAndPassword(email,password)
  //   console.log(res)
  // } catch(error){
  //     console.dir(error)
  //  }
  // }

  voltar(){
    this.navCtrl.navigateForward('inicio');
  }

  login(){
    this.navCtrl.navigateForward('login');
  }
}
