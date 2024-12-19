import React, { useState } from "react";
import UserService from "../../services/UserService";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

const UserSignupForm: React.FC = () => {
    const { t } = useTranslation("common");
    const router = useRouter();

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
            setErrorMessages([t("signup.errors.requiredFields")]);
            return;
        }

        try {
            await UserService.signupUser(formData);
            setSuccessMessage(t("signup.success"));
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                username: "",
                password: "",
                role: "customer",
            });
            router.push("/login");
        } catch (error) {
            setErrorMessages([t("signup.errors.failed")]);
        }
    };

    return (
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md mx-auto">
            <h3 className="text-3xl font-bold text-center text-white mb-4">{t("signup.title")}</h3>

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
                    <label className="block text-gray-300 mb-2">{t("signup.labels.firstName")}</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-300 mb-2">{t("signup.labels.lastName")}</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-300 mb-2">{t("signup.labels.email")}</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-300 mb-2">{t("signup.labels.username")}</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-300 mb-2">{t("signup.labels.password")}</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-300 mb-2">{t("signup.labels.role")}</label>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="customer">{t("signup.roles.customer")}</option>
                        <option value="employee">{t("signup.roles.employee")}</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
                >
                    {t("signup.button")}
                </button>
            </form>
        </div>
    );
};

export default UserSignupForm;