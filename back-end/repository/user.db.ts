import { User } from '../model/user';
import { Role } from '../types';
import database from '../util/database';

const getAllUsers = async (): Promise<User[]> => {
    try {
        const usersPrisma = await database.user.findMany();
        return usersPrisma.map((userPrisma) => User.from(userPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getUserById = async ({ id }: { id: number }): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: { id },
        });

        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getUserByUsername = async ({ username }: { username: string }): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findFirst({
            where: { username },
        });

        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
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
    try {
        const newUser = await database.user.create({
            data: {
                username,
                firstName,
                lastName,
                email,
                role,
                password,
            },
        });

        return User.from(newUser);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
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
): Promise<User | null> => {
    try {
        const updatedUser = await database.user.update({
            where: { id },
            data: updates,
        });

        return User.from(updatedUser);
    } catch (error) {
        console.error(error);
        if (error.code === 'P2025') {
            throw new Error(`User with ID ${id} not found.`);
        }
        throw new Error('Database error. See server log for details.');
    }
};

const deleteUser = async (id: number): Promise<boolean> => {
    try {
        await database.user.delete({
            where: { id },
        });
        return true;
    } catch (error) {
        console.error(error);
        if (error.code === 'P2025') {
            throw new Error(`User with ID ${id} not found.`);
        }
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllUsers,
    getUserById,
    getUserByUsername,
    createUser,
    updateUser,
    deleteUser,
};
