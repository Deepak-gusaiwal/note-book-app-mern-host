import React, { useState } from 'react'
import { Radio, RadioGroup, Container, Textarea, Heading, VStack, FormControl, Input, FormHelperText, FormLabel, Button, useColorModeValue, Stack } from '@chakra-ui/react'
import Loading from './Loading';
import { useContext } from 'react';
import context from '../context/contextfile';

const AddNotesForm = () => {
    //bg colors on the basis of theme
    const bgContainer = useColorModeValue("white", "#103534");
    const HelperTextColor = useColorModeValue("red", "gray")

    // data and error variables
    const [data, setData] = useState({ title: "", desc: "" });
    const [tag, setTag] = useState("General");
    const [error, setError] = useState(false);


    //set loading true or false
    const [loading, setLoading] = useState(false);
    //context file variables 
    const { AddNote, showAlert } = useContext(context)

    //set data and send data functions
    let { title, desc } = data;
    const onchange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    // function to add note
    const handdleAddNote = () => {
        setLoading(true)
        if (!title || !desc) {
            setError(true)
            setLoading(false)
            showAlert("error", !title ? "title can't be empty" : "description can't be empty")
            return
        } else if (title.length < 3 || desc.length < 5) {
            setError(true)
            setLoading(false)
            showAlert("error", title.length < 3 ? "title is too short" : desc.length < 5 ? "description is too short" : "")
            return
        }
        //calling AddNote Function here
        AddNote(title, desc, tag,setLoading);
        // make fields blank
        setData({ title: "", desc: "" });
        setTag("General")

    }
    return (
        <Container maxW="container.lg" borderRadius="xl" boxShadow="2xl" bg={bgContainer} display="flex" gap="8" flexDirection="column" justifyContent="flex-start" alignItems="center" p={[4, 8]} h="fit-content">
            <Heading w="fit-content" size={['lg', 'lg', 'lg']} borderBottom="2px solid"> Add Note</Heading>
            <VStack alignSelf="stretch" gap="2">
                <FormControl isRequired>
                    <FormLabel>Title</FormLabel>
                    <Input value={title} onChange={onchange} name="title" type="text" placeholder='title' />
                    {!title && error ? <FormHelperText color={HelperTextColor}>Please Provide title of note</FormHelperText> : title.length < 3 && error ? <FormHelperText color={HelperTextColor}>Title is to short</FormHelperText> : ""}
                </FormControl>

                <FormControl isRequired>
                    <FormLabel>Desc</FormLabel>
                    <Textarea value={desc} onChange={onchange} name="desc" type="text" placeholder='description' />
                    {!desc && error ? <FormHelperText color={HelperTextColor}>Please Provide description of note</FormHelperText> :
                        desc.length < 5 && error ? <FormHelperText color={HelperTextColor}>Description is to short</FormHelperText> : ""}
                </FormControl>
                <RadioGroup colorScheme="teal" onChange={setTag} value={tag} w="full">
                    <FormLabel>Tag</FormLabel>
                    <Stack gap="2" direction={['column', 'row']}>
                        <Radio value='General'>General</Radio>
                        <Radio value='Important'>Important</Radio>
                        <Radio value='Most Important'>Most Important</Radio>
                    </Stack>
                </RadioGroup>

                <Button
                    mt={4}
                    colorScheme='teal'
                    onClick={handdleAddNote}
                    display="flex"
                    gap={2}
                    disabled={loading ? true : false}
                    alignSelf="flex-start"
                >
                    Add Note
                    {
                        loading ? <Loading /> : ""
                    }
                </Button>
            </VStack>
        </Container>
    )
}

export default AddNotesForm