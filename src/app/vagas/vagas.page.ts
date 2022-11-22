import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController} from '@ionic/angular';
import { FirebaseService } from 'src/providers/firebase';
import { ModalPage } from '../modal/modal.page';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-vagas',
  templateUrl: './vagas.page.html',
  styleUrls: ['./vagas.page.scss'],
})
export class VagasPage implements OnInit {

  loaded: boolean = false;
  categorias = [];
  constructor(
    public firebase: FirebaseService,
    public loadingController: LoadingController,
    public modalController: ModalController
    ) { }
    fechar() {
      this.modalController.dismiss();
    }
  async ngOnInit() {
    // const loading = await this.loadingController.create({
    //   message: 'Loading...',
    // });
    // await loading.present();

    // //Inicilizar e recuperar configs
    // this.firebase.iniciar().then(async () => {
    //   await loading.dismiss();
    //   this.loaded = true;
    //   });
      
    //Carregar categorias
    this.firebase.categorias()
      .then(async (data) => {
        this.categorias = data;
        let i = 0;
        for (i; i < this.categorias.length; i++) {
         let vagas = await this.firebase.vagasPorCategoria(this.categorias[i]['id']);
         this.categorias[i]['vagas'] = vagas;
        }
      })
  }

  async detalhesDaVaga(v) {
    const modal = await this.modalController.create({
      component: ModalPage,
      componentProps: {
        "vagas": v
      }
    });
    return await modal.present();
  }
    

  

}
