import { Component, Input } from '@angular/core';

// Define interface for User data
export interface User {
  name: string; // User's name
}

@Component({
  selector: 'app-avatar', // Component selector
  templateUrl: './avatar.component.html', // HTML template for the component
  styleUrls: ['./avatar.component.scss'] // Styles for the component
})
export class AppAvatarComponent {
  @Input() user !: User; // Input property to receive User data
}
