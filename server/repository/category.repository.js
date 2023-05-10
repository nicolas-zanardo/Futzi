const {Database} = require("../Database/Database");
const {getAllCategories, findCategoryByName, createCategory, updateCategory} = require("../query/category.query");

/**
 * getAllCategoriesRepository
 * @param req
 * @param res
 */
exports.getAllCategoriesRepository = async(res) => {
    const db = new Database();
    return await db.connection.promise().query(getAllCategories())
        .then(([rows]) => {
            console.log(`░▒▓ INFO :GET ALL CATEGORY : ${new Date()}`);
            return res.status(200).json(rows);
        })
        .catch(err => {
            console.log(`✘ 🅴🆁🆁🅾🆁 SQL : ${new Date()}, ${err}`);
            return res.status(500).json(`⚽ ERROR: PROBLEME SUR LE CODE, 
            contacter l'administrateur 🤬`);
        })
        .then(db.connection.end());
}

/**
 * findCategoryByNameRepository
 * @param name | string
 * @param res
 * @param isResponseJSON boolean default true
 * @returns {Promise<unknown>} if boolean isResponseJSON return response Express JSON else return only an Object: FootballPitch
 */
exports.findCategoryByNameRepository = async(name, res, isResponseJSON = true) => {
    const db = new Database();
    return await db.connection.promise().query(findCategoryByName(), [name.toLowerCase().trim()])
        .then(([rows]) => {
            console.log(`░▒▓ INFO : FIND BY NAME CATEGORY : ${new Date()}`);
            if(isResponseJSON){
                return res.status(201).json(rows);
            }
            return rows;
        })
        .catch(err => {
            console.log(`✘ 🅴🆁🆁🅾🆁 SQL : ${new Date()}, ${err}`);
            return res.status(500).json(`⚽ ERROR: PROBLEME SUR LE CODE, 
            contacter l'administrateur 🤬`);
        })
        .then(db.connection.end());
}

/**
 * createCategoryRepository
 * @param name string
 * @param res
 * @param isResponseJSON boolean default true
 * @returns {Promise<unknown>} if boolean isResponseJSON return response Express JSON else return only an Object: FootballPitch
 */
exports.createCategoryRepository = async(name, res, isResponseJSON = true) => {
    const db = new Database();
    return await db.connection.promise().query(createCategory(), [name.toLowerCase().trim()])
        .then(([rows]) => {
            console.log(`░▒▓ INFO : CREATE CATEGORY : ${new Date()}`);
            if(isResponseJSON) {
                return res.status(201).json(rows);
            }
            return [rows];
        })
        .catch(err => {
            console.log(`✘ 🅴🆁🆁🅾🆁 SQL : ${new Date()}, ${err}`);
            return res.status(500).json(`⚽ ERROR: PROBLEME SUR LE CODE, 
            contacter l'administrateur 🤬`);
        })
        .then(db.connection.end());
}

/**
 * updateCategoryRepository
 * @param category Type Category
 * @param res
 * @returns {Promise<unknown>}
 */
exports.updateCategoryRepository = async(category, res) => {
   const db = new Database();
   return await db.connection.promise().query(updateCategory(), [
       category.name.toLowerCase().trim(), category.id]).query()
       .then(([rows]) => {
           console.log(`░▒▓ INFO : UPDATE CATEGORY : ${new Date()}`);
           return res.status(201).json(rows);
       })
       .catch(err => {
           console.log(`✘ 🅴🆁🆁🅾🆁 SQL : ${new Date()}, ${err}`);
           return res.status(500).json(`⚽ ERROR: PROBLEME SUR LE CODE, 
            contacter l'administrateur 🤬`);
       })
       .then(db.connection.end());
}

/**
 * deleteCategoryRepository
 * @param id
 * @param res
 * @returns {Promise<unknown>}
 */
exports.deleteCategoryRepository = async(id, res) => {
    const db = new Database();
    return await db.connection.promise().query()
        .then(([rows]) => {
            console.log(`░▒▓ INFO : DELETE CATEGORY : ${new Date()}`);
            return res.status(201).json(rows);
        })
        .catch(err => {
            console.log(`✘ 🅴🆁🆁🅾🆁 SQL : ${new Date()}, ${err}`);
            return res.status(500).json(`⚽ ERROR: PROBLEME SUR LE CODE, 
            contacter l'administrateur 🤬`);
        })
        .then(db.connection.end());
}