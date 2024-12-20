import { User } from '../model/user';
import userDB from '../repository/user.db';
import bcrypt from 'bcrypt';
import { AuthenticationResponse, Role, UserInput } from '../types';
import { generateJWTtoken } from '../util/jwt';

const getAllUsers = async (): Promise<User[]> => userDB.getAllUsers();

const getUserByUsername = async ({ username }: { username: string }): Promise<User> => {
    const user = await userDB.getUserByUsername({ username });
    if (!user) {
        throw new Error(`User with username: ${username} does not exist.`);
    }
    return user;
};

const getUserById = async (id: number): Promise<User> => {
    const user = await userDB.getUserById({ id });
    if (!user) {
        throw new Error(`User with ID: ${id} does not exist.`);
    }
    return user;
};

const createUser = async ({
    username,
    firstName,
    lastName,
    email,
    role,
    password,
}: {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
    password: string;
}): Promise<User> => {
    const user = await userDB.getUserByUsername({ username });
    if (user) {
        throw new Error(`User with username: ${username} already exists.`);
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    return userDB.createUser({
        username,
        firstName,
        lastName,
        email,
        role,
        password: hashedPassword,
    });
};

const updateUser = async (
    id: number,
    updates: Partial<{
        username: string;
        firstName: string;
        lastName: string;
        email: string;
        role: Role;
        password: string;
    }>
): Promise<User> => {
    if (updates.password) {
        updates.password = await bcrypt.hash(updates.password, 12);
    }
    const updatedUser = await userDB.updateUser(id, updates);
    if (!updatedUser) {
        throw new Error(`Failed to update user with ID: ${id}.`);
    }
    return updatedUser;
};

const deleteUser = async (id: number): Promise<void> => {
    const success = await userDB.deleteUser(id);
    if (!success) {
        throw new Error(`Failed to delete user with ID: ${id}.`);
    }
};

const authenticate = async ({ username, password }: UserInput): Promise<AuthenticationResponse> => {
    const user = await getUserByUsername({ username });

    const isPasswordCorrect = await bcrypt.compare(password, user.getPassword());

    if (!isPasswordCorrect) {
        throw new Error('Incorrect password.');
    }
    return {
        token: generateJWTtoken({ username, role: user.getRole() }),
        username: username,
        fullname: `${user.getFirstName()} ${user.getLastName()}`,
        role: user.getRole(),
    };
};

export default {
    getUserByUsername,
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    authenticate,
};
