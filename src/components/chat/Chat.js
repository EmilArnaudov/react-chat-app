import styles from './Chat.module.css';

import ChatInput from './chatInput/ChatInput';
import ChatMessage from './chatMessage/ChatMessage';

export default function Chat() {
    return (
        <div className={styles.container}>
            <div className={styles.chatMessages}>
                <ChatMessage></ChatMessage>
            </div>
            <ChatInput></ChatInput>
        </div>
    )
}