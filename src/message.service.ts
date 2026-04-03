import { Injectable } from '@angular/core';
import { Condition } from './enums/Сondition';
import { ICondition } from './app/interfaces/ICondition';

@Injectable()
export class MessageService {
  currentCondition = Condition;
  conditions: ICondition[] = [];

  
  
  addMessage(currentCondition: Condition) {
    this.conditions.push({condition: currentCondition});

    setTimeout(() => {
      this.conditions.shift();
    }, 5000);
  }

  closeButton(index: number) {
    this.conditions.splice(index, 1);
  }
}
