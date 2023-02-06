import Header from '../../components/shared/Header';
import LeftPanel from "../../components/dashboards/LeftPanel";
import Organization from "../../components/dashboards/Organization";
import DashboardMain from "../../components/dashboards/DashboardMain";
import {useState} from "react";
import Employees from "../../components/dashboards/Employees";

const Dashboard = () => {
    const [currentTab, setCurrentTab] = useState(0)
    return (
        <>
            <Header/>
            <div className="dashboard_container">
                <LeftPanel setCurrentTab={setCurrentTab} currentTab={currentTab} admin={true}/>
                {currentTab === 0 && <DashboardMain/>}
                {currentTab === 2 && <Employees setCurrentTab={setCurrentTab} />}
            </div>
        </>
    )
}

export default Dashboard