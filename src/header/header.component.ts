import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMountainSun, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';
import { ToggleSwitchChangeEvent, ToggleSwitchModule } from 'primeng/toggleswitch';
import { ThemeService } from '../app/theme.service';
import { LocalStorageService } from '../local-storage.service';
import { SelectButtonModule } from 'primeng/selectbutton';
import { Theme } from '../enums/Theme';
import { INavigation } from '../app/interfaces/INavigation';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { takeLast } from 'rxjs';
import { IPaymentOption } from '../app/interfaces/IPaymentOption';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, FontAwesomeModule, ToggleSwitchModule, FormsModule, SelectButtonModule, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

  themeService: ThemeService = inject(ThemeService);
  localStorageService: LocalStorageService = inject(LocalStorageService);

  value: Theme = this.localStorageService.getKey('preset') ?? Theme.AURA;
  checked: boolean = this.localStorageService.getKey('dark') ? true : false;
  faMountainSun: IconDefinition = faMountainSun;

  paymentOptions: IPaymentOption[] = [
    { value: Theme.NORA, name: 'Nora' },
    { value: Theme.AURA, name: 'Aura' },
    { value: Theme.LARA, name: 'Lara' },
  ];
  con = 'ddas'

  constructor() {
    console.log(this.con);
    
    const con = JSON.stringify(this.con)
    console.log(con);
    
  }

  navigations: INavigation[] = [
    {
      link: '',
      navigation: 'Главная'
    },
    {
      link: 'users',
      navigation: 'Пользователи'
    }
  ]

  toggleDarkMode(): void {
    this.localStorageService.getKey('dark') ? this.localStorageService.addKey('dark', true) : this.localStorageService.clearKey('dark');
  }

  toggleTheme(): void {
    this.themeService.toggleTheme(this.value);
  }

  toggleMode(event: ToggleSwitchChangeEvent): void {
    this.themeService.toggleDarkMode(event.checked); 
  }

}

