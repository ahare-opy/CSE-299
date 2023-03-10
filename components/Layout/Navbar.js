import React from 'react';
import { Menu, Container, Icon, Image } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { route } from 'next/dist/server/router';

function Navbar() {
  const router = useRouter();

  const isActive = (route) => router.pathname === route;

  return (
    <Menu fluid borderless>
      <Image
        src="https://i.postimg.cc/j5PGNVxB/logo512.png"
        size="tiny"
        circular
      />
      <Container text>
        <Link href="/login">
          <Menu.Item header active={isActive('/login')}>
            <Icon size="large" name="sign in" />
            Login
          </Menu.Item>
        </Link>

        <Link href="/signup">
          <Menu.Item header active={isActive('/signup')}>
            <Icon size="large" name="signup" />
            Signup
          </Menu.Item>
        </Link>
      </Container>
    </Menu>
  );
}

export default Navbar;
