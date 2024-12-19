import Head from "next/head";
import Header from "@components/header";
import UserSignupForm from "../../components/users/UserSignupForm";

const Signup: React.FC = () => {
    return (
        <>
            <Head>
                <title>User Signup</title>
            </Head>
            <main className="bg-black text-white min-h-screen flex items-center justify-center">
                <section className="flex flex-col items-center justify-center px-8 py-10 max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Sign Up</h1>
                    <p className="text-lg md:text-xl mb-6 text-gray-400">
                        Create an account to access our services.
                    </p>
                    <UserSignupForm />
                </section>
            </main>
        </>
    );
};

export default Signup;
