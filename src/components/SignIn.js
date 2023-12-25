import React from 'react';
import { signInWithGoogle } from '../services/firebase';

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
          <button onClick={handleSignInWithGoogle}>Sign In with Google</button>
        </div>
    </div>
  );
};

export default SignIn;