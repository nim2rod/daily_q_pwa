module.exports = {
    globDirectory: 'build/',
    globPatterns: [
        '**/*.{html,js,css,png,svg,jpg}'
    ],
    swDest: 'build/service-worker.js',
    runtimeCaching: [
        {
            urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
            handler: 'CacheFirst',
            options: {
                cacheName: 'images',
                expiration: {
                    maxEntries: 60,
                    maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
                },
            },
        },
        {
            urlPattern: new RegExp('^https://myapi.example.com/'),
            handler: 'NetworkFirst',
            options: {
                cacheName: 'api',
                networkTimeoutSeconds: 10,
                expiration: {
                    maxEntries: 50,
                    maxAgeSeconds: 5 * 60, // 5 Minutes
                },
            },
        },
    ],
};
