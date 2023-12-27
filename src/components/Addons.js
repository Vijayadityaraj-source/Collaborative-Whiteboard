import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Chat from './Chat';
import { useAuth } from '../services/firebase';
import { WelcomeScreen,Sidebar,Footer, MainMenu} from '@excalidraw/excalidraw';

export default function Addons({GithubIcon,DiscordIcon,TwitterIcon}) {
  const user=useAuth();
  const navigate = useNavigate();
  const [docked, setDocked] = useState(false);

  const handleSignOut = () => {
    navigate('/signout');
  };

  return (
    <div>
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
    </div>
  )
}
