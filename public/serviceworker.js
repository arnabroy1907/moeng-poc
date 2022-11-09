importScripts("https://cdn.moengage.com/webpush/releases/serviceworker_cdn.min.latest.js");

self.addEventListener('push', (event) => {

    const data = event.data.json();
    // console.log('ServW NonWait', data);

    self.clients.matchAll().then(function (clients){
        console.log('ServW NonWait clients list', clients);
        clients.forEach(function(client){
            // console.log('ServW NonWait client', client);
            client.postMessage({
                name: `SWPushNotification`,
                data: data
            });
        });
    });
});