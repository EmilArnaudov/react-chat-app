import styles from './Main.module.css';

import Navigation from "../navigation/Navigation"
import Contacts from '../contacts/Contacts';
import Chat from '../chat/Chat';
import { useEffect } from 'react';
import { userExists, addUserToDatabase } from '../../services/userService';

export default function Main({
    logout,
    user,
    db
}) {

    useEffect( () => {

        userExists(db, user.email)
            .then(userExistsInDb => {
                console.log(userExistsInDb);
                if (!userExistsInDb) {
                    addUserToDatabase(db, user);
                }
            })

    }, [])

    return (
        <>
            <header>
                <Navigation db={db} user={user} logout={logout}></Navigation>
            </header>
            <main className={styles.main}>
                <Contacts></Contacts>
                <Chat></Chat>
            </main>
        </>
    )
}