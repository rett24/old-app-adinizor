const dateHelper = require('/lib/date-helper/date-helper');
const companyService = require('/services/company-store/company-store');

exports.createAds = function (result) {

    const ads = [];

    result.hits.map(hit => {

        let company = companyService.getCompany(hit.data.company);

        //log.info("COMPANY: %s", JSON.stringify(company, null, 3));

        ads.push(
            {
                company: company,
                daysOld: hit.publish.first ? dateHelper.getDaysBetween(new Date(), hit.publish.first) : "unknown",
                daysSinceDueDate: hit.data.jobDueDate ? dateHelper.getDaysBetween(new Date(), hit.data.jobDueDate) : "unknown",
                ...hit
            });
    });


    return ads;
};

