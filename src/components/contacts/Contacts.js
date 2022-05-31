import styles from './Contacts.module.css';
import Contact from '../contact/Contact';

export default function Contacts({
    contacts,
    startChatWithUser,
    db,
    user,
}) {

    if (contacts.length === 0) {
        return (
        <div className={styles.container}>
            <p className={styles.noPeople}>No contacts found..</p>
        </div>
        )
    }


    return (
        <div className={styles.container}>
            {contacts.map(contact => <Contact startChatWithUser={startChatWithUser} key={contact.email} db={db} user={user} contact={contact}></Contact>)}
        </div>
    )
}