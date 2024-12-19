import { useState } from "react";
import UserService from "../../services/UserService";

const UserLoginForm: React.FC = () => {
  const [username, setUsername] = useState(""); // State for the username
  const [password, setPassword] = useState(""); // State for the password
  const [errorMessages, setErrorMessages] = useState<{ message: string; type: "success" | "error" }[]>([]); // State for status messages

  const clearErrors = () => {
    setErrorMessages([]); // Clear all status messages
  };

  const validate = (): boolean => {
    let isValid = true;
    if (!username.trim()) {
      setErrorMessages((prev) => [
        ...prev,
        { message: "Username is required", type: "error" },
      ]);
      isValid = false;
    }
    if (!password.trim()) {
      setErrorMessages((prev) => [
        ...prev,
        { message: "Password is required", type: "error" },
      ]);
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent page refresh
    clearErrors(); // Reset errors

    if (!validate()) {
      return; // Exit if validation fails
    }

    try {
      const response = await UserService.loginUser({ username, password }); // Pass username and password to the service
      sessionStorage.setItem("loggedInUser", response.username); // Save the username from the response in session storage
      sessionStorage.setItem("jwtToken", response.token); // Save the JWT token in session storage
      window.location.href = "/"; // Redirect to homepage
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Login failed. Please try again.";
      // Handle login failure
      setErrorMessages([
        { message: errorMessage, type: "error" },
      ]);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h3 className="text-3xl font-bold text-center mb-6">Login</h3>

        {errorMessages.length > 0 && (
          <ul className="mb-4">
            {errorMessages.map(({ message, type }, index) => (
              <li
                key={index}
                className={`text-center mb-2 ${
                  type === "success" ? "text-green-500" : "text-red-500"
                }`}
              >
                {message}
              </li>
            ))}
          </ul>
        )}

        <form onSubmit={handleSubmit}>
          <label htmlFor="usernameInput" className="block text-sm font-medium mb-2">
            Username:
          </label>
          <input
            id="usernameInput"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)} // Update username state
            className="w-full p-3 rounded-lg text-black focus:ring-2 focus:ring-blue-600 mb-4"
            placeholder="Enter your username"
          />

          <label htmlFor="passwordInput" className="block text-sm font-medium mb-2">
            Password:
          </label>
          <input
            id="passwordInput"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)} // Update password state
            className="w-full p-3 rounded-lg text-black focus:ring-2 focus:ring-blue-600 mb-4"
            placeholder="Enter your password"
          />

          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserLoginForm;
