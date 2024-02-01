import { SignUp } from '@clerk/nextjs';

const Signup = () => {
    return <SignUp afterSignInUrl="/" afterSignUpUrl="/" redirectUrl="/" />;
};

export default Signup;
