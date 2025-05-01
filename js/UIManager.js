export class UIManager {
    // Creates an instance of UIManager.
    constructor(chatBoxId, buttonContainerId) {
        this.chatBox = document.getElementById(chatBoxId);
        this.buttonContainer = document.getElementById(buttonContainerId);
    }

    // Displays a bot message in the chat box
    displayBotMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        messageElement.classList.add('bot-message');
        this.chatBox.appendChild(messageElement);
        this.scrollToBottom();
    }

    // Displays a user message in the chat box
    displayUserMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        messageElement.classList.add('user-message');
        this.chatBox.appendChild(messageElement);
        this.scrollToBottom();
    }

    // Creates buttons based on the provided options and attaches a callback for button clicks
    createButtons(options, callback) {
        this.clearButtons();
        options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option.text;
            button.classList.add('button-option');
            button.addEventListener('click', () => callback(option.value));
            this.buttonContainer.appendChild(button);
        });
    }

    // Clears all buttons from the button container
    clearButtons() {
        this.buttonContainer.innerHTML = '';
    }

    // Clears all messages from the chat box
    clearMessages() {
        this.chatBox.innerHTML = '';
    }

    //Scrolls the chat box to the bottom
    scrollToBottom() {
        // Small delay to ensure the new message is visible after being appended
        setTimeout(() => {
            this.chatBox.scrollTop = this.chatBox.scrollHeight;
        }, 5); 
    }
}
