import styles from './Contact.module.css';

export default function Contact() {
    return (
        <div className={[styles.card, styles.borderBottom].join(' ')}>
            <div className={styles.imgContainer}>
                <img className={styles.img} src="http://www.someguy.be/images/Steven.jpg" alt="" />
            </div>
            <div className={styles.userDetails}>
                <p className={styles.username}>TheUsername</p>
                <p className={styles.lastMessage}>I was about to call you but</p>
            </div>
            <div className={styles.lastMessageTimeContainer}>
                <p className={styles.lastMessageTime}>19:00</p>
            </div>
        </div>
    )
}