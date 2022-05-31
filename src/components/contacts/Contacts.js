import styles from './Contacts.module.css';
import Contact from '../contact/Contact';

export default function Contacts({
    contacts,
    startChatWithUser,
    db,
    user,
}) {
    return (
        <div className={styles.container}>
            {contacts.map(contact => <Contact startChatWithUser={startChatWithUser} key={contact.email} db={db} user={user} contact={contact}></Contact>)}
        </div>
    )
}