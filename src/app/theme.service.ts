import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, Observable, tap } from 'rxjs';
import { LocalStorageService } from '../local-storage.service';
import { Theme } from '../enums/Theme';
import { usePreset } from '@primeuix/styled';
import Lara from '@primeuix/themes/lara';
import Aura from '@primeuix/themes/aura';
import Nora from '@primeuix/themes/nora';
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

  private isDarkSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    this.localStorageService.getKey<boolean>('dark') ?? false,
  );

  isDark$: Observable<boolean> = this.isDarkSubject.asObservable().pipe(
    tap((isDark: boolean) => {
      if (isDark) {
        document.documentElement.classList.add('my-app-dark');
      } else {
        document.documentElement.classList.remove('my-app-dark');
      }
    }),
  );

  private presetSubject = new BehaviorSubject<Theme>(
    this.localStorageService.getKey('preset') ?? {},
  );

  preset$: Observable<Theme> = this.presetSubject.asObservable().pipe(
    distinctUntilChanged(),
    tap((newTheme: Theme) => {
      this.setTheme(newTheme);
    }),
  );

  toggleDarkMode(isDarkMode: boolean): void {
    this.isDarkSubject.next(isDarkMode);
    if (this.localStorageService.getKey('dark')) {
      this.localStorageService.addKey('dark', isDarkMode);
    } else {
      this.localStorageService.addKey('dark', false);
    }
  }

  switchTheme(newTheme: Theme): void {
    this.presetSubject.next(newTheme);
  }

  setTheme(newTheme: Theme): void {
    const themes: IPresetOption = this.presetOptions.find(
      (preset: IPresetOption) => preset.value === newTheme,
    )!;
    if (themes) {
      usePreset(themes.preset);
    }
    this.localStorageService.addKey('preset', newTheme);
  }
}
