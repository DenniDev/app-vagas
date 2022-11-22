import { Injectable } from "@angular/core";
import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
    providedIn: 'root'
})
export class FirebaseService {

    email: string;
    password: string;
    config;
    vagas = [];


    constructor(
        private afs: AngularFirestore,
        private afAuth: AngularFireAuth
    ) { }

    iniciar() {
        return new Promise<any>((resolve, reject) => {
            //Login com email e senha
            this.afAuth.signInAnonymously()
        })
    }

    categorias() {
        return new Promise<any>((resolve, reject) => {
            //Recuperar categorias
            this.afs.firestore.collection('categorias').get().then((lista) => {
                let array = [];
                lista.forEach((item) => {
                    //Formatar dado
                    let obj = item.data();
                    obj['id'] = item.id;
                    array.push(obj);
                });

                resolve(array)
            })
        })
    }
    eventosLista() {
        return new Promise<any>((resolve, reject) => {
            //Recuperar eventos
            this.afs.firestore.collection('eventos').get().then((lista) => {
                let array = [];
                lista.forEach((item) => {
                    //Formatar dado
                    let obj = item.data();
                    obj['id'] = item.id;
                    array.push(obj);
                });

                resolve(array)
            })
        })
    }

    vagasPorCategoria(categoriaId) {
        return new Promise<any>((resolve, reject) => {
            //Recuperar categorias
            this.afs.firestore.collection('vagas').where('categoria', '==', categoriaId).get().then((lista) => {
                let array = [];
                lista.forEach((item) => {
                    //Formatar dado
                    let obj = item.data();
                    obj['id'] = item.id;
                    array.push(obj);
                });

                resolve(array)
            })
        })
    }

    canditatar(candidato) {
        return new Promise<any>((resolve, reject) => {
            //Recuperar categorias
            this.afs.firestore.collection('candidatos').add(candidato)
            .then((r) => {
                resolve(r.id)
            })
            .catch((e) => {
                reject(e)
            })     
        })
    }

    candidato(id){
        return new Promise<any>((resolve, reject) => {
            //Recuperar categorias
            this.afs.firestore.collection('candidatos').doc(id).get()
            .then((r) => {
                resolve(r.data())
            })
            .catch((e) => {
                reject(e)
            })     
        })
    }


}