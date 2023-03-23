import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar"
import Feed from "../../components/feed/Feed"
import Rightbar from "../../components/rightbar/Rightbar"
import axios from "axios"
import "./profile.css"
import {useEffect,useState} from "react";
import {useParams} from "react-router";



export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;//Gets URL from .env folder
  const [user, setUser] = useState({})
  const username = useParams().username;

  useEffect(()=>{
       
   
    const fetchUser = async () => {
    const res = await axios.get(`/users/?username=${username}`);//users/?username=john makes it so that it either searches the query or 
    setUser(res.data);
  };
    fetchUser();
  }, [username]); {/*the empty braces make it so useeffect is only used once*/};

  return (
    <>
    <Topbar />
        <div className="profile">
            <Sidebar/>
            <div className="profileRight">
                <div className="profileRightTop">
                    <div className="profileCover">
                      <img 
                        src={user.CoverPicture || PF +"person/noCover.png"} 
                        alt="" 
                        className="profileCoverImg" 
                      />
                      <img 
                        src={user.ProfilePicture || PF +"person/noAvatar.png"} 
                        alt="" 
                        className="profileUserImg" 
                      />
                    </div>
                    <div className="profileInfo">
                      <h4 className="profileInfoName">{user.username} </h4>
                      <span className="profileInfoDesc">{user.desc}</span>
                    </div>
                </div>
                <div className="profileRightBottom">
            
            <Feed username={username} />
            <Rightbar user={user}/>
            </div>
          </div>
        </div>
    </>
  )
}
