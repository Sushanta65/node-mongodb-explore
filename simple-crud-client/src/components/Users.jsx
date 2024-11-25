import { useState } from "react";
import { useLoaderData } from "react-router-dom";

const Users = () => {
    const initialUsers = useLoaderData()
    const [users, setUsers] = useState(initialUsers)
    const handleDelete = _id => {
        console.log(_id)
        fetch(`http://localhost:5000/users/${_id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.deletedCount > 0) {
                alert("User Deleted Successfully!")
                const remainingUser = users.filter(user => user._id !== _id)
                setUsers(remainingUser)
            }
        })
    }
    
    return (
        <div>
            <h2>Users: {users.length}</h2>
            <div>
                {
                    users.map(user => <div key={user._id}>
                        <p>{user.name} : {user.email} : {user._id} <button onClick={() => handleDelete(user._id)}>x</button></p>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Users;