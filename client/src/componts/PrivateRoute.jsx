import { useSelector } from 'react-redux'
import Header from '../componts/Header'
import { Outlet,Navigate } from 'react-router-dom'

export default function PrivateRoute() {
  const{currentUser} = useSelector((state)=>state.user)
return currentUser?<Outlet/>:<Navigate to='/signup'/>
}


