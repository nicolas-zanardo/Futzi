const {Database} = require("../Database/Database");
const {getAllCategories, findCategoryByName, createCategory} = require("../query/category.query");

/**
 * getAllCategoriesRepository
 * @param req
 * @param res
 */
exports.getAllCategoriesRepository = async(req, res) => {
    const db = new Database();
    return await db.connection.promise().query(getAllCategories())
        .then(([rows]) => {
            console.log(`░▒▓ INFO :GET ALL CATEGORY : ${new Date()}`);
            return res.status(200).json(rows);
        })
        .catch(err => {
            console.log(`✘ 🅴🆁🆁🅾🆁 SQL : ${new Date()}, ${err}`);
            return res.status(500).json(err)
        })
        .then(db.connection.end());
}

/**
 * findCategoryByNameRepository
 * @param req
 * @param res
 * @param isResponseJSON boolean default true
 * @returns {Promise<unknown>} if boolean isResponseJSON return response Express JSON else return only an Object: FootballPitch
 */
exports.findCategoryByNameRepository = async(req, res, isResponseJSON = true) => {
    const db = new Database();
    return await db.connection.promise().query(findCategoryByName(), [req.body.category.toUpperCase().trim()])
        .then(([rows]) => {
            console.log(`░▒▓ INFO : FIND BY NAME CATEGORY : ${new Date()}`);
            if(isResponseJSON){
                return res.status(201).json(rows)
            }
            return rows;
        })
        .catch(err => {
            console.log(`✘ 🅴🆁🆁🅾🆁 SQL : ${new Date()}, ${err}`);
            return res.status(500).json(err)
        })
        .then(db.connection.end());
}

/**
 *
 * @param req
 * @param res
 * @param isResponseJSON boolean default true
 * @returns {Promise<unknown>} if boolean isResponseJSON return response Express JSON else return only an Object: FootballPitch
 */
exports.createCategoryRepository = async(req, res, isResponseJSON = true) => {
    const db = new Database();
    return await db.connection.promise().query(createCategory(), [req.body.category.toUpperCase().trim()])
        .then(([rows]) => {
            console.log(`░▒▓ INFO : CREATE CATEGORY : ${new Date()}`);
            if(isResponseJSON) {
                return res.status(201).json(rows)
            }
            return [rows];
        })
        .catch(err => {
            console.log(`✘ 🅴🆁🆁🅾🆁 SQL : ${new Date()}, ${err}`);
            return res.status(500).json(err)
        })
        .then(db.connection.end());
}