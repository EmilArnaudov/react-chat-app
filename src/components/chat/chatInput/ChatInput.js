import { useState } from 'react';
import styles from './ChatInput.module.css';

export default function ChatInput({
    showEmojiClickHandler,
    sendMessage
}) {

    let [message, setMessage] = useState('');

    function onChangeHandler(e) {
        setMessage(e.target.value);
    }

    function sendMessageHandler(e) {
        e.preventDefault();
        sendMessage(message);
        setMessage('');
    }

    return (
        <form onSubmit={sendMessageHandler}>
        <div className={styles.container}>
            <i onClick={showEmojiClickHandler} className={["fa-solid", "fa-face-smile", styles.smile].join(' ')}></i>
            <i className={["fa-solid", "fa-paperclip", styles.paperclip].join(' ')}></i>
                <input value={message} onChange={onChangeHandler} className={styles.input} type="text" placeholder='Type a message' />
                <span onClick={sendMessage} className={styles.sendIcon}><i className={["fa-solid", "fa-paper-plane"].join(' ')}></i></span>
        </div>
        </form>
    )
}