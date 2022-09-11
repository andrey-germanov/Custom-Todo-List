import { ArrowRightOutlined } from '@ant-design/icons';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button } from "antd";
import Profile from '../../../Auth0/Profile';
import LogoutButton from '../../../Auth0/LogoutButton';
import LoginButton from '../../../Auth0/LoginButton';
import s from './SideBar.module.scss';
import { Link } from 'react-router-dom';
import { t } from 'i18next';

interface ISideBar {
    switcherSideBar : () => void;
    setSwithSideBar: (value: boolean) => void;
    setLanguage:    (language: string) => void;
    isAuthenticated: boolean;
    setShowSideBarInfo: (value: boolean) => void;
    showSideBarInfo: boolean;
    switchSideBar: boolean;
}
export const SideBar = ({switchSideBar, switcherSideBar, isAuthenticated, setLanguage}:ISideBar) => {

    return (
    <div className={`${s.todoSidebar} ${!switchSideBar && s.openedMenu}`}>
        <div onClick={switcherSideBar} className={`${s.menuIcon} ${s.openedMenu}`}>
          {!switchSideBar ? <ArrowRightOutlined /> : <> <span className={s.sideBarTitle}>{`${t('titleSideBar')}`}</span> <ArrowLeftOutlined /> </>}
        </div>
        {
          switchSideBar &&
          <div className={s.sideBarItems}>
                <div className={s.todoProfile}>
                  <Profile />
                </div>
                <div className={s.sideBarNavigate}>
                    <ul>
                        <li>
                            <Link to="/home">Home</Link>
                        </li>
                        <li>
                            <Link to="/todoList">TodoList</Link>
                        </li>
                        <li>
                            <Link to="/archive">Archive</Link>
                        </li>
                    </ul>
                </div>
                <div className={s.sideBarControls}>
                  <Button onClick={() => setLanguage("en")}>ENGLISH</Button>
                  <Button onClick={() => setLanguage("ru")}>ru</Button>
                  { isAuthenticated ? <LogoutButton /> : <LoginButton />}
                </div>    
          </div>
        }
       
      </div>
  )
}
