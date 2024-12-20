import { User } from "@types";

const loginUser = async (credentials: { username: string; password: string }) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
    }

    const data = await response.json();
    return {
        username: data.username,
        token: data.token,
    };
};

const signupUser = async (user: User) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Signup failed");
    }

    const data = await response.json();
    return {
        username: data.username,
        token: data.token,
    };
};

const getUsers = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`);
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error( errorData.message ||"Failed to fetch users");
    }
    const data = await response.json();
    return data;
};

const UserService = {
    loginUser,
    signupUser,
    getUsers,
};

export default UserService;
