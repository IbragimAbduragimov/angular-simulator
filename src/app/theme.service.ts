import { AfterViewInit, inject, Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, Observable, ReplaySubject, Subject, tap } from 'rxjs';
import { LocalStorageService } from '../local-storage.service';
import { Theme } from '../enums/Theme';
import { updatePreset, usePreset } from '@primeuix/styled';
import Lara from '@primeuix/themes/lara'
import Aura from '@primeuix/themes/aura'
import Nora from '@primeuix/themes/nora'
import { Preset } from '@primeuix/themes/types';
import { IPresetOption } from './interfaces/IPresetOption';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {

  localStorageService: LocalStorageService = inject(LocalStorageService);

  presetOptions: IPresetOption[] = [
    { value: Theme.NORA, preset: Nora },
    { value: Theme.AURA, preset: Aura },
    { value: Theme.LARA, preset: Lara },
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

  private presetSubject: BehaviorSubject<Theme> = new BehaviorSubject(this.localStorageService.getKey('preset') ?? {});
  preset$: Observable<Theme> = this.presetSubject.asObservable().pipe(
    distinctUntilChanged(),
    tap((newTheme: Theme) => {
      this.setTheme(newTheme);
    })
  );

  toggleDarkMode(isDarkMode: boolean): void { 
    this.isDarkSubject.next(isDarkMode);
    !this.localStorageService.getKey('dark') ? this.localStorageService.addKey('dark', isDarkMode) : this.localStorageService.addKey('dark', false)
  }

  switchTheme(newTheme: Theme): void {
    this.presetSubject.next(newTheme);
  }

  setTheme(newTheme: Theme): void {
    const themes: IPresetOption = this.presetOptions.find((preset: IPresetOption) => preset.value === newTheme)!;
    if (themes) {
      usePreset(themes.preset);
    };
    this.localStorageService.addKey('preset', newTheme);
  }

}