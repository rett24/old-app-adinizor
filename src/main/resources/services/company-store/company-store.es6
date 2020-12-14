const cacheLib = require('/lib/cache');
const contentLib = require('/lib/xp/content');

const cache = cacheLib.newCache({
    size: 100,
    expire: 3600
});


exports.getCompany = function get(id) {
    return cache.get(id, function () {
        return fetchCompany(id);
    });
};

const fetchCompany = function (id) {
    return contentLib.get({
        key: id
    });
};