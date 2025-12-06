import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'join-angular';

  isIOS = false;

  constructor() {
    this.isIOS = this.checkIOS();
    this.setHeight(window.screen.height);
  }

  checkIOS() {
    const platform = (navigator as any).userAgentData?.platform || navigator.platform;
    return platform.startsWith("iP") || platform.startsWith("Mac") && navigator.maxTouchPoints > 4;
  }

  setHeight(innerHeight: number) {
    if (this.isIOS) {
      document.documentElement.style.setProperty('--vh100', `${innerHeight - 49}px`); 
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.setHeight((event.target as Window).screen.height);
  }
  
}
