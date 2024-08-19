'use client'
import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { AppBar, Toolbar, Typography, Button, Container, Box, Grid, Menu, MenuItem } from "@mui/material";
import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const { isSignedIn } = useUser();

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (path) => {
    if (path === '/flashcards' && !isSignedIn) {
      router.push('/sign-in');
    } else {
      router.push(path);
    }
    handleMenuClose(); 
  };

  const handleRedirectToHome = () => {
    router.push('/'); 
  };

  const handleSubmit = async () => {
    const checkoutSession = await fetch('/api/checkout_session', {
      method: 'POST',
      headers: {
        origin: 'http://localhost:3000'
      },
    });

    const checkoutSessionJson = await checkoutSession.json();

    if (checkoutSession.statusCode === 500) {
      console.error(checkoutSession.message);
      return;
    }

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    });

    if (error) {
      console.warn(error.message);
    }
  };

  return (
    <Container maxWidth="100vw">
      <Head>
        <title>Quizify</title>
        <meta name="description" content='Create flashcard from your text'/>
      </Head>

      <AppBar position="static">
        <Toolbar>
          <Typography 
            variant="h6" 
            style={{ flexGrow: 1, cursor: 'pointer' }} 
            onClick={handleRedirectToHome}
          >
            Quizify
          </Typography>
          <SignedOut>
            <Button color="inherit" href="/sign-in">
              {''}
              Login
            </Button>
            <Button color="inherit" href="/sign-up">
              Sign Up
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

      <Box 
        sx={{
          textAlign: 'center',
          my: 4,
        }}
      >
        <Typography variant="h2" gutterBottom sx={{mt: 10}}>
          Welcome to Quizify
        </Typography>
        <Typography variant="h5" gutterBottom>
          {''}
          The easiest way to make flashcards from your text
        </Typography>
        <Button 
          variant='contained' 
          color='primary' 
          sx={{ mt: 3 }} 
          onClick={handleMenuClick}
        >
          Get Started
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          sx={{ mt: '45px' }} 
        >
          <MenuItem onClick={() => handleNavigate('/generate')}>Create</MenuItem>
          <MenuItem onClick={() => handleNavigate('/flashcards')}>Study History</MenuItem>
        </Menu>
      </Box>
      <Box sx={{ my: 6, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Features
        </Typography> 
        <Grid container spacing={4}>   
          <Grid item xs={12} md={4} sx={{mt: 3}}>
            <Typography variant="h6" gutterBottom>
              Easy Text Input
            </Typography>
            <Typography> 
              {''}
              Simply input your text and let our software do the rest. Creating 
              flashcards has never been easier.
            </Typography>
          </Grid> 
          <Grid item xs={12} md={4} sx={{mt: 3}}>
            <Typography variant="h6" gutterBottom>
              Smart Flashcards
            </Typography>
            <Typography> 
              {''}
              Our AI intelligently breaks down your text into concise 
              flashcards, perfect for studying.
            </Typography>
          </Grid> 
          <Grid item xs={12} md={4} sx={{mt: 3}}>
            <Typography variant="h6" gutterBottom>
              Accessible Anywhere
            </Typography>
            <Typography> 
              {''}
              Access your flashcards from any device, at any time. Study on the go with ease.
            </Typography>
          </Grid> 
        </Grid>
      </Box>
    </Container>
  );
}
