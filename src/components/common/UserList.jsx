import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";
import usersData from "../../data/projectss-data.json";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setUsers(usersData);
    }, 1000);
  }, []);

  return (
    <div className=" bg-gray-500 ">
      {users.length === 0
        ? Array(3)
            .fill()
            .map((_, idx) => <div key={idx}></div>)
        : users.map((user) => <UserCard key={user.id} user={user} />)}
    </div>
  );
};

export default UserList;
