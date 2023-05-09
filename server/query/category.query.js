/**
 * getAllCategories
 * @returns {string} "SELECT * FROM category"
 */
exports.getAllCategories = () => {
    return "SELECT * FROM category";
}

/**
 * findCategoryByName
 * @returns {string} "SELECT * FROM category WHERE name=?"
 */
exports.findCategoryByName = () => {
    return "SELECT * FROM category WHERE name=?";
}

exports.createCategory = () => {
    return "INSERT INTO category (name) VALUES (?)";
}