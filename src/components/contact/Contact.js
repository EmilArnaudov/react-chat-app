import styles from './Contact.module.css';

export default function Contact({
    contact,
    startChatWithUser
}) {

    return (
        <div onClick={() => {startChatWithUser(contact)}} className={[styles.card, styles.borderBottom].join(' ')}>
            <div className={styles.imgContainer}>
                <img className={styles.img} src={contact.photoURL} alt="" />
            </div>
            <div className={styles.userDetails}>
                <p className={styles.username}>{contact.displayName}</p>
                <p className={styles.lastMessage}>I was about to call you but</p>
            </div>
            <div className={styles.lastMessageTimeContainer}>
                <p className={styles.lastMessageTime}>19:00</p>
            </div>
        </div>
    )
}