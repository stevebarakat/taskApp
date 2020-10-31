import React from "react";
import { auth } from '../firebase';

function useAuth() {
  const [authUser, setAuthUser] = React.useState(null);

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return authUser;
}

export default useAuth;
