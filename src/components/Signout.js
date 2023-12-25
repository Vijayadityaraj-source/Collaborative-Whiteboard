import React from 'react';
import { signOut, useAuth } from '../services/firebase';
import { useNavigate } from 'react-router-dom';

export default function Signout() {
    const user = useAuth();

    const handleSignOut = async () => {
        try {
            await signOut();
        } catch (error) {
            console.error(error.message);
        }
    };

    const navigate = useNavigate();

    const handleSignIn = () => {
        navigate('/signin');
    };

    return (
        <>
        {user ?
            (<div>
                <img src={user.photoURL} alt="ProfilePic" />
                <p>Welcome, {user.displayName}!</p>
                <button onClick={handleSignOut}>Sign Out</button>
            </div>)
            :
            (<div>
                <p>Signed out!</p>
                <button onClick={handleSignIn}>Sign In</button>
            </div>)
        }
        </>
    )
}
