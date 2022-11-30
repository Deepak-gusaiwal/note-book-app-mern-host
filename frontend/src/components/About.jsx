import { Flex, Avatar, Badge, Container, Heading, HStack, Stack, Text, VStack, useColorModeValue } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserUrl } from '../ApiLinks';
import context from '../context/contextfile';

const About = () => {
    //variables imported from context
    const {showAlert}=useContext(context)
  //set bg on the basis of theme
  const bgFlex = useColorModeValue("gray.200", "#111b1f")
  const bgContainer = useColorModeValue("white", "#103534");
  const AvtarBg = useColorModeValue('#1ece9d', '#1ece9d');

  // user Data Variable
  const [userData,setUserData]=useState({name:"",email:"",notes:"",Date:"",userId:""})
  const auth = localStorage.getItem("auth")
  // calling api to fetch user data in useEffect
  useEffect(() => {
    const fetchUser = async () => {
      let userData = await fetch(UserUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": auth
        }
      });
      userData = await userData.json();
      
      if(userData.success){
        let {name,email,notes,_id,Date} = userData.user;
        setUserData({name,email,notes,userId:_id,Date})
      }else{
        showAlert('error','some error occured while fetching user details in front-end')
      }
    }
    fetchUser();
  },[auth ,showAlert])
  return (
    <Flex minH="80vh" bg={bgFlex} p={[4, 8]}>
      <Container gap="8" borderRadius="xl" boxShadow="2xl" display="flex" flexDirection="column" justifyContent="space-around" maxW="container.lg" bg={bgContainer} p={[4, 8]}>
        <Stack direction={['column', 'column', 'row']} >
          <VStack flex="1">
            <Avatar bg={AvtarBg} size="2xl" name={userData.name} />
            <Heading>!NoteBook</Heading>
          </VStack>
          <VStack textTransform="uppercase" flex="2" gap="4" alignItems="stretch">
            <HStack borderBottom="2px solid" justifyContent="space-between">
              <Heading size={["xs", "md","md","lg"]}>User ID</Heading>
              <Heading size={["xs", "md", "md", "lg"]}>{userData.userId}</Heading>
            </HStack>
            <HStack borderBottom="2px solid" justifyContent="space-between">
              <Text>Name</Text>
              <Text>{userData.name}</Text>
            </HStack>
            <HStack borderBottom="2px solid" justifyContent="space-between">
              <Text>Email</Text>
              <Text>{userData.email}</Text>
            </HStack>
            <HStack borderBottom="2px solid" justifyContent="space-between">
              <Text>Date of joining</Text>
              <Text>{userData.Date.split('T')[0]}</Text>
            </HStack>
            <HStack justifyContent="space-between">
              <Badge colorScheme="teal">Notes :{userData.notes.length} </Badge>
              <Badge colorScheme="teal"><Link to="/">click to See your Notes</Link></Badge>
            </HStack>
          </VStack>
        </Stack>
        <VStack p={[2]}>
          <Heading borderBottom="2px solid" gap="2"> Abou Us</Heading>
          <Text textAlign="center">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam deleniti beatae maiores adipisci impedit provident magnam aperiam labore natus tenetur veniam nemo suscipit, fugiat laboriosam dolore voluptate consequatur possimus accusamus. Deserunt, soluta expedita labore et reiciendis quidem! Nisi cum commodi veritatis suscipit doloribus earum consectetur aliquam, nulla, possimus dignissimos ullam? Fugit, repellat quis voluptate non veritatis iusto qui corporis, quas unde eveniet ipsum alias, laudantium quasi! Eum eius id consequuntur suscipit possimus? Illo delectus modi explicabo reiciendis esse impedit illum et, eos totam similique excepturi velit tenetur blanditiis commodi, id, laborum magnam exercitationem distinctio itaque voluptatum voluptatem quae est doloribus.</Text>
        </VStack>
      </Container>
    </Flex>
  )
}

export default About