'use server';

import { prisma } from '@/lib/prisma';
import { auth, currentUser } from '@clerk/nextjs/server';
import { clear } from 'console';
import { loadGetInitialProps } from 'next/dist/shared/lib/utils';

export async function syncUser() {
	try {
        console.log("Syncing user...");
		const { userId } = await auth();
		const user = await currentUser();

		if (!user || !userId) return;
        console.log("pass the condition")
        // Check if the user already exists in the database
        const existingUser = await prisma.user.findUnique({
            where: {
                clerkId: userId,
            },
        })
        console.log("existingUser: ", existingUser)
        if (existingUser)  return existingUser

		const dbUser = await prisma.user.create({
			data: {
				clerkId: userId,
				name: `${user.firstName || ''} ${user.lastName || ''}`,
				username:
					user.username ?? user.emailAddresses[0].emailAddress.split('@')[0],
				email: user.emailAddresses[0].emailAddress,
				image: user.imageUrl,
			},
		});
console.log('dbUser: ', dbUser)
		return dbUser;

	} catch (error) {
        console.error('Error syncing user:', error);
    }
}
