import { collection, addDoc, doc, getDoc, setDoc, getDocs } from "firebase/firestore";

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
        photoURL: user.photoURL,
    });
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