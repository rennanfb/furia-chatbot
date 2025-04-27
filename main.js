import { ChatBot } from './chatbot.js';

async function main() {
    const bot = new ChatBot("FuriaChatBot");
    bot.showIntroduction();
    bot.showOptions();
}

main();