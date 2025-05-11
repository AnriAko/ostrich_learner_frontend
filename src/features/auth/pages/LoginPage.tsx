// src/pages/UsersPage.tsx
import { useState } from "react";
import { useAllUsers } from "../hooks/useAuth";
import { Link } from "react-router-dom";
import type { GetUserDto } from "../dto/getUser.dto";

const UsersPage = () => {
    const { data = [], isLoading } = useAllUsers();
    const users = data as GetUserDto[];

    const [search, setSearch] = useState("");
    const [userId, setUserId] = useState("");
    const [foundUser, setFoundUser] = useState<GetUserDto | null>(null);

    const handleSearchById = () => {
        const user = users.find((u) => u.id === userId);
        setFoundUser(user || null);
    };

    const filteredUsers = users.filter((user) =>
        user.nickname.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <h1>All Users</h1>

            <input
                placeholder="Search by nickname"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {filteredUsers.map((user) => (
                        <li key={user.id}>{user.nickname}</li>
                    ))}
                </ul>
            )}

            <hr />

            <input
                placeholder="Find by ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
            />
            <button onClick={handleSearchById}>Find User</button>

            {foundUser && <p>Found: {foundUser.nickname}</p>}
            {!foundUser && userId && <p>User not found</p>}

            <Link to="/create">Go to Create User</Link>
        </div>
    );
};

export default UsersPage;
