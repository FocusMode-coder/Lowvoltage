// Keep-Alive Script
// This script prevents the site from going to sleep by periodically pinging itself

(function() {
    'use strict';
    
    // Configuration
    const PING_INTERVAL = 5 * 60 * 1000; // 5 minutes in milliseconds
    const SITE_URL = window.location.origin; // Current site URL
    
    // Function to ping the site
    function keepAlive() {
        fetch(SITE_URL, {
            method: 'HEAD',
            cache: 'no-cache',
            mode: 'no-cors'
        })
        .then(() => {
            console.log(`[Keep-Alive] Ping successful at ${new Date().toLocaleTimeString()}`);
        })
        .catch((error) => {
            console.warn('[Keep-Alive] Ping failed:', error);
        });
    }
    
    // Initial ping
    keepAlive();
    
    // Set up periodic pinging
    setInterval(keepAlive, PING_INTERVAL);
    
    console.log(`[Keep-Alive] Script initialized. Pinging every ${PING_INTERVAL / 60000} minutes.`);
    
    // Prevent page from sleeping using visibility API
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            console.log('[Keep-Alive] Page hidden, but keep-alive is still running');
        } else {
            console.log('[Keep-Alive] Page visible again');
            keepAlive(); // Ping immediately when page becomes visible
        }
    });
    
    // Wake lock API (if supported) to prevent device from sleeping
    if ('wakeLock' in navigator) {
        let wakeLock = null;
        
        async function requestWakeLock() {
            try {
                wakeLock = await navigator.wakeLock.request('screen');
                console.log('[Keep-Alive] Wake Lock is active');
                
                wakeLock.addEventListener('release', () => {
                    console.log('[Keep-Alive] Wake Lock released');
                });
            } catch (err) {
                console.warn('[Keep-Alive] Wake Lock error:', err);
            }
        }
        
        // Request wake lock
        requestWakeLock();
        
        // Re-acquire wake lock when page becomes visible
        document.addEventListener('visibilitychange', async () => {
            if (!document.hidden && wakeLock !== null) {
                await requestWakeLock();
            }
        });
    }
})();
