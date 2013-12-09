/*
 * arykow-iframely-client
 * https://github.com/kdridi/arykow-iframely-client
 *
 * Copyright (c) 2013 Karim DRIDI
 * Licensed under the MIT license.
 */

'use strict';

var querystring = require('querystring'),
    request = require('request'),
    async = require('async');

var fetch = function(uri, callback) {
    request('http://iframely.com/reader.js?' + querystring.stringify({ uri: uri }), function (error, response, body) {
        if (!error && response.statusCode === 200) {
            callback(null, body);
        } else {
            callback(error);
        }
    });
};

var evaluate = function(script, callback) {
    try {
        var Window = function() {
        };

        var jQuery = function() {
            var res = [{}];
            res.attr = function() {};
            res.insertAfter = function() {};
            res.addClass = function() {};
            res.html = function() {
                callback(null, arguments[0]);
            };
            res.objectfit = function() {};
            res.find = function() {
                return {
                    attr: function() {}
                };
            };
            res.parent = function() {
                return {
                    trigger: function() {}
                };
            };
            return res;
        };

        jQuery.fn = {
            jquery: '1.9.1'
        };

        Window.prototype.setInterval = setInterval;
        Window.prototype.clearInterval = clearInterval;
        Window.prototype.jQuery = jQuery;

        var window = new Window();
        var document = null;

        eval(script);

        var w = window;
        w = document;
    } catch(e) {
        callback(e);
    }
};

module.exports = function(uri, callback) {
    var tasks = [];
    tasks.push(function(cb) {
        fetch(uri, cb);
    });
    tasks.push(evaluate);
    
    async.waterfall(tasks, callback);
};