import styles from './Main.module.css';
import Navigation from "../navigation/Navigation"
import Contacts from '../contacts/Contacts';
import Chat from '../chat/Chat';
import { userExists, addUserToDatabase } from '../../services/userService';
import { constructID } from '../../services/helpers'
import { chatExists } from '../../services/chatService';
import { createChat } from '../../services/chatService';
import { getContactUsersInfo } from '../../services/userService';


import { onSnapshot, doc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export default function Main({
    logout,
    user,
    db,
}) {

    let [contacts, setContacts] = useState([]);
    let [mappedContacts, setMappedContacts] = useState([]);

    const startChatWithUser = async (selectedUser) => {
        let chatID = constructID(user, selectedUser);
        let chatExist = await chatExists(db, chatID);

        if (!chatExist) {
            createChat(db, chatID, user, selectedUser);
        }
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

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "users", user.email), (doc) => {
            let userData = doc.data();
            setContacts(userData.privateChats);
          });

          return unsub;
    }, [])


    useEffect(() => {
        getContactUsersInfo(db, contacts)
            .then(map => {
                setMappedContacts(map);
            })

    }, [contacts])

    return (
        <>
            <header>
                <Navigation startChatWithUser={startChatWithUser} db={db} user={user} logout={logout}></Navigation>
            </header>
            <main className={styles.main}>
                <Contacts contacts={mappedContacts}></Contacts>
                <Chat></Chat>
            </main>
        </>
    )
}