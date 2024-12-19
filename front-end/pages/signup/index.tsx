import Head from "next/head";
import UserSignupForm from "../../components/users/UserSignupForm";
import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Signup: React.FC = () => {
    const { t } = useTranslation("common");

    return (
        <>
            <Head>
                <title>{t("signup.title")}</title>
            </Head>
            <main className="bg-black text-white min-h-screen flex items-center justify-center">
                <section className="flex flex-col items-center justify-center px-8 py-10 max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("signup.title")}</h1>
                    <p className="text-lg md:text-xl mb-6 text-gray-400">
                        {t("signup.description")}
                    </p>
                    <UserSignupForm />
                </section>
            </main>
        </>
    );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale || 'en', ['common'])),
    },
});

export default Signup;
