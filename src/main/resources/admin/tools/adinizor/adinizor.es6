const React4xp = require('/lib/enonic/react4xp');

exports.get = function (request) {

    const props = {};

    let newRequest = request;

    newRequest.mode = "live";

    log.info("REQUEST: %s", JSON.stringify(newRequest, null, 4));

    return React4xp.render(
        'Adinizor',
        props,
        newRequest,
        {
            id: "myReactApp",
            body:
                `
                    <html>
                        <head></head>
                        <body class="xp-page">
                            <div id="myReactApp"></div>
                        </body>
                    </html>
                `,
            clientRender: true
        }
    )
};