import { doc, getDoc, setDoc, addDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { updateUserPrivateChatField } from "./userService";

export async function chatExists(db, chatID) {

    const chatDocRef = doc(db, 'chats', String(chatID));

    let docSnap = await getDoc(chatDocRef);

    return docSnap.exists();
}

export async function createChat(db, chatID, user, otherUser) {
    await setDoc(doc(db, 'chats', String(chatID)), {
        user: {
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
        },
        otherUser: {
            email: otherUser.email,
            displayName: otherUser.displayName,
            photoURL: otherUser.photoURL,
        },
        messages: [],
        _id: chatID,
    });

    updateUserPrivateChatField(db, user, otherUser);
    updateUserPrivateChatField(db, otherUser, user);

}

export async function getChat(db, chatID) {
    const chatRef = doc(db, 'chats', String(chatID));
    let docSnap = await getDoc(chatRef);
    return docSnap.data()
}


export async function sendChatMessage(db, chat, messageContent, userEmail) {
    const chatRef = doc(db, 'chats', String(chat._id));
    let message = createChatMessage(messageContent, userEmail)
    return updateDoc(chatRef, {messages: arrayUnion(message)})
}

export async function getLastMessage(db, chatID) {
    const chatRef = doc(db, 'chats', String(chatID));
    let docSnap = await getDoc(chatRef);
    let docData = docSnap.data();

    return docData.messages[docData.messages.length - 1]
}

function createChatMessage(messageContent, userEmail) {
    return {
        message: messageContent,
        owner: userEmail,
        time: createTimeStamp(),
    }
}


function createTimeStamp() {
    let date = new Date()
    let hours = String(date.getHours());
    let minutes = String(date.getMinutes());
    
    console.log(hours, hours.length);

    if (hours.length === 1) {
        hours = `0${hours}`
    }

    if (minutes.split('').length === 1) {
        minutes = `0${minutes}`
    }

    return `${hours}:${minutes}`;
}