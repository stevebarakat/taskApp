import React, { useState } from 'react';
import { auth } from '../firebase';
import { Button, TextInput, Field, InputIcon, ErrorMessage } from '../styles/style';
import { MdEmail } from 'react-icons/md';

const ForgotPassword = () => {
  const [resetPasswordEmail, setResetPasswordEmail] = useState('');
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [passwordResetError, setPasswordResetError] = useState(null);

  async function handleResetPassword() {
    try {
      var actionCodeSettings = {
        // After password reset, the user will be give the ability to go back
        // to this page.
        url: 'http://localhost:3000/login',
        handleCodeInApp: false
      };
      await auth.sendPasswordResetEmail(resetPasswordEmail, actionCodeSettings);
      setIsPasswordReset(true);
    } catch (err) {
      console.error("Error sending email", err);
      setPasswordResetError(err.message);
      setIsPasswordReset(false);
    }
  }

  return (
    <div>
      <Field>
        <InputIcon><MdEmail /></InputIcon>
        <TextInput
          signIn
          type="email"
          name="email"
          placeholder=" "
          onChange={e => setResetPasswordEmail(e.target.value)}
          autoComplete="off"
          required />
        <label htmlFor="email">Email</label>
      </Field>
      <Button onClick={handleResetPassword}>Reset Password</Button>
      {isPasswordReset && <p>Check email to reset password.</p>}
      {passwordResetError && <ErrorMessage>{passwordResetError}</ErrorMessage>}
    </div>
  );
};

export default ForgotPassword;
