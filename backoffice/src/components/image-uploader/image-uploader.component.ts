import {Component, Input} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ModalCropperComponent} from "./modal-croper/modal-cropper.component";
import Swal from "sweetalert2";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi:true,
      useExisting: ImageUploaderComponent
    }
  ]
})
export class ImageUploaderComponent implements ControlValueAccessor {

  disabled: boolean = false;
  touched: boolean = false;
  @Input() max?: number;
  images!: any;

  onChange: any = (images :any) => {};
  onTouched: any = (images :any) => {}


  constructor(private dialog: MatDialog) {
  }

  getImages () {
    if (!this.images) return [];
    if (this.max === 1) {
      return [this.images];
    }
    else return this.images;
  }

  writeValue(obj: any): void {
    if (obj === undefined || obj === "" || obj === null) {
      this.images = undefined;
      return;
    }
    if (this.max === 1) {
      this.images = [obj];
      return;
    }
    this.images = obj;
  }

  private _transform (input: any) {
    if (this._isDataUrl(input)) return input;
  }

  private _isDataUrl (dataUrl: any) {
    let result = dataUrl.match(/^data:image\/?[A-z]*;base64,.*$/);
    return result && result.length;
  }

  registerOnChange(fn: any): void {
      this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
      this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
      this.disabled = isDisabled;
  }

  markAsTouched () {
    if (!this.touched) {
      this.onTouched();
      this.touched  = true;
    }
  }

  fileChangeEvent(e: any) {
    this.markAsTouched();
    const ref = this.dialog.open(ModalCropperComponent, {
      data: {
        event: e
      }
    });
    ref.afterClosed().subscribe((res) => {
      res && res !== "cancel" && this._push(res)
    })
  }

  private _push (res: any) {
    if (this.disabled) return;
    if (this.max && this.getImages().length >= this.max) {
      Swal.fire({
        title: "Erreur",
        text: "Vous avez atteint le nombre d'image maximum",
        icon: "error"
      });
      return;
    }
    if (this.max === 1) {
      this.images = res;
    }
    else {
      this.images = this.images || [];
      this.images.push(res);
    }
    this.onChange(this.images);
  }

  remove(i: number) {
    if (this.disabled) return;
    if (this.max !== 1) {
      this.images.splice(i, 1);
    }
    else
    {
      this.images = undefined;
    }
    this.onChange(this.images);
  }

}
