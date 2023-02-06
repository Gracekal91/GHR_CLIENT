import OrganizationLogin from "../../components/OrganizationLogin"
const Authentication = () =>{
    return (
        <>
            <div className="login_page">
                <div className="lgp_header">
                    <div className="logo">HRMS</div>
                </div>
                <OrganizationLogin />
                <div className="lgp_footer"></div>
            </div>
        </>
    )
}

export default Authentication