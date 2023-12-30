import React,{useState,useEffect} from 'react';
import { useAuth,writeSceneData,readSceneDataOnce } from '../utils/firebase';
import CollaborationModal from './CollaborationModal';
import { Excalidraw} from '@excalidraw/excalidraw';
import Addons from './Addons';
import {GithubIcon,TwitterIcon,DiscordIcon} from '../utils/createicons';
import { getRoomIdFromUrl } from '../utils/roomids';

function Whiteboard(){ 
  const user=useAuth();
  const [iscollaborating, setIscollaborating] = useState(false);
  const [sceneData, setSceneData] = useState(null);
  const [initialData, setInitialData] = useState(null);
  const [updatedSceneData,setUpdatedSceneData]=useState(false);

  useEffect(() => {
    // Fetch sceneData only if the user is available
    if (user) {
      const fetchData = async () => {
        try {
          let data = await readSceneDataOnce(user.email);
          if(!data){
            writeSceneData(user.email,data);
            data=readSceneDataOnce(user.email);
          }
          setSceneData(data);
          setUpdatedSceneData(true);
        } catch (error) {
          // Handle error
          console.error(error);
        }
      };
      fetchData();
    }
  }, [user,iscollaborating]);

  useEffect(() => {
    // Update initialData when sceneData changes
    if (sceneData) {
      setInitialData({
        elements: sceneData.data,
      });
    }
  }, [sceneData]);

  const onChange = (data) => {
    // Check if sceneData is set before updating
    if (updatedSceneData) {
      writeSceneData(user.email, data);
    }
  };
  
  function onStartSession(){
    setIscollaborating(true);
  }

  function onStopSession(){
    setIscollaborating(false);
  }

  return (
    <div style={{ height: "100vh" }}>
    {initialData &&
      <Excalidraw
        initialData={initialData}
        onChange={onChange}
        UIOptions={{
          // this effectively makes the sidebar dockable on any screen size,
          // ignoring if it fits or not
          dockedSidebarBreakpoint: 0,
        }}
        renderTopRightUI={() => (
          <CollaborationModal
            onStartSession={onStartSession}
            onStopSession={onStopSession}
          />
        )}
      >
        <Addons
          GithubIcon={GithubIcon}
          TwitterIcon={TwitterIcon}
          DiscordIcon={DiscordIcon}
        />
      </Excalidraw>
    }
    </div>
  );
}

export default Whiteboard;
