// mrozak START 
var RSSsources = new Array(
    'http://helposx.apple.com/rss/leopard/serverdocupdates.xml',
    'http://nvidianews.nvidia.com/cats/mobile.xml',
    "http://localhost:8080/json"
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
			symbol: 'calendar-plus-o', 
			url: 'https://p01-calendarws.icloud.com/ca/subscribe/1/n6x7Farxpt7m9S8bHg1TGArSj7J6kanm_2KEoJPL5YIAk3y70FpRo4GyWwO-6QfHSY5mXtHcRGVxYZUf7U3HPDOTG5x0qYnno1Zr_VuKH2M'
		},
		{
			symbol: 'soccer-ball-o',
			url: 'https://www.google.com/calendar/ical/akvbisn5iha43idv0ktdalnor4%40group.calendar.google.com/public/basic.ics',
		},
		{
			 symbol: 'mars',
			 url: "https://server/url/to/his.ics",
		 },
		 {
			 symbol: 'venus',
			 url: "https://server/url/to/hers.ics",
		 },
		{
			 symbol: 'venus-mars',
			 url: "https://server/url/to/theirs.ics",
		 },
		]
    },
    news1: {
        feed1: 'http://wiadomosci.wp.pl/ver,rss,rss.xml',
    },
    facebook: {
        feed2: address,
    }
}
