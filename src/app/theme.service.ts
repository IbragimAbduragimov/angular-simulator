import { AfterViewInit, inject, Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject, tap } from 'rxjs';
import { LocalStorageService } from '../local-storage.service';
import { Theme } from '../enums/Theme';
import { updatePreset, usePreset } from '@primeuix/styled';
import Lara from '@primeuix/themes/lara'
import Aura from '@primeuix/themes/aura'
import Nora from '@primeuix/themes/nora'
import { Preset } from '@primeuix/themes/types';
import { IPresetOption } from './interfaces/IPreset';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {

  localStorageService: LocalStorageService = inject(LocalStorageService);

  presetOptions: IPresetOption[] = [
    { 
      name: "Aura",  
      value: Aura,
    },
    { 
      name: "Lara",  
      value: Lara, 
    },
    { 
      name: "Nora",  
      value: Nora,
    }
  ];

  private isDarkSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.localStorageService.getKey<boolean>('dark') ?? false);
  isDark$: Observable<boolean> = this.isDarkSubject.asObservable()
    .pipe(
      tap((isDark: boolean) => { 
        if (isDark) { 
          document.documentElement.classList.add('my-app-dark');
        } else {
            document.documentElement.classList.remove('my-app-dark');
          }
      })
    );

  private presetSubject: BehaviorSubject<Preset> = new BehaviorSubject<Preset>(this.localStorageService.getKey<Preset>('preset') ?? {});
  preset$: Observable<Preset> = this.presetSubject.asObservable();

  getDarkMode(): boolean {
    return this.isDarkSubject.getValue();
  }

  toggleDarkMode(isDarkMode: boolean): void { 
    this.isDarkSubject.next(isDarkMode);
    !this.localStorageService.getKey('dark') ? this.localStorageService.addKey('dark', isDarkMode) : this.localStorageService.addKey('dark', false)
  }

  getPreset(): Preset {
    return this.presetSubject.getValue();
  }

  toggleTheme(value: Theme): void {
    const fountTheme: IPresetOption = this.presetOptions.find((currentTheme) => currentTheme.name == value)!;
    usePreset(fountTheme.value);
    this.localStorageService.addKey('preset', fountTheme.name);
  }

}






