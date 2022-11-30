import React, { useState, useEffect, useContext } from 'react';
import { InputGroup, InputRightElement, Avatar, Container, Text, Flex, HStack, Heading, VStack, FormControl, FormLabel, Input, Button, useColorModeValue, FormHelperText } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import { UserUrl } from '../ApiLinks';
import Loading from './Loading';
import context from '../context/contextfile';

const Login = () => {
  //variables imported from context
  const { showAlert } = useContext(context);

  //bg colors on the basis of theme
  const bgFlex = useColorModeValue("gray.200", "#111b1f")
  const bgContainer = useColorModeValue("white", "#103534")
  const HelperTextColor = useColorModeValue("red", "gray")
  const AvtarBg = useColorModeValue('#1ece9d', '#1e1e4399');
  //to show and hide password 
  const [show, setShow] = React.useState(false)
  const showHidePass = () => setShow(!show)

  //data and error variables
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState(false);
  const navigate = useNavigate()

  //set loading true or false
  const [loading, setLoading] = useState(false);

  // useEffect 
  useEffect(() => {
    let auth = localStorage.getItem('auth');
    if (auth) {
      navigate('/about')
    }
  })

  //set data and send data functions
  let { email, password } = data;
  const onchange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }
  const handdleLogin = async () => {
    setLoading(true)
    if (!email || !password) {
      setError(true)
      setLoading(false)
      return
    }
    try {
      let user = await fetch(`${UserUrl}/login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      user = await user.json();
      if (user.success) {
        localStorage.setItem('auth', user.authToken)
        navigate('/about')
        showAlert('success', user.msg)
        setLoading(false)
      } else {
        setLoading(false)
        showAlert('error', user.msg)
      }
    } catch (error) {
      setLoading(false)
      showAlert('error', 'some error occured while login in')
    }
  }
  return (
    <>
      <Flex bg={bgFlex} minH="60vh" p={[4, 8, 16]}>
        <Container borderRadius="xl" boxShadow="2xl" bg={bgContainer} display="flex" gap="4" flexDirection="column" justifyContent="flex-start" alignItems="center" p={[4, 8]}>
          <VStack textAlign="center">
            <Avatar size="2xl" bg={AvtarBg} />
            <Heading w="fit-content" size={['lg', 'lg', 'lg']}> Welcome back to !NoteBook</Heading>
          </VStack>
          <VStack alignSelf="stretch" gap="2">
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
            <Button
              mt={4}
              colorScheme='teal'
              onClick={handdleLogin}
              display="flex"
              gap={2}
              disabled={loading ? true : false}
            >
              Login
              {
                loading ? <Loading /> : ""
              }
            </Button>
            <HStack w="full" justifyContent="flex-end">
              <Text>Signup to Create Account ?</Text><Link to="/signup"><Text color="green.500" _hover={{ opacity: "0.5" }}>Signup</Text></Link>
            </HStack>
          </VStack>
        </Container>
      </Flex>
    </>
  )
}

export default Login