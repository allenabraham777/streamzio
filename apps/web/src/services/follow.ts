import { db } from '@/lib/db';

import { getSelf } from './self';

export const isFollowing = async (username: string) => {
    const self = await getSelf();
    const following = await db.user.findFirst({ where: { username } });

    if (!following) {
        throw new Error('User not found!');
    }

    if (self.id === following.id) {
        return true;
    }

    const alreadyFollowing = await db.follow.findFirst({
        where: {
            followerId: self.id,
            followingId: following.id
        }
    });

    return !!alreadyFollowing;
};

export const followUser = async (userId: string) => {
    const self = await getSelf();
    const following = await db.user.findFirst({ where: { id: userId } });

    if (!following) {
        throw new Error('User not found!');
    }

    if (self.id === following.id) {
        throw new Error('Cannot follow self!');
    }

    const alreadyFollowing = await db.follow.findFirst({
        where: {
            followerId: self.id,
            followingId: following.id
        }
    });

    if (alreadyFollowing) throw new Error('Already following the user!');

    const follow = await db.follow.create({
        data: {
            followerId: self.id,
            followingId: following.id
        },
        include: {
            follower: true,
            following: true
        }
    });

    return follow;
};

export const unfollowUser = async (userId: string) => {
    const self = await getSelf();
    const following = await db.user.findFirst({ where: { id: userId } });

    if (!following) {
        throw new Error('User not found!');
    }

    if (self.id === following.id) {
        throw new Error('Cannot unfollow self!');
    }

    const alreadyFollowing = await db.follow.findFirst({
        where: {
            followerId: self.id,
            followingId: following.id
        }
    });

    if (!alreadyFollowing) throw new Error('You are not following the user!');

    const follow = await db.follow.delete({
        where: {
            id: alreadyFollowing.id
        },
        include: {
            following: true
        }
    });

    return follow;
};

export const getFollowedUsers = async () => {
    try {
        const self = await getSelf();
        const followedUsers = await db.follow.findMany({
            where: {
                followerId: self.id,
                following: {
                    blocking: {
                        none: {
                            blockedId: self.id
                        }
                    }
                }
            },
            include: { following: true }
        });
        return followedUsers;
    } catch (error) {
        return [];
    }
};
