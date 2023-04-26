import { useEffect, useState } from "react"
import Spinner from "../layout/Spinner";


export default function UserResults(){
    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        fetchUsers();
    },[])

    const fetchUsers = async () =>{
        const response = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`,{
            headers: {
                Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
            }
        })
        const data = await response.json();
        setUsers(data);
        setTimeout(()=>{setLoading(false)},3000)
        // setLoading(false);
    }

    if(!loading){
        return(
            <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
                {users.map((user) => {
                    return(
                        <h3 key={users.indexOf(user)}>{user.login} {users.indexOf(user)}</h3>
                    )
                })}
            </div>
        )
    } else {
        return( 
        <Spinner/>
        )
    }

    
}