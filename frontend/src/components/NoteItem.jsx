import { Badge, Heading, HStack, IconButton, VStack, Text, useColorModeValue, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, Input, FormHelperText, Textarea, Radio, Stack, RadioGroup } from '@chakra-ui/react'
import React, { useState, useContext } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { NotesUrl } from '../ApiLinks'
import context from '../context/contextfile'
import Loading from './Loading'

const NoteItem = ({ title, desc, tag, date, id }) => {
  //bg colors on the basis of theme
  const bgCard = useColorModeValue("white", "#103534");
  const HelperTextColor = useColorModeValue("red", "gray")
  const [loading, setLoading] = useState(false);

  //context file variables 
  const { UpdateNote, DeleteNote, showAlert } = useContext(context)

  //edit modal function
  const { isOpen, onOpen, onClose } = useDisclosure();

  // edit modal values variable
  const [data, setData] = useState({ etitle: "", edesc: "" });
  const [etag, setETag] = useState("General");
  const [error, setError] = useState(false);
  //set data and send data functions
  let { etitle, edesc } = data;
  const onchange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }



  //==============================================Prefill Note Data in the Update Modal ================================
  const PrefillNoteData = async (id) => {
    const auth = localStorage.getItem('auth')
    // usgin trycatch block
    try {
      let note = await fetch(`${NotesUrl}/single/${id}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'auth-token': auth
        }
      });
      note = await note.json();
      console.log(note)
      if (note.success === true) {
        // openModal
        onOpen();
        let { title, desc, tag } = note.note
        setData({ etitle: title, edesc: desc });
        setETag(tag)
      } else {
        showAlert("error", note.msg)
      }
    } catch (error) {
      showAlert("error", "internal server error at (PrefillData in NoteItem.jsx)")
    }
  }

  
  // ========================================================function to update note
  const UpdateHnddler = () => {
    setLoading(true)
    if (!etitle || !edesc) {
      setError(true)
      setLoading(false)
      showAlert("error", !etitle ? "title can't be empty" : "description can't be empty")
      return
    } else if (etitle.length < 3 || edesc.length < 5) {
      setError(true)
      setLoading(false)
      showAlert("error", etitle.length < 3 ? "title is too short" : edesc.length < 5 ? "description is too short" : "")
      return
    }
    //calling Update Note here
    UpdateNote(id, etitle, edesc, etag, setLoading,onClose)
  }
  return (
    <>
      <VStack borderRadius="lg" boxShadow="lg" bg={bgCard} w="16rem" h="20rem" p={[4, 8]} alignItems="stretch" justifyContent="space-around">
        <VStack>
          <Heading size="lg">{title}</Heading>
          <Text h="96px" overflowY="auto" >{desc}</Text>
        </VStack>

        <HStack gap="4">
          <Badge>{tag}</Badge>
          <Badge>{date.split('T')[0]}</Badge>
        </HStack>
        <HStack justifyContent="space-between">
          <IconButton onClick={() => { PrefillNoteData(id) }} colorScheme="yellow"><FaEdit /></IconButton>
          {/* calling delete note on click of Trash btn */}
          <IconButton display="flex"
            gap={2}
            onClick={() => { DeleteNote(id) }} colorScheme="red"><FaTrash /></IconButton>
        </HStack>
      </VStack>

      {/* =========================================modal of update note========================= */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader borderBottom="2px solid">Update Note</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* update form */}
            <VStack alignSelf="stretch" gap="2">
              <FormControl isRequired>
                <FormLabel>Title</FormLabel>
                <Input value={etitle} onChange={onchange} name="etitle" type="text" placeholder='title' />
                {!etitle && error ? <FormHelperText color={HelperTextColor}>Please Provide title of note</FormHelperText> : etitle.length < 3 && error ? <FormHelperText color={HelperTextColor}>Title is too short</FormHelperText> : ""}
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Desc</FormLabel>
                <Textarea value={edesc} onChange={onchange} name="edesc" type="text" placeholder='description' />
                {!edesc && error ? <FormHelperText color={HelperTextColor}>Please Provide description of note</FormHelperText> :
                  edesc.length < 5 && error ? <FormHelperText color={HelperTextColor}>description is to short</FormHelperText> : ""}
              </FormControl>
              <RadioGroup colorScheme="teal" onChange={setETag} value={etag} w="full">
                <FormLabel>Tag</FormLabel>
                <Stack gap="2" direction={['column', 'row']}>
                  <Radio value='General'>General</Radio>
                  <Radio value='Important'>Important</Radio>
                  <Radio value='Most Important'>Most Important</Radio>
                </Stack>
              </RadioGroup>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={UpdateHnddler} display="flex"
              gap={2}
              disabled={loading ? true : false}
              alignSelf="flex-start">
              update
              {
                loading ? <Loading /> : ""
              }
            </Button>
            <Button variant='ghost' onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}


export default NoteItem