import React from 'react'
import { Alert, AlertIcon, Flex, useColorModeValue } from '@chakra-ui/react'

const AlertComponent = ({ alert }) => {
    const bgFlex = useColorModeValue("gray.200", "#111b1f");
    return <>
        <Flex bg={bgFlex} zIndex="1"
            position="fixed"
            top="80px"
            left="0"
            right="0"
           >
            {
                alert ?
                    <Alert status={alert.type}>
                        <AlertIcon />
                        {alert.msg}
                    </Alert> : ""
            }
        </Flex>
    </>
}

export default AlertComponent