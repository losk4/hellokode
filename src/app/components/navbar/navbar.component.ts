import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  query!: string;

  constructor(private router: Router) {}
  
  searchMovies() {
    this.router.navigate(['/search'], { queryParams: { query: this.query }});
  }

}
