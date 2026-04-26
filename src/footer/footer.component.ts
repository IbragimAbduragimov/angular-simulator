import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
   
    businessServices: { service: string }[] = [
      {
        service: 'Прогулки в горы летом'
      },
          {
        service: 'Зимние походы в горы'
      },
          {
        service: 'Посещение мест в горах'
      },
          {
        service: 'Экстремальные виды туризма'
      },
          {
        service: 'Походы в джунглях Амазонии'
      },
          {
        service: 'Поездка в Африку'
      },
    ]
  
    articles: { important: string }[] = [
      {
        important: 'Как собрать в долгий поход?'
      },
          {
        important: 'Жизненно важные предметы для похода'
      },
          {
        important: 'Медицинская страховка, гарантии безопасности'
      },
          {
        important: 'Если вы врач - загляните сюда'
      }
    ]
    
  }
