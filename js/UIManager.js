export class UIManager {
    constructor(chatBoxId, buttonContainerId) {
        this.chatBox = document.getElementById(chatBoxId);
        this.buttonContainer = document.getElementById(buttonContainerId);
    }

    displayBotMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        messageElement.classList.add('bot-message');
        this.chatBox.appendChild(messageElement);
        this.scrollToBottom();
    }

    displayUserMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        messageElement.classList.add('user-message');
        this.chatBox.appendChild(messageElement);
        this.scrollToBottom();
    }

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

    clearButtons() {
        this.buttonContainer.innerHTML = '';
    }

    clearMessages() {
        this.chatBox.innerHTML = '';
    }

    scrollToBottom() {
        setTimeout(() => {
            this.chatBox.scrollTop = this.chatBox.scrollHeight;
        }, 5); 
    }
}
