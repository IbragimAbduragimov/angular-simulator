import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faArrowsTurnRight,
  faContactBook,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  imports: [FontAwesomeModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  faArrowsTurnRight: IconDefinition = faArrowsTurnRight;
  faContactBook: IconDefinition = faContactBook;

  businessServices: { service: string }[] = [
    {
      service: 'Прогулки в горы летом',
    },
    {
      service: 'Зимние походы в горы',
    },
    {
      service: 'Посещение мест в горах',
    },
    {
      service: 'Экстремальные виды туризма',
    },
    {
      service: 'Походы в джунглях Амазонии',
    },
    {
      service: 'Поездка в Африку',
    },
  ];

  articles: { important: string }[] = [
    {
      important: 'Как собрать в долгий поход?',
    },
    {
      important: 'Жизненно важные предметы для похода',
    },
    {
      important: 'Медицинская страховка, гарантии безопасности',
    },
    {
      important: 'Если вы врач - загляните сюда',
    },
  ];
}
