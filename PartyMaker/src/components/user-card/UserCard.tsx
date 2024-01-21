import React from 'react'
import { User } from '../../types-env'
import './userCard.scss'
type UserCardProps = {
    user: User;
  };
  
const UserCard : React.FC<UserCardProps> = ({ user }) => {
const randomImages :string[] = ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlhoggWrGd9lCH5w1U1beZzf9p7RY1jKaH6Q&usqp=CAU','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTamq95RbRKnL2w1p8KyhKTu2VQ3PjSM_Kig&usqp=CAU','https://img.freepik.com/free-photo/handsome-man-with-glasses_144627-18665.jpg?size=626&ext=jpg&uid=R96966099&ga=GA1.2.9697832.1687471476&semt=ais','https://img.freepik.com/premium-photo/woman-beach-wearing-hat-sunglasses_863234-95.jpg?size=626&ext=jpg&uid=R96966099&ga=GA1.2.9697832.1687471476&semt=sph','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeN9C9rKuQKdYiUUrXzgzgGKlHCF8XNsi6hg&usqp=CAU'] 

    
  return (
    <div className='userCard-main'>
      <img className='userCard-main-img' src={randomImages[Math.floor(Math.random() * randomImages.length)]} alt="user" />
        <p className='userCard-main-username'>{user.username}</p>
        <p className='userCard-main-phone_number'>{user.phone_number}</p>
    </div>
  )
}

export default UserCard
