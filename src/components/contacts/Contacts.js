import styles from './Contacts.module.css';

import Contact from '../contact/Contact';

export default function Contacts() {
    return (
        <div className={styles.container}>
            <Contact></Contact>
            <Contact></Contact>
            <Contact></Contact>
            <Contact></Contact>
            <Contact></Contact>
            <Contact></Contact>
            <Contact></Contact>
        </div>
    )
}