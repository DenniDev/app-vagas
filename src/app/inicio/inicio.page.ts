import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  loaded: boolean = false;

  constructor(
    public modalController: ModalController,
    private navCtrl: NavController) { }

  async ngOnInit() {
    
    }

    
    
}
