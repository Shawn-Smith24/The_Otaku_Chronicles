import {useState} from 'react';
import Login from './Login';
import SignUp from './SignUp';


function Profile(){
    const [profile, setProfile] = useState(true);

    

return(
    <div>
      
      <>
        {profile ? (
          <>
            <Login />
            <hr />

            <p className="text-[#beef00]">Don't have an profile? &nbsp;
              <button  onClick={() => setProfile(false)}>Sign Up</button>
            </p>
          </>
        ) :(
          <>
            <SignUp />
            <hr />
            <p className="text-[#beef00]">
              Do you have a profile? &nbsp;
              <button onClick={() => setProfile(true)}>
                Login
              </button>
            </p>
          </>
        )}
      </>
    
    </div>
)
}

export default Profile;