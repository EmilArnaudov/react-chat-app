import styles from './Main.module.css';

import Navigation from "../navigation/Navigation"
import Contacts from '../contacts/Contacts';
import Chat from '../chat/Chat';
import { useEffect } from 'react';
import { userExists, addUserToDatabase } from '../../services/userService';

import { constructID } from '../../services/helpers'

export default function Main({
    logout,
    user,
    db,

}) {

    const startChatWithUser = (selectedUser) => {
        console.log(selectedUser);
        console.log(constructID(user,selectedUser));
        console.log(constructID(selectedUser, user));
      }

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
                <Navigation startChatWithUser={startChatWithUser} db={db} user={user} logout={logout}></Navigation>
            </header>
            <main className={styles.main}>
                <Contacts></Contacts>
                <Chat></Chat>
            </main>
        </>
    )
}