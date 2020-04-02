import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(public toastController: ToastController) {}

  async success(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: "top",
      color: "success"
    });
    toast.present();
  }

  async error(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 4000,
      position: "top",
      color: "danger"
    });
    toast.present();
  }
}
