import { useState } from 'react';
import { sendChatMessage } from '../../services/chatService';
import { formatLastSeen } from '../../services/helpers';
import styles from './Chat.module.css';

import ChatInput from './chatInput/ChatInput';
import ChatMessage from './chatMessage/ChatMessage';
import EmojiPicker from './emojiPicker/EmojiPicker';

export default function Chat({
    chat,
    db,
    user,
    otherUser
}) {

    let [showEmoji, setShowEmoji] = useState(false);

    if (Object.keys(chat).length === 0) {
        return (
            <div className={styles.container}>
                <p className={styles.noChat}>No chats available..</p>
            </div>
        )
    }

    let sortedMessages = [];
    chat.messages.forEach(message => sortedMessages.unshift(message));

    function showEmojiClickHandler() {
        setShowEmoji(!showEmoji);
    }

    function sendMessage(message) {
        sendChatMessage(db, chat, message, user.email);
    }

    return (
        <div className={styles.container}>
            <div className={styles.otherUser}>
                <p className={styles.otherName}>{otherUser.displayName}</p>
                <p className={styles.lastSeen}>{otherUser.isOnline ? <span className={styles.isOnline}>Online</span> : `Last seen ${formatLastSeen(otherUser.lastSeen)} ago`}</p>
            </div>
            <div className={styles.chatMessages}>
                {sortedMessages.map(message => <ChatMessage otherUser={otherUser} key={message.message + Date.now()} user={user} message={message}></ChatMessage>)}
            </div>
            {showEmoji ? <EmojiPicker onChange={(e) => {console.log(e.target)}} ></EmojiPicker> : ''}
            <ChatInput sendMessage={sendMessage} showEmojiClickHandler={showEmojiClickHandler}></ChatInput>
        </div>
    )
}