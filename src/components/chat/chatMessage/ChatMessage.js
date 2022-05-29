import styles from './ChatMessage.module.css';

export default function ChatMessage() {
    return (
        <div className={styles.container}>
            <div className={styles.imageAndTime}>
                <div className={styles.imageContainer}>
                    <img className={styles.image} src="https://data.whicdn.com/images/342481594/original.jpg" alt="" />
                </div>
                <p className={styles.time}>09:00</p>

            </div>
            <div className={styles.messageContainer}>
                <p className={styles.message}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur obcaecati voluptatum, provident esse consectetur mollitia!</p>
            </div>
        </div>

    )
} 