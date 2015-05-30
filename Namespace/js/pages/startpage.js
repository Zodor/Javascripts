/// <reference path="/public/js/localization.js" /> 

/*
 * Home (Startpage)
 */

(function () {

    var home;
    var main = app.Main;

    app.Startpage = Object.inherit({

        initialize: function () {
            app = this;
        }

    });

    var Home = app.Startpage;
    Home.create();

})();
