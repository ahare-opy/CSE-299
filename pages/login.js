import React, { useState, useEffect, useRef } from 'react';
import {
  Form,
  Button,
  Message,
  Segment,
  TextArea,
  Divider,
  Item,
  Header,
} from 'semantic-ui-react';
import GoogleLogin from 'react-google-login';
import cookie from 'js-cookie';
import {
  HeaderMessage,
  FooterMessage,
} from '../components/Common/WelcomeMessage';

import { loginUser } from '../utils/authUser';

function Login() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const [formLoading, setFormLoading] = useState(false);

  const [submitDisabled, setSubmitDisabled] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await loginUser(user, setErrorMessage, setFormLoading);
  };

  useEffect(() => {
    const isUser = Object.values({
      email,
      password,
    }).every((item) => Boolean(item));

    isUser ? setSubmitDisabled(false) : setSubmitDisabled(true);
  }, [user]);

  useEffect(() => {
    document.title = 'Welcome Back to NSU Ovijog';
    const userEmail = cookie.get('userEmail');
    if (userEmail) setUser((prev) => ({ ...prev, email: userEmail }));
  }, []);

  const responseGoogle = (response) => {
    console.log(response);
  };

  return (
    <>
      <HeaderMessage />
      <Form
        loading={formLoading}
        error={errorMessage != null}
        onSubmit={handleSubmit}
      >
        <Message
          error
          header="Opps!"
          content={errorMessage}
          onDismiss={() => setErrorMessage(null)}
        />
        <Segment>
          <Form.Input
            label="Email"
            placeholder="NSU Email"
            name="email"
            value={email}
            onChange={handleChange}
            fluid
            icon="envelope"
            iconPosition="left"
            type="email"
            required
          />

          <Form.Input
            label="Password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChange}
            fluid
            icon={{
              name: 'eye',
              circular: true,
              link: true,
              onClick: () => setShowPassword(!showPassword),
            }}
            iconPosition="left"
            type={showPassword ? 'text' : 'password'}
            required
          />

          <Divider hidden />
          <Button
            icon="sign in"
            content="Login"
            type="submit"
            color="orange"
            disabled={submitDisabled}
          />
        </Segment>
      </Form>

      <Divider />

      <FooterMessage />
    </>
  );
}

export default Login;
