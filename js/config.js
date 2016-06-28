// mrozak START 
var RSSsources = new Array(
    'http://helposx.apple.com/rss/leopard/serverdocupdates.xml',
    'http://nvidianews.nvidia.com/cats/mobile.xml',
    "http://localhost:8081/json"
    );

var whosNext = 3;
var address = '';

if (whosNext == 1) {
    address = RSSsources[0];
} else if (whosNext == 2) {
    address = RSSsources[1];
} else if (whosNext == 3) {
    address = RSSsources[2];
} else {
    alert("I do not know this guy!");
}
// mrozak END

var config = {
    lang: 'pl',
    time: {
        timeFormat: 24,
        displaySeconds: true,
        digitFade: true,
    },
    weather: {
        //change weather params here:
        //units: metric or imperial
        params: {
            q: 'Lodz,Poland',
            units: 'metric',
            // if you want a different lang for the weather that what is set above, change it here
            lang: 'pl',
            APPID: 'ed450b865e59f1ece8433d9c04a6dd9c'
        }
    },
    compliments: {
        interval: 30000,
        fadeInterval: 4000,
        morning: [
            'Cześć przystojniaku!',
            'Miłego dnia!',
            'Jak się spało?'
        ],
        afternoon: [
            'Część piękny!',
            'Wyglądasz bosko!',
            'Nieźle wyglądasz!'
        ],
        evening: [
            'Cześć ciacho!',
            'WOW, nieźle wyglądasz!',
            'Cześć!'
        ]
    },
    calendar: {
        maximumEntries: 10, // Total Maximum Entries
		displaySymbol: true,
		defaultSymbol: 'calendar', // Fontawsome Symbol see http://fontawesome.io/cheatsheet/
        urls: [
        {
            symbol: "disabled",
            url: "none",
        },
        {
            symbol: "Mateusz",
            url:"nie_chce_kalendarza",
        },
		{
			symbol: 'pl', 
			url: 'https://calendar.google.com/calendar/ical/3llcg7jskr1qchekdp8j46os70%40group.calendar.google.com/private-5b3aa21ae8859fe99fc7c80b5651d2c1/basic.ics'
		},
		{
			symbol: 'soccer',
			url: 'https://calendar.google.com/calendar/ical/wieza203%40gmail.com/private-a23b6417d0e404d5a6f919f46dba3ece/basic.ics',
		},
		]
    },
    news: {
        urls: [
        {
            url: 'http://www.p.lodz.pl/pl/rss.xml',
        },
        {
            url: 'none',
        },
        {
            url: 'http://www.tvn24.pl/najnowsze.xml',
        },
        {
            url: 'http://www.theverge.com/rss/frontpage',
        },
        {
            url: 'none',
        },
        ]
    },
    facebook: {
        url: "http://localhost:8081/json",
        interval: 10000,
    },
    update: {
        enableUrl: "http://localhost:82/",
        disableUrl: "http://localhost:82/black.html",
        distanceUrl: "http://192.168.1.101/distance",
        bluetoothUrl: "http://localhost:8080/discover",
        distance: 200,
        upTime: 6, // real time = n x 10s 
    }
}
