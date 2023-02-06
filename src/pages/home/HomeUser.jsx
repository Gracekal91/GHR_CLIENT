import Header from "../../components/shared/Header";
import HomeBanner from "../../components/home/HomeBanner";
import HomeCard from "../../components/home/HomeCard";

const HomeUser = () =>{
    return(
        <>
            <Header isHome={true}/>
            <HomeBanner />
            <div className="home_main_section">
                <HomeCard
                    title="Time Off"
                    timeOff={true}
                />
                <HomeCard
                    title="People on leave"
                    onLeave={true}
                />
                <HomeCard title="Company's links"/>
            </div>
            <div className="home_main_section_2">
                <HomeCard
                    title="Celebrations"
                    celebration={true}
                    announcements={true}
                />
                <HomeCard
                    title="Announcements"
                    isLarge={true}
                    announcement={true}
                />
            </div>
        </>
    )
}

export default  HomeUser;