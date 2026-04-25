import { Component } from '@angular/core';
import { IMessage } from '../app/interfaces/IMessage';
import { Message } from '../enums/Message';

@Component({
  selector: 'app-message',
  imports: [],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent {

  messages: IMessage[] = [];
  message: typeof Message = Message;

  private addMessage(type: Message, text: string): void {
    const currentMessage: IMessage = { text: text, type: type };
    this.messages = [currentMessage, ...this.messages];
    

    setTimeout(() => {
      this.closeMessage(currentMessage);
    }, 5000);
  }

  showWarn(): void {
    this.addMessage(this.message.WARN, )
  }

    showError(): void {
    this.addMessage(this.message.WARN, )
  }

    showSuccess(): void {
    this.addMessage(this.message.WARN, )
  }

    showInfo(): void {
    this.addMessage(this.message.WARN, )
  }

  closeMessage(currentMessage: IMessage): void {
    this.messages = this.messages.filter((messageToRemove: IMessage) => messageToRemove !== currentMessage);
  }

}
