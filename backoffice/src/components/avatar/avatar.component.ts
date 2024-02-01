import {Component, Input} from '@angular/core';

export interface User {
  name: string,
  path: string
}

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AppAvatarComponent {
  @Input() user !: User;
}
