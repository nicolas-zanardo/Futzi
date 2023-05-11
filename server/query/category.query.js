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

/**
 * createCategory
 * @returns {string} "INSERT INTO category (name) VALUES (?)";
 */
exports.createCategory = () => {
    return "INSERT INTO category (name) VALUES (?)";
}

/**
 * updateCategory
 * @returns {string}
 */
exports.updateCategory = () => {
    return "UPDATE category SET name=? WHERE id=?"
}

/**
 * deleteCategory
 * @returns {string} "DELETE FROM category WHERE id=?"
 */
exports.deleteCategory = () => {
    return "DELETE FROM category WHERE id=?"
}