import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../services/firebase';
import CollaborationModal from './CollaborationModal';
import { Excalidraw} from '@excalidraw/excalidraw';
import Addons from './Addons';
import {GithubIcon,TwitterIcon,DiscordIcon} from '../services/createicons';

function Whiteboard() {
  const user=useAuth();
  const navigate = useNavigate();
  const [iscollaborating, setIscollaborating] = useState(false);
  
  function onStartSession(){
    setIscollaborating(true);
  }

  function onStopSession(){
    setIscollaborating(false);
  }

  return (
    <div style={{ height: "100vh" }}>
      <Excalidraw
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
    </div>
  );
}

export default Whiteboard;
