import "./feed.css"
import Share from "../share/Share"
import Post from "../post/Post"
import { useEffect,useState } from "react";
import axios from "axios"
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

export default function Feed({username}) {
  const [posts,setPosts] = useState([]);
  const {user} = useContext(AuthContext)
  
    useEffect(()=>{

      const fetchPosts = async () => {
            
            const res = username
            ? await axios.get("posts/profile/" + username)
            : await axios.get("posts/timeline/"+ user._id)
            console.log(res.data );
            console.log("After axios call in feed");
            setPosts(res.data);
            
          };

      fetchPosts();
                  
    },[username,user._id]); {/*the empty braces make it so useeffect is only used once*/};
    
    
    return (
    <div className="feed">
        <div className="feedWrapper">
           <Share/>
           {
           
              posts.map((p) => (
             <Post 
             key={p._id} 
             post={p}
             
             
             />
             
           ))}
           
          
        </div>
    </div>
  );
}
