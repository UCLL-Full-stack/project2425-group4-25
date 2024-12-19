import Head from "next/head";
import Header from "@components/header";
import UserLoginForm from "@components/users/UserLoginForm";

const Login: React.FC = () => {
    return (
        <>
            <Head>
                <title>User Login</title>
            </Head>
            <main className="bg-black text-white min-h-screen">
                <section className="flex flex-col items-center justify-center px-8 py-10 max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Login</h1>
                    <p className="text-lg md:text-xl mb-8 text-gray-400">
                        Enter your credentials to continue.
                    </p>
                    <UserLoginForm />
                </section>
            </main>
        </>
    );
};

export default Login;
