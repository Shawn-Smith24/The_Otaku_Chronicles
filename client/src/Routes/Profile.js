import {useState} from 'react';
import Login from './Login';
import SignUp from './SignUp';

function Profile({user, setUser}){
    const [profile, setProfile] = useState(true);

    

return(
    <>
      {user ? 'MAKE USER PERSONAL INFO PAGE':
      <>
        {profile ? (
          <>
            <Login user={user} setUser={setUser}/>
            <hr />

            <p>Don't have an profile? &nbsp;
              <button  onClick={() => setProfile(false)}>Sign Up</button>
            </p>
          </>
        ) :(
          <>
            <SignUp user={user} setUser={setUser}/>
            <hr />
            <p>
              Do you have a profile? &nbsp;
              <button onClick={() => setProfile(true)}>
                Login
              </button>
            </p>
          </>
        )}
      </>
      }
    </>
)
}

export default Profile;