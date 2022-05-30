import styles from './ChatInput.module.css';

export default function ChatInput({
    showEmojiClickHandler
}) {
    return (
        <div className={styles.container}>
            <i onClick={showEmojiClickHandler} className={["fa-solid", "fa-face-smile", styles.smile].join(' ')}></i>
            <i className={["fa-solid", "fa-paperclip", styles.paperclip].join(' ')}></i>
            <input className={styles.input} type="text" placeholder='Type a message' />
            <span className={styles.sendIcon}><i className={["fa-solid", "fa-paper-plane"].join(' ')}></i></span>
        </div>
    )
}