import OrganizationContent from "./OrganizationContent";
import AdminContent from "./AdminContent";

const TableList = ({organizations, admins, org, administrators, empl, employees}) => {
    const user = JSON.parse(localStorage.getItem('user'));
    return (
        <>
            <div className="table_list">
                <table>
                    {
                        admins &&
                        <>
                            <thead>
                            <tr>
                                <th>Names</th>
                                <th>Organization</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                administrators
                                    .filter(item => item.role === 2)
                                    .map((administrator, index) => {
                                    return <AdminContent
                                        administrator={administrator}
                                        index={index}
                                        key={administrator.id}
                                        admins={true}
                                    />
                                })
                            }
                            </tbody>
                        </>
                    }
                    {org && <>
                        <thead>
                        <tr>
                            <th>Organizations</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>

                        {
                            organizations.map((organization, index) => {
                                return <OrganizationContent org={true} organization={organization} index={index} key={organization.id}
                                />
                            })
                        }

                        </tbody>
                    </>
                    }
                   {
                        empl &&
                        <>
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Surname</th>
                                <th>Email</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                employees
                                    .filter(item => item.org_id === user.org_id)
                                    .map((administrator, index) => {
                                        return <AdminContent
                                            administrator={administrator}
                                            index={index}
                                            key={administrator.id}
                                            admins={true}
                                        />
                                    })
                            }
                            </tbody>
                        </>
                    }
                </table>
            </div>
        </>
    )
}


export default TableList;