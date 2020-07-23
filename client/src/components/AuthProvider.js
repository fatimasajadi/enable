import React, { useState } from 'react';

export const AuthContext = React.createContext();

function AuthProvider(props) {
  const [user, setUser] = useState(JSON.parse(localStorage.user || 'null'));
  const authValue = {
    user,
    setUser(user) {
      localStorage.user = JSON.stringify(user);
      setUser(user);
    }
  }

  return (
    <AuthContext.Provider value={authValue}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;