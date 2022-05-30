import styles from './Contacts.module.css';
import Contact from '../contact/Contact';

export default function Contacts({
    contacts
}) {
    return (
        <div className={styles.container}>
            {contacts.map(contact => <Contact key={contact.email} contact={contact}></Contact>)}
        </div>
    )
}