import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

interface Menssage {
  text: string;
  isBot?: boolean;
}

@Component({
  selector: 'app-simple-chat',
  imports: [
    MatCardModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    NgClass,
  ],
  templateUrl: './simple-chat.html',
  styleUrl: './simple-chat.scss',
})
export class SimpleChat {
  userInput = '';

  menssages = signal<Menssage[]>([{ text: 'Hello! How can I help you today?', isBot: true }]);

  sendMessage() {
    this.trimUserMessage();
    if (this.userInput !== '') {
      this.updateMenssages(this.userInput, false);
      this.userInput = '';
      this.simulateResponse();
    }
  }

  private updateMenssages(text: string, isBot: boolean) {
    this.menssages.update((menssages) => [...menssages, { text, isBot }]);
  }

  private trimUserMessage() {
    this.userInput = this.userInput.trim();
  }

  private simulateResponse() {
    setTimeout(() => {
      const response = 'This is a simulated response from the bot.';
      this.updateMenssages(response, true);
    }, 2000);
  }
}
