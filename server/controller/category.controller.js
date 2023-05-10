const {getAllCategoriesRepository} = require("../repository/category.repository");


/**
 * getAllCategoriesController
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
exports.getAllCategoriesController = async(req,res,next) => {
    try {
        return await getAllCategoriesRepository(req, res)
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
        //TODO
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
// TODO
    } catch (e) {
        next(e);
    }
}