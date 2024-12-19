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

const UserService = {
    loginUser,
};

export default UserService;
