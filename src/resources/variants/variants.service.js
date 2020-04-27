const getPageTemplate = require('../templates/page.template');
const getVariantsTemplate = require('../templates/variants.template');

const getPage = () => {
    return getPageTemplate(
        getVariantsTemplate()
    );
};

module.exports = {
    getPage
};
