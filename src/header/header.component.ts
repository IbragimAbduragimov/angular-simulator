import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMountainSun, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { ThemeService } from '../app/theme.service';
import { LocalStorageService } from '../local-storage.service';
import { SelectButtonModule } from 'primeng/selectbutton';
import { Theme } from '../enums/Theme';
import { INavigation } from '../app/interfaces/INavigation';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, FontAwesomeModule, ToggleSwitchModule, FormsModule, SelectButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

  themeService: ThemeService = inject(ThemeService);
  localStorageService: LocalStorageService = inject(LocalStorageService);

  value: Theme = this.localStorageService.getKey('preset') ?? Theme.AURA;
  checked: boolean = this.localStorageService.getKey('dark') ? true : false;
  faMountainSun: IconDefinition = faMountainSun;

  paymentOptions: any[] = [
    {label: 'Nora', value: Theme.NORA, name: 'Nora'},
    {label: 'Aura', value: Theme.AURA, name: 'Aura'},
    {label: ' Lara', value: Theme.LARA, name: 'Lara'},
  ];
  

  constructor() {
    this.themeService.isDark$.subscribe();
  }


  navigations: INavigation[] = [
    {
      routerLink: '',
      text: 'Главная'
    },
    {
      routerLink: 'users',
      text: 'Пользователи'
    }
  ]

  toggleDarkMode(): void {
    const element = document.querySelector('html');
    element?.classList.toggle('my-app-dark');
    this.checked ? this.localStorageService.addKey('dark', true) : this.localStorageService.clearKey('dark');
  }

  toggleTheme(): void {
    this.themeService.toggleTheme(this.value);
  }

}

