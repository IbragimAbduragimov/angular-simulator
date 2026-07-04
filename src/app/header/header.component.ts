import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMountainSun, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';
import { ToggleSwitchChangeEvent, ToggleSwitchModule } from 'primeng/toggleswitch';
import { ThemeService } from '../theme.service';
import { LocalStorageService } from '../../local-storage.service';
import { SelectButtonModule } from 'primeng/selectbutton';
import { Theme } from '../../enums/Theme';
import { INavigation } from '../interfaces/INavigation';
import { AsyncPipe } from '@angular/common';
import { AuthService } from '../features/auth/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, FontAwesomeModule, ToggleSwitchModule, FormsModule, SelectButtonModule, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

  themeService: ThemeService = inject(ThemeService);
  localStorageService: LocalStorageService = inject(LocalStorageService);
  authService: AuthService = inject(AuthService);


  isLogin: boolean = !!this.authService.getUser();
  faMountainSun: IconDefinition = faMountainSun;

  navigations: INavigation[] = [
    {
      link: '',
      navigation: 'Главная'
    },
    {
      link: 'users',
      navigation: 'Пользователи'
    },
    {
      link: 'posts',
      navigation: 'пользователи'
    },
    {
      link: 'login',
      navigation: 'аунтификация'
    }
  ]

  toggleMode(event: ToggleSwitchChangeEvent): void {
    this.themeService.toggleDarkMode(event.checked); 
  }

  toggleTheme(value: Theme): void {
    this.themeService.switchTheme(value);
  }

  logout(): void {
    const isReady: boolean = confirm("Вы уверены, что хотите выйти из аккаунта?");
    if (isReady) {
      this.authService.logout();
    }
  }

}

