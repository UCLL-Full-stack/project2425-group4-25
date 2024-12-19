import React, { useState } from "react";
import UserService from "../../services/UserService";

const UserSignupForm: React.FC = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
        role: "user", // Default role
    });

    const [errorMessages, setErrorMessages] = useState<string[]>([]);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessages([]);
        setSuccessMessage(null);

        // Simple validation
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.username || !formData.password) {
            setErrorMessages(["All fields are required."]);
            return;
        }

        try {
            await UserService.signupUser(formData);
            setSuccessMessage("Signup successful! You can now log in.");
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                username: "",
                password: "",
                role: "user",
            });
        } catch (error) {
            setErrorMessages(["Failed to sign up. Please try again."]);
        }
    };

    return (
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md mx-auto">
            <h3 className="text-3xl font-bold text-center text-white mb-4">Sign Up</h3>

            {errorMessages.length > 0 && (
                <div className="text-red-500 mb-4">
                    {errorMessages.map((msg, index) => (
                        <p key={index}>{msg}</p>
                    ))}
                </div>
            )}

            {successMessage && (
                <div className="text-green-500 mb-4">{successMessage}</div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-300 mb-2">First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-300 mb-2">Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-300 mb-2">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-300 mb-2">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-300 mb-2">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-300 mb-2">Role</label>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="guest">Guest</option>
                        <option value="employee">Employee</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default UserSignupForm;
