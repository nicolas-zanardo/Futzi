const {getAllCategoriesRepository, updateCategoryRepository, deleteCategoryRepository} = require("../repository/category.repository");
const {Category} = require("../model/Category");


/**
 * getAllCategoriesController
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
exports.getAllCategoriesController = async(req,res, next) => {
    try {
        return await getAllCategoriesRepository(res)
    } catch (e) {
        next(e);
    }
}

/**
 * updateCategoryController
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
exports.updateCategoryController = async(req, res, next) => {
    try {
        let update = new Category();
        update.id = req.body.id;
        update.name = req.body.name;
        return await updateCategoryRepository(update, res);
    } catch (e) {
        next(e);
    }
}

/**
 * deleteCategoryController
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
exports.deleteCategoryController = async(req, res, next) => {
    try {
        let category = new Category();
        category.id = req.params.id;
        return await deleteCategoryRepository(category.id, res);
    } catch (e) {
        next(e);
    }
}