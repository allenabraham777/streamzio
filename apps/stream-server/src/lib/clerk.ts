import { createClerkClient } from '@clerk/clerk-sdk-node';

export const clerk = createClerkClient({
    secretKey: process.env.CLERK_SECRET_KEY,
    jwtKey: process.env.pk_test_ZWFzeS1ib3hlci05My5jbGVyay5hY2NvdW50cy5kZXYk
});
