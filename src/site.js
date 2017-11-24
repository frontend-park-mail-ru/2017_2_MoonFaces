if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/serviceWorker.js').catch((err) => {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}
