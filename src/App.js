import './assets/scss/main.scss';
import Dashboard from './pages/super_user/Dashboard';
import DashboardAdmin from './pages/admin_admin/Dashboard';
import Authentication from './pages/auth/Authentication';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import _SuperAdmin from "./utils/_SuperAdmin";
import _AdminAdmin from "./utils/_AdminAdmin";
import HomeUser from "./pages/home/HomeUser";
import _EmployeeAndManager from "./utils/_EmployeeAndManager";

function App() {
    return (
        <div className="app_container">
            <Router>
                <Routes>
                    <Route path="/dashboard_super" element={
                        <_SuperAdmin>
                            <Dashboard/>
                        </_SuperAdmin>
                    }
                    />
                    <Route path="/dashboard_admin" element={
                        <_AdminAdmin>
                            <DashboardAdmin/>
                        </_AdminAdmin>
                    }
                    />
                    <Route path="/login" element={<Authentication/>}/>
                    <Route path="/" element={<Authentication/>}/>
                    <Route path="/home" element={
                        <_EmployeeAndManager>
                            <HomeUser/>
                        </_EmployeeAndManager>
                    }
                    />
                </Routes>
            </Router>
        </div>
    );
}

export default App;