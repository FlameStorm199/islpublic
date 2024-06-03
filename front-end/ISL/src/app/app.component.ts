import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ISL';
  public currentRoute: string = "";

  constructor(private router: Router){
     router.events.pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe(((event: { url: string; }) => 
        {
            this.currentRoute = event.url;          
        }));
  }
}
