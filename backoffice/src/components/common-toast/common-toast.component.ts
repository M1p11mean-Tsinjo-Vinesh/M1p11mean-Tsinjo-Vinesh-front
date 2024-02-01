import {ChangeDetectorRef, Component, ElementRef, Input, Renderer2} from '@angular/core';
import {ToastComponent, ToasterService} from "@coreui/angular";

@Component({
  selector: 'app-common-toast',
  templateUrl: './common-toast.component.html',
  styleUrls: ['./common-toast.component.scss']
})
export class CommonToastComponent extends ToastComponent {

  @Input() closeButton = true;
  @Input() title = '';

  constructor(
    public override hostElement: ElementRef,
    public override renderer: Renderer2,
    public override toasterService: ToasterService,
    public override changeDetectorRef: ChangeDetectorRef
  ) {
    super(hostElement, renderer, toasterService, changeDetectorRef);
  }

}
