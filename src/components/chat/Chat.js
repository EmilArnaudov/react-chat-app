import { useState } from 'react';
import styles from './Chat.module.css';

import ChatInput from './chatInput/ChatInput';
import ChatMessage from './chatMessage/ChatMessage';
import EmojiPicker from './emojiPicker/EmojiPicker';

export default function Chat() {

    let [showEmoji, setShowEmoji] = useState(false);

    function showEmojiClickHandler() {
        setShowEmoji(!showEmoji);
    }

    return (
        <div className={styles.container}>
            <div className={styles.chatMessages}>
                <ChatMessage></ChatMessage>
                <ChatMessage></ChatMessage>
                <ChatMessage></ChatMessage>
                <ChatMessage></ChatMessage>
            </div>
            {showEmoji ? <EmojiPicker onChange={(e) => {console.log(e.target)}} ></EmojiPicker> : ''}
            <ChatInput showEmojiClickHandler={showEmojiClickHandler}></ChatInput>
        </div>
    )
}