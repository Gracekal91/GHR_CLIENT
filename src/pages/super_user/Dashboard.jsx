import Header from '../../components/shared/Header';
import LeftPanel from "../../components/dashboards/LeftPanel";
import Organization from "../../components/dashboards/Organization";
import DashboardMain from "../../components/dashboards/DashboardMain";
import {useState} from "react";
import Admins from "../../components/dashboards/Admins";

const Dashboard = () => {
    const [currentTab, setCurrentTab] = useState(0)
    return (
        <>
            <Header isDashboard={true}/>
            <div className="dashboard_container">
                <LeftPanel setCurrentTab={setCurrentTab} currentTab={currentTab}/>
                {currentTab === 0 && <DashboardMain/>}
                {currentTab === 1 && <Organization setCurrentTab={setCurrentTab}/>}
                {currentTab === 2 && <Admins setCurrentTab={setCurrentTab} />}
            </div>
        </>
    )
}

export default Dashboard