/// <reference path="/public/js/localization.js" /> 

(function () {

    var data;
    var main = app.Main;

    app.Data = Object.inherit({

        initialize: function (callback) {
            data = this;
            this.rfps = [];

            // Make sure we do not start multiple ajax calls
            this.ajax_getAllData = false;
            this.getAllData(data.continueInitializing);
        },

        continueInitializing: function () {
        },

        // Get all data
        getAllData: function (callback) {
            // Are we online
            if (navigator.onLine) {

                if (offline.ajax_getAllData == true) {
                    if (callback)
                        callback(null);
                    else
                        return null;
                }

                offline.ajax_getAllData = true;
                var url = '/data/getData';
                var async = false;
                if (callback != null)
                    async = true;

                $.ajax({
                    url: url,
                    cache: false,
                    async: async,
                    success: function (result) {
                        if (result.indexOf('A PHP Error') != -1) {
                            // Error from model
                        } else {
                            try {
                                var obj = $.parseJSON(result);
                                main.del('data');
                                main.set('data', result);
                                data.data = obj;
                            } catch (Exception) {
                                offline.ajax_getAllData = false;
                                data.data = null;
                            }
                        }
                    },
                    error: function (xhr, textStatus, error) {
                        data.data = null;
                    }
                }).done(function (e) {
                    offline.ajax_getAllData = false;
                    if (callback != null)
                        callback(data.data);
                    else
                        return data.data;
                });
            }
        },

    });

    var Data = app.Offline;
    Data.create(null);

}());
