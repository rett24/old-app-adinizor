const portal = require('/lib/xp/portal');
const React4xp = require('/lib/enonic/react4xp');
const contentLib = require('/lib/xp/content');
const JOB_AD_CONTENT_TYPE = 'no.rett24.web:job-ad';
const queryHelper = require('/lib/query-helper/query-helper');
const adHelper = require('/lib/ad-helper/ad-helper');
const guillotine = require('/headless/guillotineApi');
const httpClient = require('/lib/http-client');


const {buildAdListQuery} = require('/lib/queries/queries');

exports.get = function (request) {
    let component = portal.getComponent();
    let config = component.config;

    const count = 100;
    const start = 0;
    const sort = "data.jobDueDate ASC";

    let filters;

    if (config.adsFolder) {
        filters = queryHelper.createParentFolderFilterExpr(config.adsFolder);
    }

    let dueDateExpression = queryHelper.createDateDiffExpression(0, "data.jobDueDate", true);

    queryHelper.wrapInBoolean(filters, dueDateExpression);

    let parentQueryExpr = "_parentPath = '/content/current-ads";

    const sortExpression = `${component.config.sortBy} ${
        component.config.descending ? 'DESC' : 'ASC'
    }`;

    const query = buildAdListQuery();

    const variables = {
        first: 2,
        offset: 0,
        sort: "_name",
        queryExpr: "",
    };

    const guillotineResult = guillotine.executeQuery(query, variables);

    log.info("GuillotineResult: %s", JSON.stringify(guillotineResult, null, 4));


    // if (guillotineResult.errors && guillotineResult.errors.length > 0) {
    return {
        body: JSON.stringify(guillotineResult, null, 4),
        contentType: 'application/json'
    };
    //}


    const props = {
        config: config,
        ads: adHelper.createAds(guillotineResult)
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
}
;




