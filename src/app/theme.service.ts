import { AfterViewInit, inject, Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
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

    presetOption: IPresetOption[] = [
    { 
      name: "aura",  
      value: Aura,
    },
    { 
      name: "lara",  
      value: Lara, 
    },
    { 
      name: "nora",  
      value: Nora,
    }
  ]



  isDarkSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.localStorageService.getKey('dark') ?? false);
  isDark$: Observable<boolean> = this.isDarkSubject.asObservable();

  private presetSubject: BehaviorSubject<Preset> = new BehaviorSubject<Preset>(this.localStorageService.getKey<Preset>('preset') ?? {});
  preset$: Observable<Preset> = this.presetSubject.asObservable();

  constructor() {
    const isDark: boolean = this.getDarkMode();
    document.documentElement.classList.toggle('my-app-dark', isDark);

    this.setTheme();
  }

  getDarkMode(): boolean {
    return this.isDarkSubject.getValue();
  }

  getPreset() {
    return this.presetSubject.getValue();
  }
  
  setTheme() {
    const theme: string | null = this.localStorageService.getKey('preset');

    if (theme) {
      const fountTheme = this.presetOption.find((currentTheme: IPresetOption) => currentTheme.name == theme);

      if (fountTheme) {
        this.presetSubject.next(fountTheme.value);
        usePreset(fountTheme.value);
      }
    } else {
      usePreset(Aura);
    }
  }

  
  toggleTheme(value: string) {
    if (value === Theme.AURA) {
      usePreset(Aura);
      this.localStorageService.addKey('preset', Theme.AURA);
    }
    if (value === Theme.LARA) {
      usePreset(Lara);
      this.localStorageService.addKey('preset', Theme.LARA);
    }
    if (value === Theme.NORA) {
      usePreset(Nora);
      this.localStorageService.addKey('preset', Theme.NORA);
    }
  }

}






