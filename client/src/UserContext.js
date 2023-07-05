import React, { createContext, useState, useEffect } from 'react';


export const UserContext = createContext();

export const UserProvider = ({ children })=>{
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        fetch("/check_session")
          .then((r) => {
            // console.log(r)
            if (r.ok) {
              r.json()
                .then((user) => { setUser(user) });
            }
          });
      }, []);
    return (
        <UserContext.Provider value={[user, setUser]}>
        {children}
        </UserContext.Provider>
    );
    }
