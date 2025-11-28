import MetaData from '@/components/meta/MetaData';
import HomePage from '@/components/pagescomponents/HomePage';
import { GET_SEO_SETTINGS } from '@/api/apiEndpoints';
import axios from 'axios';

const fetchDataFromSeo = async () => {
    try {
        return await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_END_POINT}${GET_SEO_SETTINGS}`
        ).then(response => response.data);
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
};

const LocalizedHome = ({ seoData, pageName }) => {
    return (
        <div>
            <MetaData
                title={seoData?.data?.[0]?.title}
                description={seoData?.data?.[0]?.description}
                keywords={seoData?.data?.[0]?.keywords}
                ogImage={seoData?.data?.[0]?.image}
                pageName={pageName}
                structuredData={seoData?.data?.[0]?.schema_markup}
            />
            <HomePage />
        </div>
    )
}

let serverSidePropsFunction = async (context) => {
    const { params } = context;
    const pageName = `/${params.locale}/`;

    const validLocales = ['en', 'fr', 'es']; // Define valid locales
    if (!validLocales.includes(params.locale)) {
        return {
            notFound: true,
        };
    }

    const seoData = await fetchDataFromSeo();

    // Log the fetched SEO data for debugging
    console.log("Fetched SEO Data:", seoData);

    // If SEO data failed to load, return empty defaults instead of 404
    if (!seoData) {
        console.error("SEO data is null; returning empty defaults to avoid 404.");
        return {
            props: {
                seoData: { data: [] },
                pageName,
            },
        };
    }

    return {
        props: {
            seoData,
            pageName,
        },
    };
};

export const getServerSideProps = serverSidePropsFunction;

export default LocalizedHome