import { useState, useContext } from "react";
import { useGetAllUsers } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { AuthService } from "../services/AuthService";
import { UserContext } from "../../../shared/context/UserContext";

const UsersPage = () => {
    const { data: users = [], isLoading } = useGetAllUsers();
    const [search, setSearch] = useState("");
    const { setUser } = useContext(UserContext)!;
    const navigate = useNavigate();

    const handleLogin = async (id: string) => {
        try {
            const fullUser = await AuthService.getFullUserById(id);
            if (fullUser) {
                setUser(fullUser);
                navigate("/");
            }
        } catch (err) {
            console.error("Login failed:", err);
        }
    };

    const filteredUsers = users.filter((user) =>
        user.nickname.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="max-w-xl mx-auto mt-12 p-6 border-2 border-gray-300 rounded-lg">
            <h1 className="text-3xl font-bold mb-6 text-center">
                Select User to Login
            </h1>

            <input
                type="text"
                placeholder="Search by nickname..."
                className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {isLoading ? (
                <p className="text-center">Loading...</p>
            ) : filteredUsers.length > 0 ? (
                <div className="border-2 border-gray-300 rounded-lg p-4 overflow-y-auto max-h-[calc(3*(4rem+1rem))] scrollbar-custom">
                    <ul className="flex flex-col">
                        {filteredUsers.map((user) => (
                            <li
                                key={user.id}
                                onClick={() => handleLogin(user.id)}
                                className="cursor-pointer bg-white border border-gray-300 hover:bg-blue-100 w-full h-12 flex items-center justify-center text-center text-lg font-semibold transition-colors duration-200 shadow-sm"
                            >
                                {user.nickname}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p className="text-center text-gray-500">No users found.</p>
            )}

            <hr className="my-8" />

            <div className="text-center">
                <Link
                    to="/create"
                    className="text-blue-600 hover:underline text-sm"
                >
                    Create New User
                </Link>
            </div>
        </div>
    );
};

export default UsersPage;
