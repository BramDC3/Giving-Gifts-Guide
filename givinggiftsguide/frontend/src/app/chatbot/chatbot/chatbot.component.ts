import { Component, OnInit } from '@angular/core';
import { Message } from '../models';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  public message : Message;
  public messages : Message[];
  
  constructor() {
    this.message = new Message('', 'assets/images/user.png');
    this.messages = [
      new Message('Welcome! I am Guido, the Gift Giving Guide. For the moment I can only speak English.', 'assets/images/bot.png', new Date())
    ];
  }

}
