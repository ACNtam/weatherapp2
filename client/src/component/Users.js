
const Users = ({users, handleClick})=>{
return(
    <div className="users">
        <table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Favorite City</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {
                users.map((user)=>{
                    return(
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.favorite_city}</td>
                            <td><button onClick={()=>{handleClick(user.id)}}>View Weather</button></td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    </div>
)
}

export default Users;