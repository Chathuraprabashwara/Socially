import { Button } from '@/components/ui/button';
import {
	SignedIn,
	SignedOut,
	SignInButton,
	SignUpButton,
	UserButton,
} from '@clerk/nextjs';

export default function Home() {

  console.log('Home page');
	return (
		<div className='m-4'>
<h1>Home Page Content</h1>
		</div>
	);
}
