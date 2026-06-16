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
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, FontAwesomeModule, ToggleSwitchModule, FormsModule, SelectButtonModule, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

  themeService: ThemeService = inject(ThemeService);
  localStorageService: LocalStorageService = inject(LocalStorageService);

  faMountainSun: IconDefinition = faMountainSun;

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

  toggleMode(event: ToggleSwitchChangeEvent): void {
    this.themeService.toggleDarkMode(event.checked); 
  }

  toggleTheme(value: Theme): void {
    this.themeService.switchTheme(value);
  }

}

