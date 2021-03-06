import styles from './ChatMessage.module.css';

export default function ChatMessage({
    message,
    user,
    otherUser
}) {
    let guestMessage;
    let ownerMessage
    if (message.type === 'image') {
        guestMessage = (
            <div className={styles.containerGuest}>
                <div className={styles.imageAndTime}>
                    <div className={styles.imageContainer}>
                        <img className={styles.image} src={otherUser.photoURL} alt="" />
                    </div>
                    <p className={styles.time}>{message.time}</p>
        
                </div>
                <div className={styles.messageImageContainer}>
                    <img className={styles.messageImage} src={message.url} alt="" />
                </div>
            </div>
            )
        
        ownerMessage = (
            <div className={styles.container}>
                <div className={styles.messageImageContainer}>
                    <img className={styles.messageImage} src={message.url} alt="" />
                </div>
                <div className={styles.imageAndTime}>
                    <div className={styles.imageContainer}>
                        <img className={styles.image} src={user.photoURL} alt="" />
                    </div>
                    <p className={styles.time}>{message.time}</p>
                </div>
            </div>
        )
    } else {
        guestMessage = (
            <div className={styles.containerGuest}>
                <div className={styles.imageAndTime}>
                    <div className={styles.imageContainer}>
                        <img className={styles.image} src={otherUser.photoURL} alt="" />
                    </div>
                    <p className={styles.time}>{message.time}</p>
        
                </div>
                <div className={styles.messageContainer}>
                    <p className={styles.message}>{message.message}</p>
                </div>
            </div>
            )
        
        ownerMessage = (
            <div className={styles.container}>
                <div className={styles.messageContainerOwner}>
                    <p className={styles.message}>{message.message}</p>
                </div>
                <div className={styles.imageAndTime}>
                    <div className={styles.imageContainer}>
                        <img className={styles.image} src={user.photoURL} alt="" />
                    </div>
                    <p className={styles.time}>{message.time}</p>
                </div>
            </div>
        )
    }

    return user.email === message.owner ? ownerMessage : guestMessage

} 