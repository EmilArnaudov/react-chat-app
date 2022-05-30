import { doc, getDoc, setDoc, addDoc } from "firebase/firestore";
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
    });

    updateUserPrivateChatField(db, user, otherUser);
    updateUserPrivateChatField(db, otherUser, user);

}