import { db } from '@/lib/db';

export const getUserById = async (userId: string) => {
    return await db.user.findFirst({
        where: {
            id: userId
        }
    });
};

export const getUserByUsername = async (username: string) => {
    return await db.user.findFirst({
        where: {
            username
        }
    });
};
