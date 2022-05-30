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

const app = initializeApp(firebaseConfig)
const db = getFirestore(app);

function App() {

  const auth = getAuth(app);
  const [user, loading, error] = useAuthState(auth);

  const signInWithGoogle = async () => {
    console.log('PROVIDer');
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
}



  const logout = () => {
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
                /> 
              : <Login signInWithGoogle={signInWithGoogle}/>
              }>
                
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
