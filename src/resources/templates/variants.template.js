const getVariantsTemplate = () => `
    <form method=POST action="/vote">
        <legend>Choose variant:</legend>
        <input type="submit" value="variant-1" name="variant">
        <input type="submit" value="variant-2" name="variant">
        <input type="submit" value="variant-3" name="variant">
        <input type="submit" value="variant-4" name="variant">
    </form>
`;

module.exports = getVariantsTemplate;
