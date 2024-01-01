import React,{useState,useEffect} from 'react';
import { useAuth,writeSceneData,readSceneDataOnce, writeRoomData, readRoomData } from '../utils/firebase';
import CollaborationModal from './CollaborationModal';
import { Excalidraw} from '@excalidraw/excalidraw';
import Addons from './Addons';
import {GithubIcon,TwitterIcon,DiscordIcon} from '../utils/createicons';
import { getRoomIdFromUrl } from '../utils/roomids';

//url http://localhost:3000/?room=94adde09-939b-448d-9370-4ad098aaa710 should be handled properly.
//when we refresh http://localhost:3000/?room=94adde09-939b-448d-9370-4ad098aaa710 it shouldn't go back to http://localhost:3000/

function Whiteboard(){ 
  console.log('whiteboard');
  const user=useAuth();
  const roomid=getRoomIdFromUrl();
  const [iscollaborating, setIscollaborating] = useState(getRoomIdFromUrl()?true:false);
  const [sceneData, setSceneData] = useState(null);
  const [initialData, setInitialData] = useState(null);
  const [updateDB,setUpdateDB] = useState(false);

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        try {
          let data = await readSceneDataOnce(user.email);
          if(!data){
            writeSceneData(user.email,data);
            data=readSceneDataOnce(user.email);
          }
          setSceneData(data);
        } catch (error) {
          console.error(error);
        }
      };
      const fetchRoomData = async () => {
        try {
          let data = await readRoomData(roomid);
          if(!data){
            writeRoomData(roomid,user,data);
            data=readRoomData(roomid);
          }
          setSceneData(data);
        } catch (error) {
          console.error(error);
        }
      }
      iscollaborating ? fetchRoomData() :fetchData();
    }
  }, [user,iscollaborating,roomid]);

  useEffect(() => {
    if (sceneData) {
      setInitialData({
        elements: sceneData['data'],
      });
    }
  }, [sceneData]);

  useEffect(() => {
      const handleBeforeUnload = (event) => {
        setUpdateDB(true);
      };
      window.addEventListener('beforeunload', handleBeforeUnload);
      // Cleanup event listeners on component unmount
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
  }, []);

  const onChange = (data) => {
    // Check if sceneData is set before updating
    if(updateDB) writeSceneData(user.email, data);
  };

  function onStartSession(){
    setIscollaborating(true);
  }

  function onStopSession(){
    setIscollaborating(false);
  }

  const RoomonChange = async (data) => {
    if(user && updateDB) writeRoomData(roomid,user,data);
  }

  return (iscollaborating 

    ? 

    <div style={{ height: "100vh" }}>
    {initialData &&
      <Excalidraw
        initialData={initialData}
        onChange={RoomonChange}
        UIOptions={{
          // this effectively makes the sidebar dockable on any screen size,ignoring if it fits or not
          dockedSidebarBreakpoint: 0,
        }}
        renderTopRightUI={() => (
          <CollaborationModal
            onStartSession={onStartSession}
            onStopSession={onStopSession}
            iscollaborating={iscollaborating}
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

    :

    <div style={{ height: "100vh" }}>
    {initialData &&
      /*render Excalidraw component only when initalData is updated.*/
      <Excalidraw
        initialData={initialData}
        onChange={onChange}
        UIOptions={{
          // this effectively makes the sidebar dockable on any screen size,ignoring if it fits or not
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
