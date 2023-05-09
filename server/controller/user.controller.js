const {User} = require("../model/User.model");
const {ROLE} = require("../enum/ROLES");
const bcrypt = require("bcrypt");
const {Database} = require("../Database/Database");
const {createUserRepository, updateUserInfoRepository, updateUserCredentialRepository, getAllUserRepository,
    updateRoleUserRepository, deleteUserRepository
} = require("../repository/user.repository");
const {findUserByEmail, findUserById} = require("../query/user.query");

/**
 * Create USER
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
exports.createUserController = async(req, res, next) => {
    try {
        const user = new User();
        user.email = req.body.email;
        user.firstname = req.body.firstname;
        user.lastname = req.body.lastname;
        user.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(16));
        user.phone_number = req.body.phone_number;
        user.ROLE = JSON.stringify([ROLE.USER]);
        user.isValidMail = false;

        const db = new Database();
        db.connection.promise().query(
            findUserByEmail(), [user.email.toLowerCase()])
            .then(([rows]) => {
                if (rows.length > 0) {
                    if(rows.length > 0) {
                        console.log(`░▒▓ INFO : FIND USER WITH THE SAME EMAIL ${new Date()}`);
                        res.status(401).json("Un compte est déjà créé avec cet email");
                    }
                } else {
                     return createUserRepository(user,res);
                }
            }).catch(err => {
            console.log(`✘ 🅴🆁🆁🅾🆁 SQL : ${new Date()} : Verify => ${err}`)
            res.status(500).json(err)
        }).then(db.connection.end());

    } catch (e) {
        next(e);
    }
}

exports.updateUserInfoController = async(req, res, next) => {
    try {
        const user = new User();
        user.id = req.body.id;
        user.email = req.body.email.toLowerCase().trim();
        user.firstname = req.body.firstname.toLowerCase().trim();
        user.lastname = req.body.lastname.toLowerCase().trim();
        user.phone_number = req.body.phone_number;
        user.old_email = req.body.old_email.toLowerCase().trim();

        if(user.old_email === user.email) {
            return await updateUserInfoRepository(user,res);
        } else {
            const db = new Database();
            db.connection.promise().query(findUserByEmail(), [user.email])
                .then(([rows]) => {
                    if (rows.length > 0) {
                        if(rows.length > 0) {
                            console.log(`░▒▓ INFO : FIND USER WITH THE SAME EMAIL ${new Date()}`);
                            res.status(401).json("Un compte est déjà créé avec cet email");
                        }
                    } else {
                        return updateUserInfoRepository(user,res);
                    }
                })
                .catch(err => {
                console.log(`✘ 🅴🆁🆁🅾🆁 SQL : ${new Date()} : Verify => ${err}`)
                res.status(500).json(err)
            }).then(db.connection.end());
        }
    } catch (e) {
        next(e);
    }
}

exports.updateUserCredentialController = async(req, res, next) => {
    try {
        const db = new Database();
        return await db.connection.promise().query(findUserById(), [req.body.id])
            .then(([rows]) => {
                let user = rows[0];
                if(user) {
                    bcrypt.compare(req.body.old_password, user.password, (err, isValidPwd) => {
                        if(isValidPwd) {
                            return updateUserCredentialRepository(req, res, next);
                        } else {
                            return res.status(401).json("L'ancien mot de passe renseigné n'est pas valide, ECHEC de la modification.")
                        }
                    })
                }
            })
            .catch( err => {
                console.log(`✘ 🅴🆁🆁🅾🆁 SQL : ${new Date()} : Verify => ${err}`)
                res.status(500).json(err)
            }).then(db.connection.end())
    } catch (e) {
        next(e);
    }
}

/**
 * getAllUserController
 * @param res
 * @param req
 * @param next
 * @returns {Promise<void>}
 */
exports.getAllUserController = async(req, res, next) => {
    try{
        return await getAllUserRepository(req,res);
    } catch (e) {
        next(e);
    }
}

/**
 * updateRoleUserController
 * @param res
 * @param raq
 * @param next
 * @returns {Promise<void>}
 */
exports.updateRoleUserController = async(req,res,next) => {
    try{
        if(req.body.id_current_user != req.body.id_user_update) {
            return await updateRoleUserRepository(req, res);
        } else {
            res.status(401).json("Les ID sont identique vous n'avez pas l'authorisation");
        }
    } catch (e) {
        next(e);
    }
}

/**
 * deleteUserController
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
exports.deleteUserController = async(req, res, next) => {
    try {
        if(req.params.id_current_user != req.params.id_user_update) {
            return await deleteUserRepository(req, res);
        } else {
            return res.status(401).json("Les ID sont identique vous n'avez pas l'authorisation");
        }
    } catch (e) {
        next(e);
    }
}

