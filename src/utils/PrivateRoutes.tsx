import { Outlet, Navigate, useNavigate } from 'react-router-dom'
import { useSelectorRoot } from '../redux/store';
import { useEffect } from 'react';

type Props = {
    children?: React.ReactNode
  };

const PrivateRoutes = ({children}: Props) => {
    const {
        tokenLogin
    } = useSelectorRoot((state) => state.login);

    return(
        tokenLogin ? <Outlet/> : <Navigate to="/"/>
    )
}

export default PrivateRoutes