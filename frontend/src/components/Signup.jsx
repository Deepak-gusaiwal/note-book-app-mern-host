import {InputGroup,InputRightElement, Avatar, Container, Flex, Heading, VStack, FormControl, FormLabel, Input, Button, useColorModeValue, FormHelperText, HStack, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { UserUrl } from '../ApiLinks'
import Loading from './Loading';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useContext } from 'react';
import context from '../context/contextfile';


const Signup = () => {
  //variables imported from context
  const {showAlert}=useContext(context)

  //for theme mode colors
  const bgFlex = useColorModeValue("gray.200", "#111b1f")
  const bgContainer = useColorModeValue("white", "#103534");
  const HelperTextColor = useColorModeValue("red", "gray");
  const AvtarBg = useColorModeValue('#1ece9d', '#1e1e4399');
    //to show and hide password 
    const [show, setShow] = React.useState(false)
    const showHidePass = () => setShow(!show)

  //data and error variables
  const [data, setData] = useState({ name: "", email: "", password: "", cpassword: "" });
  const [error, setError] = useState(false);
  const navigate = useNavigate()

  // context File Variables
  const [loading,setLoading]=useState(false)

  // useEffect 
  useEffect(() => {
    let auth = localStorage.getItem('auth');
    if (auth) {
      navigate('/about')
    }
  })

  //set data and send data functions
  let { name, email, password, cpassword } = data;
  const onchange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }
  const handdleSignup = async () => {
    setLoading(true)
    if (!name || !email || !password || !cpassword) {
      setError(true)
      setLoading(false)
      return
    }
    try {
      let user = await fetch(`${UserUrl}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      user = await user.json();
      console.log(user)
      if (user.success) {
        showAlert('success', user.msg)
        localStorage.setItem('auth', user.authToken);
        navigate('/about');
        setLoading(false)
      } else {
        showAlert('error', user.msg)
        setLoading(false)
      }
    } catch (error) {
      showAlert('error', 'some error occured while signUp')
      setLoading(false)
    }
  }



  return (
    <>
      <Flex bg={bgFlex} minH="60vh" p={[4, 8, 16]}>
        <Container borderRadius="xl" boxShadow="2xl" bg={bgContainer} display="flex" gap="4" flexDirection="column" justifyContent="flex-start" alignItems="center" p={[4, 8]}>
          <VStack textAlign="center">
            <Avatar bg={AvtarBg} size="2xl" />
            <Heading w="fit-content" size={['lg', 'lg', 'lg']}>!NoteBook Always Reminds you</Heading>
          </VStack>
          <VStack alignSelf="stretch" gap="2">
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input onChange={onchange} name="name" type="text" placeholder='Name' />
              {!name && error ? <FormHelperText color={HelperTextColor}>Please Provide Valid Name</FormHelperText> : ""}
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input onChange={onchange} name="email" type="email" placeholder='email' />
              {!email && error ? <FormHelperText color={HelperTextColor}>Please Provide Valid Email</FormHelperText> : ""}
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup size='md'>
                <Input
                  pr='4.5rem'
                  type={show ? 'text' : 'password'}
                  placeholder='Enter password'
                  onChange={onchange} name="password"
                />
                <InputRightElement width='4.5rem'>
                  <Button h='1.75rem' size='sm' onClick={showHidePass}>
                    {show ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {!password && error ? <FormHelperText color={HelperTextColor}>Please Type Password</FormHelperText> : ""}
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <Input onChange={onchange} name="cpassword" type="password" placeholder='Confirm password' />
              {!cpassword && error ? <FormHelperText color={HelperTextColor}>Please Confirm Password </FormHelperText> :
                cpassword !== password ? <FormHelperText color={HelperTextColor}>Password Doesn't Match</FormHelperText> : ""
              }
            </FormControl>
            <Button
              mt={4}
              colorScheme='teal'
              onClick={handdleSignup}
              display="flex"
              gap={2}
              disabled={loading ? true : false}

            >
              Signup
              {
                loading ? <Loading /> : ""
              }
            </Button>
            <HStack w="full" justifyContent="flex-end">
              <Text>Already have Account ?</Text><Link to="/login"><Text color="green.500" _hover={{ opacity: "0.5" }}>Login</Text></Link>
            </HStack>
          </VStack>
        </Container>
      </Flex>
    </>
  )
}

export default Signup