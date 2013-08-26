require.config({
    baseUrl: '.',
    name: 'pages/home/routes',
    shim: {
        "underscore": {
            exports: '_'
        },
        "backbone": {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        "highcharts": {
            deps: ['jquery'],
            exports: 'Highcharts'
        },
        "jqueryui": {
            deps: ['jquery'],
            exports: 'jQuery'
        }
    },
    paths: {
        "jquery": "js/lib/jquery",
        "jqueryui": "js/lib/jqueryui",
        "underscore": "js/lib/underscore",
        "backbone": "js/lib/backbone",
        "highcharts": "js/lib/highcharts",
        "moment": "js/lib/moment"
    }
});