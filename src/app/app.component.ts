import { Component } from '@angular/core';
import './training.ts';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-simulator';

  companyName: string = 'Р У М Т И Б Е Т';
}