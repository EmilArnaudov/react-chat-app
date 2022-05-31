import './App.css';
import Main from './components/main/Main';
import Login from './components/login/Login';


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebaseConfig';
import { getAuth, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { setOfflineStatus } from './services/userService';
import { getStorage, ref, uploadBytes } from 'firebase/storage'

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

const storageContainer = {
  storage,
  ref,
  uploadBytes,
}

function App() {

  const auth = getAuth(app);
  const [user, loading, error] = useAuthState(auth);

  const signInWithGoogle = async () => {
    console.log('PROVIDer');
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
}



  const logout = () => {
    setOfflineStatus(db, user);
    signOut(auth);
  }

  return (
    <Router>
      <Routes>
        <Route path='/' element={
              user 
              ? <Main 
                      user={user} 
                      db={db}
                      logout={logout}
                      storageContainer={storageContainer}
                /> 
              : <Login signInWithGoogle={signInWithGoogle}/>
              }>
                
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
