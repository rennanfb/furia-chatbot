import { ConversationManager } from './ConversationManager.js';

async function main() {
    const conversationManager = new ConversationManager();
    conversationManager.showIntroduction();
}

main();