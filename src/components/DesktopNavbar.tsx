import { currentUser } from '@clerk/nextjs/server';
import React from 'react';
import { ModeToggle } from './ModeToggle';
import { Button } from './ui/button';
import Link from 'next/link';
import { Bell, HomeIcon, UserIcon } from 'lucide-react';
import { SignInButton, UserButton } from '@clerk/nextjs';

const DesktopNavbar = async () => {
	const user = await currentUser();
	return (
		<div className="hidden md:flex items-center space-x-4">
			<ModeToggle />
			<Button
				variant="ghost"
				className="flex items-center gap-2"
				asChild
			>
				<Link href="/">
					<HomeIcon className="h-4 w-4" />
					<span className="hidden lg:inline">Home</span>
				</Link>
			</Button>
			{user ? (
				<>
					<Button
						variant="ghost"
						className="flex items-center gap-2"
						asChild
					>
						<Link href="/notifications">
							<Bell className="h-4 w-4" />
							<span className="hidden lg:inline">Notifications</span>
						</Link>
					</Button>
					<Button
						variant="ghost"
						className="flex items-center gap-2"
						asChild
					>
						{/* ?? user.emailAddress[0].emailAddress.split("@)[0]} */}
						<Link
							href={`/profile/${
								user.username ??
								user.emailAddresses[0].emailAddress.split('@')[0]
							} `}
						>
							<UserIcon className="h-4 w-4" />
							<span className="hidden lg:inline">Profile</span>
						</Link>
					</Button>
					<Button
						variant="ghost"
						className="flex items-center gap-2"
						asChild
					>
						<UserButton />
					</Button>
				</>
			) : (
				<SignInButton mode="modal">
					<Button variant="default">Sign In</Button>
				</SignInButton>
			)}
		</div>
	);
};

export default DesktopNavbar;
