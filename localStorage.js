"use strict";
var storageLocal = {
    default_cache_prefix: 'ONLINEKURUM__',
    default_timeout: 432000,
    expire_date_postfix: '_expire_date',
    set: function (name, value, expire) {
        if (typeof expire === 'undefined') {
            expire = this.default_timeout;
        }
        if (expire !== -1 && expire !== 0) {
            localStorage.setItem(this.name(name) + this.expire_date_postfix, time.nowUnix() + expire);
        }
        return localStorage.setItem(this.name(name), value);
    },
    prefix: function () {
        return this.default_cache_prefix;
    },
    get: function (name) {
        if (this.isset(name)) {
            return localStorage.getItem(this.name(name));
        }
    },
    remove: function (name) {
        return localStorage.removeItem(this.name(name));
    },
    isset: function (name) {
        var expire_date = localStorage.getItem(this.name(name + this.expire_date_postfix));
        if (expire_date) {
            if (expire_date <= time.nowUnix()) {
                this.remove(name);
                this.remove(name + this.expire_date_postfix);
                return false;
            } else {
                return localStorage.getItem(this.name(name));
            }
        } else {
            return localStorage.getItem(this.name(name));
        }
    },
    name: function (name) {
        return this.prefix() + name;
    }
};

var time = {
    nowUnix: function () {
        return Math.floor(Date.now() / 1000);
    }
};
