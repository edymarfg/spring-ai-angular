import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { ChatResponse } from './chat-response';

@Service()
export class ChatService {
  private readonly API = '/api/chat-memory';

  private http = inject(HttpClient);

  sendChatMessage(message: string) {
    return this.http.post<ChatResponse>(this.API, { message });
  }
}
