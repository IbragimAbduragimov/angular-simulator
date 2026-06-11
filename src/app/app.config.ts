import { APP_INITIALIZER, ApplicationConfig, inject, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import Lara from '@primeuix/themes/lara'
import Aura from '@primeuix/themes/aura'
import Nora from '@primeuix/themes/nora'
import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import { ThemeService } from './theme.service';
import { Preset } from '@primeuix/themes/types';
import { IPresetOption } from './interfaces/IPreset';
import { Theme } from '../enums/Theme';

    function putPreset () {
      const preset: string | null = localStorage.getItem('preset');
      const isTrue: string | null = preset ? JSON.parse(preset) : null;

      const complianceCard: Preset<Preset> = {
        [Theme.AURA]: Aura,
        [Theme.LARA]: Lara,
        [Theme.NORA]: Nora,
      }
      return (isTrue && (complianceCard as any)[isTrue] ) ? (complianceCard as any)[isTrue] : Aura;
    }

export const appConfig: ApplicationConfig = {
  
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideZoneChangeDetection(),
    providePrimeNG({
      theme: {
        preset: putPreset(),
        options: {
          darkModeSelector: '.my-app-dark',
        }
      },
    })
  ],

};
