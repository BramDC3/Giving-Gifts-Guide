import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../../models';
import { DialogflowService } from '../../services';

@Component({
  selector: 'message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.css']
})
export class MessageFormComponent implements OnInit {

  @Input('message')
  public message: Message;

  @Input('messages')
  public messages: Message[];

  constructor(private dialogFlowService: DialogflowService) { }

  ngOnInit() {
  }

  public sendMessage(): void {
    if (this.message.content && this.message.content !== "") {
      this.message.timestamp = new Date();
      this.messages.push(this.message);

      this.dialogFlowService.getResponse(this.message.content).subscribe(res => {
        this.messages.push(
          new Message(res.result.fulfillment.speech, 'assets/images/bot.png', res.timestamp)
        );
      });

      this.message = new Message('', 'assets/images/user.png');
    }
  }

}
