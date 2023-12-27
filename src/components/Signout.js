import React from 'react';
import { signOut, useAuth } from '../services/firebase';
import { useNavigate } from 'react-router-dom';
import {Button} from '@chakra-ui/react'

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
                <Button onClick={handleSignOut}>Sign Out</Button>
            </div>)
            :
            (<div>
                <p>Signed out!</p>
                <Button onClick={handleSignIn}>Sign In</Button>
            </div>)
        }
        </>
    )
}
