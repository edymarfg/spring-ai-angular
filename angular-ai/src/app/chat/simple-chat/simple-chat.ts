import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { ChatService } from '../chat-service';
import { catchError, throwError } from 'rxjs';

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
  @ViewChild('chatHistory')
  private chatHistory!: ElementRef;

  private chatService = inject(ChatService);

  userInput = '';
  isLoading = false;

  local = false;

  menssages = signal<Menssage[]>([{ text: 'Hello! How can I help you today?', isBot: true }]);

  sendMessage() {
    this.trimUserMessage();
    if (this.userInput !== '' && !this.isLoading) {
      this.isLoading = true;
      this.updateMenssages(this.userInput, false);
      if (this.local) {
        this.simulateResponse();
      } else {
        this.sendChatMessage();
      }
    }
  }

  private sendChatMessage() {
    this.chatService
      .sendChatMessage(this.userInput)
      .pipe(
        catchError((error) => {
          console.error('Error sending chat message:', error);
          this.updateMenssages(
            'Sorry, there was an error processing your request. Please try again later.',
            true,
          );
          this.isLoading = false;
          return throwError(() => new Error('Error sending chat message'));
        }),
      )
      .subscribe((response) => {
        this.userInput = '';
        this.updateMenssages(response.message, true);
        this.isLoading = false;
      });
  }

  private updateMenssages(text: string, isBot: boolean) {
    this.menssages.update((menssages) => [...menssages, { text, isBot }]);
    this.scheduleScrollToBottom();
  }

  private scheduleScrollToBottom() {
    setTimeout(() => this.scrollToBottom(), 0);
  }

  private trimUserMessage() {
    this.userInput = this.userInput.trim();
  }

  private simulateResponse() {
    setTimeout(() => {
      const response = 'This is a simulated response from the bot.';
      this.updateMenssages(response, true);
      this.userInput = '';
      this.isLoading = false;
    }, 2000);
  }

  private scrollToBottom() {
    try {
      if (this.chatHistory) {
        const chatHistoryElement = this.chatHistory.nativeElement;
        chatHistoryElement.scrollTop = chatHistoryElement.scrollHeight;
      }
    } catch (err) {
      console.error('Error scrolling to bottom:', err);
    }
  }
}
