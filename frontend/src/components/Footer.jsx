import { ButtonGroup, Container, Heading, IconButton, Stack, Text } from '@chakra-ui/react'
import * as React from 'react'
import { FaGithub, FaLinkedin, FaYoutube } from 'react-icons/fa'

const Footer = () => (
    <Container maxW="container.lg" as="footer" role="contentinfo" py={{ base: '12', md: '16' }}>
        {/* eslint-disable-next-line */}
        <marquee direction="right" >
            <Text>!NOTE BOOK APP ISN'T IT AWESOME</Text>
        </marquee>
        <Stack spacing={{ base: '4', md: '5' }}>
            <Stack justify="space-between" align="center" direction={['column', 'row']}>
                <Heading>! NOTE BOOK</Heading>
                <ButtonGroup variant="ghost">
                    <IconButton
                        icon={<FaLinkedin fontSize="1.25rem" />}
                        as="a"
                        href="https://www.linkedin.com/in/deepak-gusaiwal-721795222"
                        target="_blank"
                        />
                    <IconButton
                        as="a"
                        href="https://github.com/Deepak-gusaiwal"
                        target="_blank" aria-label="GitHub" icon={<FaGithub fontSize="1.25rem" />} />
                    <IconButton
                        as="a"
                        href="https://www.youtube.com/channel/UCyqAlbXWsQ9hmVOZ8ianz9g"
                        target="_blank"
                        icon={<FaYoutube fontSize="1.25rem" />}
                        />
                </ButtonGroup>
            </Stack>
             {/* eslint-disable-next-line */}
            <marquee direction="left">
                <Text>!NOTE BOOK APP ISN'T IT AWESOME</Text>
            </marquee>
            <Text fontSize="sm" color="">
                &copy; {new Date().getFullYear()} !NOTE BOOK, All rights reserved.
            </Text>
        </Stack>
    </Container>
)

export default Footer