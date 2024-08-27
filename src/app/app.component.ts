import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './core/nav/nav.component';

@Component({
  selector: 'bj-root',
  standalone: true,
    imports: [RouterOutlet, NavComponent],
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent {
}
