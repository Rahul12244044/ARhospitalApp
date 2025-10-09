export default {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            gridTemplateColumns:{
                'auto': 'repeat(auto-fill, minmax(200px, 1fr))'
            }
        },
    },
    plugins: [],
};