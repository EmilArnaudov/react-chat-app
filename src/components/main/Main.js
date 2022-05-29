import styles from './Main.module.css';

import Navigation from "../navigation/Navigation"
import Contacts from '../contacts/Contacts';
import Chat from '../chat/Chat';

export default function Main() {
    return (
        <>
            <header>
                <Navigation></Navigation>
            </header>
            <main className={styles.main}>
                <Contacts></Contacts>
                <Chat></Chat>
            </main>
        </>
    )
}