import { chatExists } from '../../../../services/chatService';
import styles from './SearchedUser.module.css';

export default function SearchedUser({
    user,
    startChatWithUser,
    userSelected,
}) {

    function clickHandler() {
        startChatWithUser(user);
        userSelected();
    }

    return (
        <div onClick={clickHandler} className={styles.container}>
            <div className={styles.imgContainer}>
                <img className={styles.img} src={user.photoURL} alt="" />
            </div>
            <div className={styles.userDetails}>
                <p className={styles.username}>{user.displayName}</p>
                <p className={styles.lastMessage}>{user.email}</p>
            </div>
        </div>
    )
}