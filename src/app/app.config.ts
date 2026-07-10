import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import Lara from '@primeuix/themes/lara';
import Aura from '@primeuix/themes/aura';
import Nora from '@primeuix/themes/nora';
import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import { Preset } from '@primeuix/themes/types';
import { Theme } from '../enums/Theme';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { errorInterceptor } from './error.interceptor';
import { httpLogInterceptor } from './http-log.interceptor';
import { AuthService } from './features/auth/auth.service';
import { authInterceptor } from './features/auth/auth.interceptor';

function getPreset(): string | number | object {
  const preset: string | null = localStorage.getItem('preset') ?? 'Aura';
  const complianceCard: Preset<Preset> = {
    [Theme.AURA]: Aura,
    [Theme.LARA]: Lara,
    [Theme.NORA]: Nora,
  };
  return preset && complianceCard[preset] ? complianceCard[preset] : Aura;
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideZoneChangeDetection(),
    provideHttpClient(withInterceptors([authInterceptor, errorInterceptor, httpLogInterceptor])),
    providePrimeNG({
      theme: {
        preset: getPreset(),
        options: {
          darkModeSelector: '.my-app-dark',
        },
      },
    }),
    provideAppInitializer(() => {
      const authService: AuthService = inject(AuthService);
      return authService.initialize();
    }),
  ],
};
