import { Outlet } from 'react-router-dom';
import AppRoutes from './AppRoutes';

const MainContent = () => {
    return (
        <div className="page-content">
           <Outlet/>
        </div>
    );
}

export default MainContent;