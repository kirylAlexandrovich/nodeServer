const getPageTemplate = (content) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Title</title>
        </head>
        <body>
            ${content}
        </body>
        </html>
    `;
};

module.exports = getPageTemplate;
