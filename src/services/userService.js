import { collection, addDoc, doc, getDoc, setDoc } from "firebase/firestore";

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
    });
}