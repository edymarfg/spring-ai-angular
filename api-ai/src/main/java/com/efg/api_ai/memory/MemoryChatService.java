package com.efg.api_ai.memory;

import jakarta.validation.constraints.NotNull;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.MessageChatMemoryAdvisor;
import org.springframework.ai.chat.memory.ChatMemory;
import org.springframework.ai.chat.memory.InMemoryChatMemoryRepository;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class MemoryChatService {

    private final ChatClient chatClient;

    public MemoryChatService(@NotNull ChatClient.Builder chatClientBuilder, ChatMemory chatMemory) {
        this.chatClient = chatClientBuilder
                .defaultAdvisors(
                        MessageChatMemoryAdvisor.builder(chatMemory).build()
                )
                .build();

        InMemoryChatMemoryRepository a;
    }

    public String simpleChat(String message) {
        return this.chatClient.prompt()
                .user(message)
                .call()
                .content();
    }
}
