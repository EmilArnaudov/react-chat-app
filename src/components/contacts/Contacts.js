import styles from './Contacts.module.css';
import Contact from '../contact/Contact';

export default function Contacts({
    contacts,
    startChatWithUser,
}) {
    return (
        <div className={styles.container}>
            {contacts.map(contact => <Contact startChatWithUser={startChatWithUser} key={contact.email} contact={contact}></Contact>)}
        </div>
    )
}