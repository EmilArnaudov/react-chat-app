import { useState } from 'react';
import styles from './ChatInput.module.css';
import { uploadImageAndGetDownloadUrl } from '../../../services/chatService';

export default function ChatInput({
    showEmojiClickHandler,
    sendMessage,
    storageContainer
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

    async function uploadImage(e) {
        let url = await uploadImageAndGetDownloadUrl(storageContainer, e.target.files[0]);
        sendMessage(url, 'image')
        console.log(url);
    }

    return (
        <form onSubmit={sendMessageHandler}>
        <div className={styles.container}>
            <i onClick={showEmojiClickHandler} className={["fa-solid", "fa-face-smile", styles.smile].join(' ')}></i>
            <input onChange={uploadImage} className={styles.file} name='file' id='file' type="file" />
            <label htmlFor="file"><i className={["fa-solid", "fa-paperclip", styles.paperclip].join(' ')}></i></label>
                <input value={message} onChange={onChangeHandler} className={styles.input} type="text" placeholder='Type a message' />
                <span onClick={sendMessage} className={styles.sendIcon}><i className={["fa-solid", "fa-paper-plane"].join(' ')}></i></span>
        </div>
        </form>
    )
}