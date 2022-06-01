import { useEffect, useState } from 'react';
import { getLastMessage } from '../../services/chatService';
import { constructID } from '../../services/helpers';
import styles from './Contact.module.css';

export default function Contact({
    contact,
    startChatWithUser,
    db,
    user
}) {

    let [lastMessage, setLastMessage] = useState({});

    useEffect(() => {
        let chatID = constructID(user, contact)
        getLastMessage(db,chatID)
            .then(message => {
                if (Object.keys(message).length > 0) {
                    if (message.type === 'image') {
                        message.message = 'Shared an image.'
                    }
                    setLastMessage(message);
                }

            })
    }, [])

    return (
        <div onClick={() => {startChatWithUser(contact)}} className={[styles.card, styles.borderBottom].join(' ')}>
            <div className={styles.imgContainer}>
                <img className={styles.img} src={contact.photoURL} alt="" />
                {contact.isOnline ? <div className={styles.isOnline}></div> : ''}
            </div>
            <div className={styles.userDetails}>
                <p className={styles.username}>{contact.displayName}</p>
                <p className={styles.lastMessage}>{Object.keys(lastMessage).length > 0 ? lastMessage.message : ''}</p>
            </div>
            <div className={styles.lastMessageTimeContainer}>
                <p className={styles.lastMessageTime}>{Object.keys(lastMessage).length > 0 ? lastMessage.time : ''}</p>
            </div>
        </div>
    )
}