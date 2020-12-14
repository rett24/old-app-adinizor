const portal = require('/lib/xp/portal');
const contentLib = require('/lib/xp/content');
const JOB_AD_CONTENT_TYPE = 'no.rett24.web:job-ad';
const queryHelper = require('/lib/query-helper/query-helper');
const adHelper = require('/lib/ad-helper/ad-helper');

exports.getAds = function (config) {
    let component = portal.getComponent();

    const count = 100;
    const start = 0;
    const sort = "data.jobDueDate ASC";

    let filters;

    if (config.adsFolder) {
        filters = queryHelper.createFolderFilter(config.adsFolder);
    }

    let dueDateExpression = queryHelper.createDateDiffExpression(0, "data.jobDueDate", true);

    let queryExpr = {
        query: dueDateExpression,
        filters: filters,
        count: count,
        start: start,
        sort: sort,
        contentTypes: [JOB_AD_CONTENT_TYPE]
    };

    //log.info("QueryExpr: %s", JSON.stringify(queryExpr, null, 4));

    const result = contentLib.query(queryExpr);

    const props = {
        ads: adHelper.createAds(result)
    };

    return React4xp.render(
        component,
        props,
        request,
        {
            clientRender: true,
            pageContributions: {
                bodyEnd: ""
            }
        });
};




