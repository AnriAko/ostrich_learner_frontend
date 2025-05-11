// src/pages/CreateUserPage.tsx
import { useState } from "react";
import { useCreateUser } from "../hooks/useAuth";
import { Link } from "react-router-dom";
import type { CreateUserDto } from "../dto/createUser.dto";

const CreateUserPage = () => {
    const [nickname, setNickname] = useState("");
    const { mutate, isPending, isSuccess, isError, error } = useCreateUser();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const userData: CreateUserDto = { nickname };
        mutate(userData);
    };

    return (
        <div>
            <h1>Create User</h1>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Enter nickname"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    required
                />
                <button type="submit" disabled={isPending}>
                    {isPending ? "Creating..." : "Create"}
                </button>
            </form>

            {isSuccess && (
                <p style={{ color: "green" }}>User created successfully!</p>
            )}
            {isError && (
                <p style={{ color: "red" }}>Error: {(error as any)?.message}</p>
            )}

            <Link to="/">← Back to main</Link>
        </div>
    );
};

export default CreateUserPage;
