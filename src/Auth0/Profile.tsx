import { useAuth0, User } from "@auth0/auth0-react";
import s from './Style.module.scss';

const Profile = () => {
  const { user, isAuthenticated, isLoading }: User = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return (
    
      <>
        {isAuthenticated && 
            <div className={s.userInfo}>
                <img src={user.picture} alt={user.name} />
                <span>{user.name}</span>
            </div>
        }
      </>
  );
};

export default Profile;