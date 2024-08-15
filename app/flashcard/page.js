'use client'
import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { Container, Box, Typography, Button, Grid, CardContent, CardActionArea } from '@mui/material';
import { collection, doc, getDocs } from "firebase/firestore"
import { db } from '@/firebase'
import { useSearchParams } from 'next/navigation'

export default function Flashcard() {
  const { isLoaded, isSignedIn, user } = useUser()
  const [flashcards, setFlashcards] = useState([])
  const [flipped, setFlipped] = useState({})

  const searchParams = useSearchParams()
  const search = searchParams.get('id')

  useEffect(() => {
    async function getFlashcards() {
      if (!search || !user) return 

      try {
        const colRef = collection(doc(collection(db, 'users'), user.id), search)
        const querySnapshot = await getDocs(colRef)
        const flashcardsArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        setFlashcards(flashcardsArray)
      } catch (error) {
        console.error("Error fetching flashcards: ", error)
      }
    }
    getFlashcards()
  }, [search, user])

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const handleOpen = () => {
    // Define your handleOpen logic here
  }

  if (!isLoaded || !isSignedIn) {
    return <></>
  }

  return (
    <Container maxWidth="100vw">
      <Grid container spacing={3} sx={{ mt: 4 }}>
        
              {flashcards.map((flashcard, index) => (
                <Grid item xs={12} sm={6} md={4} key={flashcard.id}>
                  <CardActionArea onClick={() => handleCardClick(flashcard.id)}>
                    <CardContent>
                      <Box sx={{
                        perspective: '1000px',
                        '& > div > div': {
                          position: 'absolute',
                          width: '100%',
                          height: '100%',
                          backfaceVisibility: 'hidden',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          padding: 2,
                          boxSizing: 'border-box',
                          wordWrap: 'break-word',
                          textAlign: 'center',
                        },
                        '& > div': {
                          transition: 'transform 0.6s',
                          transformStyle: 'preserve-3d',
                          position: 'relative',
                          width: '100%',
                          height: '200px',
                          boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                          transform: flipped[flashcard.id] ? 'rotateY(180deg)' : 'rotateY(0deg)',
                        },
                        '& > div > div:nth-of-type(2)': {
                          transform: 'rotateY(180deg)',
                        },
                      }}>
                        <div>
                          <div>
                            <Typography variant="h5" component="div" sx={{ padding: '16px' }}>
                              {flashcard.front}
                            </Typography>
                          </div>
                          <div>
                            <Typography variant="h5" component="div" sx={{ padding: '16px' }}>
                              {flashcard.back}
                            </Typography>
                          </div>
                        </div>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Grid>
              ))}
      </Grid>
    </Container>
  )
}
