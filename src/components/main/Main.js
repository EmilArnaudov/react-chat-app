import styles from './Main.module.css';
import Navigation from "../navigation/Navigation"
import Contacts from '../contacts/Contacts';
import Chat from '../chat/Chat';
import { userExists, addUserToDatabase, setOnlineStatus } from '../../services/userService';
import { constructID } from '../../services/helpers'
import { chatExists, getChat } from '../../services/chatService';
import { createChat } from '../../services/chatService';
import { getContactUsersInfo } from '../../services/userService';


import { onSnapshot, doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export default function Main({
    logout,
    user,
    db,
    storageContainer,
}) {

    let [contacts, setContacts] = useState([]);
    let [mappedContacts, setMappedContacts] = useState([]);
    let [chatPartner, setChatPartner] = useState({});
    let [chat, setChat] = useState({});

    const startChatWithUser = async (selectedUser) => {
        let chatID = constructID(user, selectedUser);
        let chatExist = await chatExists(db, chatID);

        if (!chatExist) {
            createChat(db, chatID, user, selectedUser)
                .then(() => {
                    setChatPartner(selectedUser);
                })
        } else {
            setChatPartner(selectedUser);
        }


      }

    useEffect( () => {

        userExists(db, user.email)
            .then(userExistsInDb => {
                if (!userExistsInDb) {
                    addUserToDatabase(db, user);
                }
                setOnlineStatus(db, user);
            })

    }, [])

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "users", user.email), (doc) => {
            let userData = doc.data();
            if (userData) {
                setContacts(userData.privateChats);
            }
            
          });

          return unsub;
    }, [])


    useEffect(() => {
        setInterval(() => {
            let docRef = doc(db, "users", user.email)
            getDoc(docRef)
                .then(docSnap => {
                    let userData = docSnap.data();
                    if (userData) {
                        setContacts(userData.privateChats);
                    }
                })
        }, 180000)


    }, [])


    useEffect(() => {
        getContactUsersInfo(db, contacts)
            .then(map => {
                setMappedContacts(map);
                if (map.length > 0) {
                    setChatPartner(map[map.length - 1])
                }
            })
    }, [contacts])

    useEffect(() => {
        if (Object.keys(chatPartner).length > 0) {
            let chatID = constructID(user, chatPartner);
            getChat(db, chatID)
                .then(chat => {
                    setChat(chat);
                })
        }

    }, [chatPartner])


    useEffect(() => {
        if (Object.keys(chatPartner).length === 0) {
            return;
        }
        let chatID = constructID(user, chatPartner);
        const unsub = onSnapshot(doc(db, "chats", chatID), (doc) => {
            let chatData = doc.data();
            setChat(chatData);
            });

        return unsub;
    }, [chatPartner])

    return (
        <>
            <header>
                <Navigation startChatWithUser={startChatWithUser} db={db} user={user} logout={logout}></Navigation>
            </header>
            <main className={styles.main}>
                <Contacts db={db} user={user} startChatWithUser={startChatWithUser} contacts={mappedContacts}></Contacts>
                <Chat storageContainer={storageContainer} db={db} user={user} otherUser={chatPartner} chat={chat}></Chat>
            </main>
        </>
    )
}