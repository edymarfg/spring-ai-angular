package com.efg.api_ai.controller;

import com.efg.api_ai.controller.record.ChatMessage;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.constraints.NotNull;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    private final ChatClient chatClient;

    public ChatController(@NotNull ChatClient.Builder chatClientBuilder) {
        this.chatClient = chatClientBuilder.build();
    }

    @PostMapping
    ChatMessage simpleChat(@RequestBody ChatMessage message) {
        var response = this.chatClient.prompt()
            .user(message.message())
            .call()
            .content();
        return new ChatMessage(response);
    }
}