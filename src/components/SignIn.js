import React from 'react';
import { signInWithGoogle } from '../services/firebase';
import {Button} from '@chakra-ui/react'

const SignIn = () => {
  const handleSignInWithGoogle = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
        <div>
          <p>Please sign in to access this feature.</p>
          <Button onClick={handleSignInWithGoogle}>Sign In with Google</Button>
        </div>
    </div>
  );
};

export default SignIn;