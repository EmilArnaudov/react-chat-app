import { collection, doc, getDoc, setDoc, getDocs, updateDoc, arrayUnion } from "firebase/firestore";

export async function userExists(db, email) {
    const userDocRef = doc(db, 'users', email);
    let docSnap = await getDoc(userDocRef);
    return docSnap.exists();
}


export async function addUserToDatabase(db, user) {
    await setDoc(doc(db, 'users', user.email), {
        email: user.email,
        displayName: user.displayName,
        chatRoomsHosted: [],
        chatRoomsJoined: [],
        privateChats: [],
        isOnline: false,
        lastSeen: '',
        photoURL: user.photoURL,
    });
}

export async function setOnlineStatus(db, user) {
    const userToUpdateRef = doc(db, 'users', user.email);
    await updateDoc(userToUpdateRef, {isOnline: true})
}


export async function searchUsersInDb(db, query, user) {
    let result = [];
    let docRef = collection(db, 'users');
    let docSnap = await getDocs(docRef);
    docSnap.forEach(doc => result.push(doc.data()));

    return result.filter(
        element => 
        element.displayName.toLowerCase().includes(query.toLowerCase()) 
        || element.email.toLowerCase().includes(query.toLowerCase()));
}


export async function updateUserPrivateChatField(db, user, otherUser) {
    const userToUpdateRef = doc(db, 'users', user.email);
    await updateDoc(userToUpdateRef, {privateChats: arrayUnion(otherUser.email)})
}


export async function getContactUsersInfo(db, contacts) {
    contacts = contacts.map(async (contact) => {
        const docRef = doc(db, "users", contact);
        const docSnap = await getDoc(docRef);
        return docSnap.data();
    })

    return Promise.all(contacts);
}   