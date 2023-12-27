import React, { useState } from 'react';
import { LiveCollaborationTrigger } from '@excalidraw/excalidraw';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  useDisclosure,
  Center,
  Divider
} from '@chakra-ui/react';
import { getSessionURL } from '../services/roomids';


const CollaborationModal = ({onStartSession, onStopSession }) => {
  const [isSessionStarted, setSessionStarted] = useState(false);
  const [createdRoom,setCreatedRoom] = useState(false);
  const [sessionUrl,setSessionUrl] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleStartSession = () => {
    // Call the function to start the collaboration session
    onStartSession();
    setSessionStarted(true);
    if(!createdRoom){
      const url=getSessionURL();
      setSessionUrl(url);
      setCreatedRoom(true);
    }
  };

  const handleStopSession = () => {
    onStopSession();
    setSessionStarted(false);
  }

  return (
    <>
      <LiveCollaborationTrigger isCollaborating={isSessionStarted} onClick={onOpen} />
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          {!isSessionStarted && 
          <Center>
            <div>
              <img width="300" height="300" src="https://img.icons8.com/ios-glyphs/480/6965db/batch-assign.png" alt="batch-assign"/>
            </div>
          </Center>}
          <ModalHeader fontSize="20px" textAlign="center">Live Collaboration...</ModalHeader>
          <ModalCloseButton />
          <ModalBody paddingLeft='50px' paddingRight='50px' fontSize="14px">
            {isSessionStarted ? (
              <>
                <Input value={sessionUrl} readOnly />
                <br/><br/>
                <Center><Button fontSize="14px" color='red' borderColor='red' onClick={handleStopSession}><img width="20" height="20" src="https://img.icons8.com/sf-black-filled/64/ff0000/stop.png" alt="stop"/><pre> Stop Session</pre></Button></Center>
                <br/>
                <Divider/>
                <br/>
                <p>🔒 Don't worry, the session uses end-to-end encryption, so whatever you draw will stay private. Not even our server will be able to see what you come up with. Stopping the session will disconnect you from the room, but you'll be able to continue working with the scene, locally. Note that this won't affect other people, and they'll still be able to collaborate on their version.</p>
              </>
            ) : (
              <>
                <br/>
                <Center>
                  <p><strong>You can invite people to your current scene to collaborate with you.</strong></p> 
                </Center>
                <Center>
                  <p>Don't worry, the session uses end-to-end encryption, so whatever you draw will stay private. Not even our server will be able to see what you come up with.</p>
                </Center>
                <br/>
                <Center>
                  <Button fontSize="14px" bg='#6965db' color='white' _hover={{ bg: '#5753d0' }} onClick={handleStartSession}><img width="20" height="20" src="https://img.icons8.com/ios/50/FFFFFF/play--v1.png" alt="play--v1"/><pre> Start session</pre></Button>
                </Center>
              </>
            )}
          </ModalBody>
          <Center>
          <ModalFooter fontSize="10px">
              <strong>© 2023 Powered by Firebase.</strong>
          </ModalFooter>
          </Center>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CollaborationModal;
