const {getAllCategoriesRepository} = require("../repository/category.repository");

exports.getAllCategoriesController = async(req,res,next) => {
    try {
        return await getAllCategoriesRepository(req, res)
    } catch (e) {
        next(e);
    }
}