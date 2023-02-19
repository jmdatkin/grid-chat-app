import { onAuthStateChanged, signInAnonymously, User } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import AppWrapper from '../components/AppWrapper';
import MainCanvasWrapper from '../components/CanvasWrapper';
import { auth, initFirebase } from '../../lib/firebase';
import UserContext from '@/context/UserContext';

function App() {

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const {auth} = initFirebase();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });

    signInAnonymously(auth)
      .then(() => {
        // Signed in..
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
        // ...
      });

  }, []);

  return (
    <UserContext.Provider value={user}>
      <div className="App">
        {/* <MainCanvasWrapper></MainCanvasWrapper>  */}
        <AppWrapper></AppWrapper>
      </div>
    </UserContext.Provider>
  );
}

export default App;
