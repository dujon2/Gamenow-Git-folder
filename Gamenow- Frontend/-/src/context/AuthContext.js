import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer"


const INITIAL_STATE ={
    user:{
        
_id:"61fce91f684eabc0f23e35eb",
username: "hey1",
email:"hey1@gmail.com",
profilePicture:"person/1.jpeg",
coverPicture:"",
isAdmin:false,
followers:[],
followings:[],
},
    isFetching:false,
    error:false
};


export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({children}) =>{
    const[state, dispatch] = useReducer(AuthReducer,INITIAL_STATE);

    return(
        <AuthContext.Provider 
          value={{
            user:state.user, 
            isFetching:state.isFetching,
            error:state.error,
            dispatch
        }}
        >
            {children}
        </AuthContext.Provider>
    )//wrapping all compenets with provider so context can be pulled from anywhere
}