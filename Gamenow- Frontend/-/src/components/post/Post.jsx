import "./post.css";
import { MoreVert } from "@material-ui/icons";
import {useEffect,useState,useContext} from "react";
import axios from "axios";
import {format } from "timeago.js"
import{Link} from "react-router-dom"
import { AuthContext } from "../../context/AuthContext";

export default function Post({post}) {
    const [like,setLike] = useState(post.likes.length);//usestate hook for likes
    const [isLiked,setIsLiked] = useState(false);
    const [user,setUser] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;//Gets URL from .env folder
    const {user:currentUser} = useContext(AuthContext)//since  the keyword "user" is already in use this(x:y) allows you to use y as a placeholder/nickname for x

    useEffect(()=>{
        setIsLiked(post.likes.includes(currentUser._id))
    }, [currentUser._id, post.likes]);

    useEffect(()=>{
       
        console.log(post);
        const fetchUser = async () => {
        const res = await axios.get(`/users?userId=${post.userId}`)
        setUser(res.data);
        console.log(post.userId);
        console.log(res.data)
      };
        fetchUser();
      }, [post.userId]); {/*the empty braces make it so useeffect is only used once*/};
      

      const likeHandler = () => {
       try{ 
        axios.put("/posts/"+ post._id+ "/like",{userId:currentUser._id });
    } catch(err) {}
        setLike(isLiked ? like-1 : like+1)
        setIsLiked(!isLiked)
      }
   
  return (
    <div className="post">
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <Link to={`profile/${user.username}`}>
                    <img 
                        className="postProfileImg" 
                        src={user.profilePicture ? PF +  user.profilePicture : PF+"person/noAvatar.png"} 
                        alt=""
                    />
                    </Link>
                    <span className="postUsername">{user.username}</span>
                    <span className="postDate">{format(post.date)}</span>
                </div>
                <div className="postTopRight">
                    <MoreVert/>
                </div>
            </div>
            <div className="postCenter">
                <span className="postText">
                   {post?.desc /*? because some post dont have descriptions*/  }
                </span>
                <img 
                    className="postImg" 
                    src={PF + post.img} 
                    alt=""
                />
            </div>
            <div className="postBottom">
                <div className="postBottomLeft">
                    <img 
                        className="likeIcon" 
                        src={`${PF}like.png`}
                        onClick={likeHandler} 
                        alt=""
                    />
                    <img 
                        className="likeIcon" 
                        src={`${PF}heart.png `}
                        onClick={likeHandler}
                        alt=""
                    />
                    <span className="postLikeCounter">{like}</span>
                </div>
                <div className="postBottomRight">
                    <span className="postCommentText">{post.comment} comments</span>
                </div>
            </div>

        </div>
    </div>
  )
}
