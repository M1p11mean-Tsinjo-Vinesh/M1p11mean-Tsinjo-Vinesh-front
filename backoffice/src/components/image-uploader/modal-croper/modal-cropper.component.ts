import {Component, Inject} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {ImageCroppedEvent, LoadedImage} from "ngx-image-cropper";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import Swal from "sweetalert2";

@Component({
  selector: 'app-modal-croper',
  templateUrl: './modal-cropper.component.html',
  styleUrls: ['../../modal.component.scss']
})
export class ModalCropperComponent {

  imageChangedEvent: any = '';
  croppedImage: any = '';

  constructor (
    private sanitizer: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) data: any,
    private ref: MatDialogRef<ModalCropperComponent>
  ) {
    this.imageChangedEvent = data.event;
  }

  private async _fireError (message: string) {
    return await Swal.fire({
      title: "Erreur",
      text: message,
      icon: "error"
    })
  }

  crop () {
    this.ref.close(this.croppedImage);
  }

  imageCropped(event: ImageCroppedEvent) {
    if (event.base64 != null) {
      this.croppedImage = event.base64;
    }
  }

  imageLoaded(image: LoadedImage) {
    // show cropper
  }

  cropperReady() {
    // cropper ready
  }

  loadImageFailed() {
    this._fireError("Vérifiez votre image!").then(() => this.ref.close())
  }

}
