import React,{useState} from 'react';
import clsx from "clsx";
import { Excalidraw,WelcomeScreen,Sidebar,Footer,LiveCollaborationTrigger, MainMenu} from '@excalidraw/excalidraw';
import Chat from './Chat';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../services/firebase';

const createIcon = (d, opts = 512) => {
  const { width = 512, height = width, mirror, style, ...rest } =
    typeof opts === 'number' ? { width: opts } : opts;
  return (
    React.createElement('svg', {
      'aria-hidden': 'true',
      focusable: 'false',
      role: 'img',
      viewBox: `0 0 ${width} ${height}`,
      className: clsx({ 'rtl-mirror': mirror }),
      style: style,
      ...rest,
    },
    typeof d === 'string' ? React.createElement('path', { fill: 'currentColor', d: d }) : d)
  );
};

const tablerIconProps = {
  width: 24,
  height: 24,
  fill: 'none',
  strokeWidth: 2,
  stroke: 'currentColor',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

const modifiedTablerIconProps = {
  width: 20,
  height: 20,
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

const GithubIcon = createIcon(
  <path
    d="M7.5 15.833c-3.583 1.167-3.583-2.083-5-2.5m10 4.167v-2.917c0-.833.083-1.166-.417-1.666 2.334-.25 4.584-1.167 4.584-5a3.833 3.833 0 0 0-1.084-2.667 3.5 3.5 0 0 0-.083-2.667s-.917-.25-2.917 1.084a10.25 10.25 0 0 0-5.166 0C5.417 2.333 4.5 2.583 4.5 2.583a3.5 3.5 0 0 0-.083 2.667 3.833 3.833 0 0 0-1.084 2.667c0 3.833 2.25 4.75 4.584 5-.5.5-.5 1-.417 1.666V17.5"
    strokeWidth="1.25"
  />,
  modifiedTablerIconProps,
);

const DiscordIcon = createIcon(
  <g strokeWidth="1.25">
    <path d="M7.5 10.833a.833.833 0 1 0 0-1.666.833.833 0 0 0 0 1.666ZM12.5 10.833a.833.833 0 1 0 0-1.666.833.833 0 0 0 0 1.666ZM6.25 6.25c2.917-.833 4.583-.833 7.5 0M5.833 13.75c2.917.833 5.417.833 8.334 0" />
    <path d="M12.917 14.167c0 .833 1.25 2.5 1.666 2.5 1.25 0 2.361-1.39 2.917-2.5.556-1.39.417-4.861-1.25-9.584-1.214-.846-2.5-1.116-3.75-1.25l-.833 2.084M7.083 14.167c0 .833-1.13 2.5-1.526 2.5-1.191 0-2.249-1.39-2.778-2.5-.529-1.39-.397-4.861 1.19-9.584 1.157-.846 2.318-1.116 3.531-1.25l.833 2.084" />
  </g>,
  modifiedTablerIconProps,
);

const TwitterIcon = createIcon(
  <g strokeWidth="1.25">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c-.002 -.249 1.51 -2.772 1.818 -4.013z"></path>
  </g>,
  tablerIconProps,
);

function Whiteboard() {
  const user=useAuth();

  const [docked, setDocked] = useState(false);

  const navigate = useNavigate();

  const handleSignOut = () => {
    navigate('/signout');
  };

  return (
    <div style={{ height: "100vh" }}>
      <Excalidraw
        UIOptions={{
          // this effectively makes the sidebar dockable on any screen size,
          // ignoring if it fits or not
          dockedSidebarBreakpoint: 0,
        }}
        renderTopRightUI={() => (
          <LiveCollaborationTrigger
            // isCollaborating is another prop like onSelect which tells Whether live collaboration session is in effect. Modifies button style.
            onSelect={() => {
                window.alert("we need to show a unique room id for this.");
            }}
          />
        )}
      >
        <WelcomeScreen>
          <WelcomeScreen.Center>
            <WelcomeScreen.Center.Logo children='COLLABORATIVE WHITEBOARD'/>
            <WelcomeScreen.Center.Heading>Colab. Discuss. Design!</WelcomeScreen.Center.Heading>
            <WelcomeScreen.Hints.ToolbarHint/>
            <WelcomeScreen.Hints.MenuHint />
            <WelcomeScreen.Hints.HelpHint />
            <WelcomeScreen.Center.Menu>
              <WelcomeScreen.Center.MenuItemLink href="https://github.com/excalidraw/excalidraw">
                GitHub Page
              </WelcomeScreen.Center.MenuItemLink>
              <WelcomeScreen.Center.MenuItemLoadScene/>
              <WelcomeScreen.Center.MenuItemHelp />
            </WelcomeScreen.Center.Menu>
          </WelcomeScreen.Center>
        </WelcomeScreen>
        
        <MainMenu>
          <MainMenu.DefaultItems.LoadScene/>
          <MainMenu.DefaultItems.SaveToActiveFile/>
          <MainMenu.DefaultItems.Export/>
          <MainMenu.DefaultItems.Help/>
          <MainMenu.DefaultItems.ClearCanvas/>
          <MainMenu.Separator/>
          <MainMenu.Group>
            <MainMenu.ItemLink icon={GithubIcon} href="https://github.com/Vijayadityaraj-source">
              Github
            </MainMenu.ItemLink>
            <MainMenu.ItemLink icon={DiscordIcon} href="https://discordapp.com/users/1055038985841426464">
              Discord
            </MainMenu.ItemLink>
            <MainMenu.ItemLink icon={TwitterIcon} href="https://twitter.com/V_A_R_Rap">
              Twitter
            </MainMenu.ItemLink>
          </MainMenu.Group>
          <MainMenu.Separator/>
          <MainMenu.DefaultItems.ToggleTheme/>
          <MainMenu.DefaultItems.ChangeCanvasBackground/>
          <MainMenu.Separator/>
          <MainMenu.ItemLink icon={user && <img src={user.photoURL} alt="ProfilePic" style={{height:"25px",borderRadius:"50%"}}/>} href='/profile'>
            Profile
          </MainMenu.ItemLink>
          <MainMenu.Item onSelect={handleSignOut} >
            SignOut...
          </MainMenu.Item>
        </MainMenu>

        <Sidebar className='sidebar' name="custom" docked={docked} onDock={setDocked} style={{borderRadius: '10px',width: '30%', margin: '10px'}}>
          <Sidebar.Header />
          <Sidebar.Tabs style={{ padding: "0.5rem" }}>
            <Sidebar.Tab tab="one">

            <Chat/>

            </Sidebar.Tab>
            <Sidebar.Tab tab="two">
            
            Meeting component
            
            </Sidebar.Tab>
            <Sidebar.TabTriggers>
              <Sidebar.TabTrigger tab="one">Chat</Sidebar.TabTrigger>
              <Sidebar.TabTrigger tab="two">Meeting</Sidebar.TabTrigger>
            </Sidebar.TabTriggers>
          </Sidebar.Tabs>
        </Sidebar>

        <Footer>
          <Sidebar.Trigger
            name="custom"
            tab="one"
            style={{
              marginLeft: "0.5rem",
              background: "#70b1ec",
              color: "white",
            }}
          >
          Collab
          </Sidebar.Trigger>
        </Footer>
        
      </Excalidraw>
    </div>
  );
}

export default Whiteboard;
