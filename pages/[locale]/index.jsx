import MetaData from '@/components/meta/MetaData';
import HomePage from '@/components/pagescomponents/HomePage';
import { GET_SEO_SETTINGS } from '@/api/apiEndpoints';
import axios from 'axios';

const fetchDataFromSeo = async () => {
    try {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_END_POINT}${GET_SEO_SETTINGS}`;
        console.log("Fetching SEO data from URL:", apiUrl); // Log the API URL for debugging

        const response = await axios.get(apiUrl);
        return response.data;
    } catch (error) {
        console.error("Error fetching SEO data:", error.message); // Log error message
        console.error("Error details:", error.response?.data || error); // Log detailed error response if available
        return { data: [] }; // Return empty data to prevent blank screen
    }
};

const LocalizedHome = ({ seoData, pageName }) => {
    const metaData = seoData?.data?.[0] || {}; // Add fallback for metadata

    return (
        <div>
            <MetaData
                title={metaData.title || "Default Title"} // Add default title
                description={metaData.description || "Default Description"} // Add default description
                keywords={metaData.keywords || ""} // Add default keywords
                ogImage={metaData.image || ""} // Add default image
                pageName={pageName}
                structuredData={metaData.schema_markup || ""} // Add default schema markup
            />
            <HomePage />
        </div>
    );
}

let serverSidePropsFunction = async (context) => {
    const { params } = context;
    const pageName = `/${params.locale}/`;

    const validLocales = ['en', 'fr', 'es']; // Define valid locales
    if (!validLocales.includes(params.locale)) {
        console.error("Invalid locale provided:", params.locale); // Log invalid locale
        return {
            notFound: true,
        };
    }

    const seoData = await fetchDataFromSeo();

    // Log the fetched SEO data for debugging
    console.log("Fetched SEO Data:", seoData);

    // If SEO data failed to load, return empty defaults instead of 404
    if (!seoData || !seoData.data) {
        console.error("SEO data is null or invalid; returning empty defaults to avoid blank screen.");
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

export default LocalizedHome;
