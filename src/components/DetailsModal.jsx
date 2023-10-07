/* eslint-disable react/prop-types */
import React from "react"
import {Button, Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure, Text} from "@chakra-ui/react"
export const DetailsModal = ({title, src, description}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
  return (
    <>
        <Button ref={btnRef} bg={"gray.700"} _hover={{bg: "gray.600"}} color={"white"} onClick={onOpen} w={"100%"} my={3}>Details</Button>
        <Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef}>
            <DrawerOverlay/>
            <DrawerContent>
                <DrawerCloseButton/>
                <DrawerHeader>{title}</DrawerHeader>
                <DrawerBody>
                    <img src={src} width={"100%"} id="poster" alt={title} />
                    <Text py={2}>{description}</Text>
                </DrawerBody>
                <DrawerFooter>
                    <Button variant="outline" mr={3} onClick={onClose}>Cancel</Button>
                    <Button colorScheme="blue">Watch</Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    </>
  )
}