import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { updateUserPrivateChatField } from "./userService";
import { getDownloadURL } from "firebase/storage";

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


export async function sendChatMessage(db, chat, messageContent, userEmail, optional) {
    const chatRef = doc(db, 'chats', String(chat._id));
    let message;
    if (!optional) {
        message = createChatMessage(messageContent, userEmail)
    } else if (optional === 'image'){
        message = createChatMessageImage(messageContent, userEmail)
    }

    return updateDoc(chatRef, {messages: arrayUnion(message)})
}

function createChatMessageImage(messageContent, userEmail) {
    return {
        url: messageContent,
        owner: userEmail,
        time: createTimeStamp(),
        type: 'image',
    }
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

export async function uploadImageAndGetDownloadUrl(storageContainer, file) {

    let {storage, ref, uploadBytes} = storageContainer
    let fileRef = ref(storage, Date.now() + '.png');
    const snapshot = await uploadBytes(fileRef, file);
    let url = await getDownloadURL(snapshot.ref);
    return url;
}