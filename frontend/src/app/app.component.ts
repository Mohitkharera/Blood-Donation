import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class AppComponent {
  currentRoute: string = '';

  constructor(private router: Router) {
    // Listen to route changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentRoute = event.url;
    });
  }

  shouldShowTabs(): boolean {
    // Get current route from router
    const currentUrl = this.router.url;
    
    // Explicitly hide tabs on get-started and login pages
    if (currentUrl === '/get-started' || 
        currentUrl === '/login' ||
        currentUrl.includes('/get-started') || 
        currentUrl.includes('/login')) {
      return false;
    }
    
    // Show tabs on all other pages
    return true;
  }
}
