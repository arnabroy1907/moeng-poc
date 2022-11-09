(function(i, s, o, g, r, a, m, n) {
    i.moengage_object = r;
    t = {};
    q = function(f) {
        return function() {
            (i.moengage_q = i.moengage_q || []).push({
                f: f,
                a: arguments
            })
        }
    };
    f = ['track_event', 'add_user_attribute', 'add_first_name',
        'add_last_name', 'add_email', 'add_mobile', 'add_user_name',
        'add_gender', 'add_birthday', 'destroy_session',
        'add_unique_user_id', 'moe_events', 'call_web_push', 'track',
        'location_type_attribute'
    ], h = {
        onsite: ["getData", "registerCallback"]
    };
    for (k in f) {
        t[f[k]] = q(f[k])
    }
    for (k in h)
        for (l in h[k]) {
            null == t[k] &&
            (t[k] = {}), t[k][h[k][l]] = q(k + "." + h[k][l])
        }
    a = s.createElement(o);
    m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m);
    i.moe = i.moe || function() {
        n = arguments[0];
        return t
    };
    a.onload = function() {
        if (n) {
            i[r] = moe(n)
        }
    }
})(window, document, 'script',
    'https://cdn.moengage.com/webpush/moe_webSdk.min.latest.js', 'Moengage')
Moengage = moe({
    app_id: "U872ID73BLQ00N72KLXZP8YO",
    debug_logs: 0,
    enableSPA: true,
    cards: {
        enable: true,
        placeholder: '#cardIcon', // CSS selector of inbox icon
        backgroundColor: '#F6FBFC', // any valid CSS color format
        overLayColor: 'rgba(0, 0, 0, 0.8)',
        ctaTextColor: '#06A6B7',
        cardDismissColor: '#db2828', // any valid CSS color format
        optionButtonColor: '#C4C4C4', // any valid CSS color format
        dateTimeColor: '#8E8E8E', // any valid CSS color format
        unclickedIndicatorColor: 'blue', // any valid CSS color format
        pinIcon: 'https://app-cdn.moengage.com/sdk/pin-icon.svg', // absolute path to the icon image.
        refreshIcon: 'https://app-cdn.moengage.com/sdk/refresh-icon.svg', // absolute path to the icon image.
        navigationBar: {
            backgroundColor: '#00237C', // any valid CSS color format
            text: 'Notifications', // string. eg, Notifications
            color: '#fff', // any valid CSS color format
            fontSize: '16px', // any valid CSS size format
            fontFamily: '', // any font family which is added to the website
        },
        closeButton: {
            webIcon: 'https://app-cdn.moengage.com/sdk/cross-icon.svg',
            mWebIcon: 'https://app-cdn.moengage.com/sdk/cross-icon.svg',
        },
        tab: {
            active: {
                color: '#06A6B7',
                underlineColor: '#06A6B7',
            },
            inactiveTabColor: '#7C7C7C',
            fontSize: '14px', // any valid CSS size format
            fontFamily: '', // any font family which is added to the website
            backgroundColor: '#fff', // any valid CSS color format
        },
        floating: {
            enable: false, // false by default
            icon: 'https://app-cdn.moengage.com/sdk/bell-icon.svg', // absolute path to the icon image. by default, our icon will be used.
            postion: '0px 10px 40px 0', // need all 4 offset in proper CSS format in the order of top, right, bottom, left.
            countBackgroundColor: '#FF5A5F',
            countColor: '#FFF',
        },
        noDataContent: {
            img: `https://app-cdn.moengage.com/sdk/cards-no-result.svg`,
            text: `No notifications to show, check again later.`,
        }
    }
});