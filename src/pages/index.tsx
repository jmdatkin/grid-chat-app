import { onAuthStateChanged, signInAnonymously, User } from 'firebase/auth';
import { createContext, useState } from 'react';
import AppWrapper from '../components/AppWrapper';
import MainCanvasWrapper from '../components/CanvasWrapper';
import { auth } from '../firebase';

const UserContext = createContext<User | null>(null);

function App() {

  const [user, setUser] = useState<User | null>(null);

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

  return (
    <UserContext.Provider value={user}>
      <div className="App">
        {/* <MainCanvasWrapper></MainCanvasWrapper>  */}
        <AppWrapper></AppWrapper>
      </div>
    </UserContext.Provider>
  );
}

export { App, UserContext };
