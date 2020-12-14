const contentLib = require('/lib/xp/content');
const dateHelper = require('/lib/date-helper/date-helper');

exports.createFolderFilter = function (folderId) {

    let folder = contentLib.get({
        key: folderId
    });

    return {
        hasValue: {
            field: "_parentPath",
            values: [
                "/content" + folder._path
            ]
        }
    }
};

exports.createParentFolderFilterExpr = function (folderId) {

    let folder = contentLib.get({
        key: folderId
    });

    return "_parentPath = " + "/content" + folder._path;
};

exports.wrapInBooleanFilter = function (filters, operator) {
    let filterArray = doForceArray(filters);
    let op = operator ? operator : "AND";

    if (filterArray.length === 0) {
        return {};
    }

    if (filterArray.length === 1) {
        return filterArray[0];
    }

    let wrapped = {
        boolean: {
            must: [],
            should: [],
            mustNot: []
        }
    };

    filterArray.forEach(function (filter) {
        if (op === "AND") {
            wrapped.boolean.must.push(filter);
        } else if (op === "OR") {
            wrapped.boolean.should.push(filter);

        } else {
            wrapped.boolean.mustNot.push(filter);
        }
    });

    return wrapped;
};

exports.wrapInBoolean = function (expressions, operator) {

    let expressionArray = doForceArray(expressions);
    let op = operator ? operator : "AND";

    if (expressionArray.length <= 1) {
        return expressions;
    }

    let expString = " (";
    expString += expressionArray.join(" " + op + " ");
    expString += ")";

    return expString;
};


function doForceArray(data) {

    if (!data || data === "") {
        return [];
    }

    if (!Array.isArray(data)) {
        data = [data];
    }
    return removeEmptyElements(data);
}

let removeEmptyElements = function (array) {
    if (!array) {
        return [];
    }
    let newArray = [];

    if (!Array.isArray(array)) {
        newArray.push(array);
    } else {
        array.forEach(function (element) {
            if (element && element !== "") {
                newArray.push(element);
            }
        });
    }
    return newArray;
};


exports.createDateDiffExpression = function (numberOfDays, fieldName, before) {
    let dueDate = dateHelper.addDays(new Date(), numberOfDays).toDateString();
    let dueDateExpr = fieldName;
    dueDateExpr += before ? " < " : " > ";
    dueDateExpr += "date('" + dateHelper.toESDateFormat(dueDate) + "')";
    return dueDateExpr;
};