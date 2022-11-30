import { Heading, HStack, Text, useColorModeValue, VStack } from '@chakra-ui/react'
import React from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import context from '../context/contextfile'
import AddNotesForm from './AddNotesForm'
import NoteItem from './NoteItem'

const Home = () => {
  const bgFlex = useColorModeValue("gray.200", "#111b1f");
const {notes ,GetNotes} = useContext(context)
useEffect(()=>{
  GetNotes()
  // eslint-disable-next-line
},[])

  return (
    <>
      <VStack bg={bgFlex} p={[4, 8, 16]} minH="80vh" gap="8">
        <AddNotesForm />

        {/* note Items */}
        <VStack alignSelf="stretch" gap="4">
          <Heading textAlign="start" borderBottom="2px solid" >Your Notes</Heading>
          <HStack wrap="wrap" gap="6" justifyContent="center">
            {/*Note item */}

            {/* maping the notes array here */}
            {
              notes.length>0 ?
              notes.map((note)=>{
                return(
                  <NoteItem key={note._id} id={note._id} title={note.title} desc = {note.desc} tag={note.tag} date={note.date} />
                )
              })
              :
              <Text>Please Add Some Notes to show</Text>
            }
          </HStack>
        </VStack>
      </VStack>
    </>
  )
}

export default Home