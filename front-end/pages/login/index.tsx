import Head from "next/head";
import Header from "@components/header";
import UserLoginForm from "@components/users/UserLoginForm";
import Link from "next/link";

const Login: React.FC = () => {
    return (
        <>
            <Head>
                <title>User Login</title>
            </Head>
            <main className="bg-black text-white min-h-screen flex items-center justify-center">
                <section className="flex flex-col items-center justify-center px-8 py-10 max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Login</h1>
                    <p className="text-lg md:text-xl mb-6 text-gray-400">
                        Enter your credentials to continue.
                    </p>
                    <UserLoginForm />
                    <p className="mt-6 text-gray-400">
                        Don’t have an account?{' '}
                        <Link href="/signup" className="text-blue-500 hover:underline">
                            Sign up here
                        </Link>
                    </p>
                </section>
            </main>
        </>
    );
};

export default Login;
