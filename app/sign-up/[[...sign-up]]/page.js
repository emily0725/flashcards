import { AppBar, Container, Toolbar, Typography, Button, Box } from '@mui/material';
import Link from 'next/link';
import { SignIn, SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <Container maxWidth="100vw"> 
      <AppBar position="static" sx={{ backgroundColor: "#3f51b5" }}>
        <Toolbar>
          <Typography 
            variant="h6" 
            sx={{ flexGrow: 1 }}
          >
            <Link href="/" passHref>
              <Typography variant="h6" sx={{ textDecoration: 'none', color: 'inherit' }}>
                Quizify
              </Typography>
            </Link>
          </Typography>
          <Button color='inherit'>
            <Link href="/sign-in" passHref>
              <Typography sx={{ textDecoration: 'none', color: 'inherit' }}>
                Login
              </Typography>
            </Link>
          </Button>
          <Button color='inherit'>
            <Link href="/sign-up" passHref>
              <Typography sx={{ textDecoration: 'none', color: 'inherit' }}>
                Sign Up
              </Typography>
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
      
      <Box 
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ mt: 4 }}
      >
        <Typography variant="h4">Sign Up</Typography>
        <SignUp />      
      </Box>
    </Container>
  );
}
