import { ConversationManager } from './ConversationManager.js';

// Main function to start the conversation management process
async function main() {
    // Creating an instance of the ConversationManager class
    const conversationManager = new ConversationManager();

    // Calling the displayIntro method to show the introduction of the conversation
    conversationManager.displayIntro();

    // Initializing the conversation manager
    conversationManager.initialize();
}

// Calling the main function to start the process
main();
