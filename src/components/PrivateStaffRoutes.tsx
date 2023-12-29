import { Outlet, Navigate, useNavigate } from 'react-router-dom'
import { useSelectorRoot } from '../redux/store';
import { useEffect } from 'react';
import { notification } from 'antd';
import { ROLE } from '../enums/role.enum';

type Props = {
    children?: React.ReactNode
};

const PrivateSellerRoutes = ({children}: Props) => {
    const {
        userRole
    } = useSelectorRoot((state) => state.login);
    const navigate = useNavigate();


    useEffect(()=>{
        if(userRole !== ROLE.STAFF){
            notification.open({
                message: "Bạn không phải nhân viên",
                onClick: () => {
                    console.log("Notification Clicked!");
                },
                style: {
                    marginTop: 50,
                    paddingTop: 40,
                },
            });
            // navigate('/')
        }
    },[userRole])

    return(
        (userRole === ROLE.STAFF) ? <Outlet/> : <Navigate to="/"/>
    )
}

export default PrivateSellerRoutes