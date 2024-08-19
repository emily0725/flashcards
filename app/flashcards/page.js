'use client'
import { useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import { useRouter } from 'next/navigation'
import { Container, Grid, Card, CardActionArea, CardContent, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Flashcards() {
  const { isLoaded, isSignedIn, user } = useUser()
  const [flashcards, setFlashcards] = useState([])
  const router = useRouter()
  
  useEffect(() => {
    async function getFlashcards() {
      if (!user) return 
      const docRef = doc(collection(db, 'users'), user.id)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const collections = docSnap.data().flashcards || []
        setFlashcards(collections)
      } else {
        await setDoc(docRef, { flashcards: [] })
      } 
    }
    getFlashcards()
  }, [user])

  const deleteFlashcardSet = async (flashcardName) => {
    if (!user) return
    const docRef = doc(collection(db, 'users'), user.id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const collections = docSnap.data().flashcards || []
      const updatedCollections = collections.filter(fc => fc.name !== flashcardName)

      await updateDoc(docRef, { flashcards: updatedCollections })
      setFlashcards(updatedCollections)
    }
  }

  const handleCardClick = (id) => {
    router.push(`/flashcard?id=${id}`)
  }

  if (!isLoaded || !isSignedIn) {
    return <></>
  }

  return (
    <Container maxWidth="100vw">
      <Grid 
        container 
        spacing={3} 
        sx={{ 
          mt: 4 
        }}
      >
        {flashcards.map((flashcard, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardActionArea 
                onClick={() => {
                  handleCardClick(flashcard.name)
                }}>
                <CardContent>
                  <Typography variant="h5">
                    {flashcard.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <IconButton
                aria-label="delete"
                onClick={() => deleteFlashcardSet(flashcard.name)}
              >
                <DeleteIcon />
              </IconButton>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
