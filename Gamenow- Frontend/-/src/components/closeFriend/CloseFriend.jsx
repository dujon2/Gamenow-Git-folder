import './closeFriend.css'

export default function CloseFriend({user}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;//Gets URL from .env folder

  return (
          <li className="sidebarFriend">
              <img className="sidebarFriendImg" src={PF + user.profilePicture} alt="" />
              <span className="sidebarFriendName">{PF + user.username}</span>
          </li>
  )
}
