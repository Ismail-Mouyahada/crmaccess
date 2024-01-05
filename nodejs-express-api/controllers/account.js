import { Router } from 'express';
import { body } from 'express-validator';
import utils from '../helpers/utils.js';
import uploader from '../helpers/uploader.js';
import validateFormData from '../helpers/validate_form.js';
import DB from '../models/db.js';
const router = Router();
/**
 * Route to view user account record
 * @GET /account
 */
router.get(['/','/index'], async (req, res) => {
	try{
		let recid = req.user.id;
		let query = {};
		let where = {};
		where['id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.Utilisateurs.accountviewFields();
		let record = await DB.Utilisateurs.findOne(query);
		if(!record){
			return res.notFound();
		}
		return res.ok(record);
	}
	catch(err){
		return res.serverError(err);
	}
});
/**
 * Route to get  Utilisateurs record for edit
 * @GET /utilisateurs/edit/{recid}
 */
router.get(['/edit'], async (req, res) => {
	try{
		const recid = req.user.id;
		const query = {};
		const where = {};
		where['id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.Utilisateurs.accounteditFields();
		let record = await DB.Utilisateurs.findOne(query);
		if(!record){
			return res.notFound();
		}
		return res.ok(record);
	}
	catch(err){
		return res.serverError(err);
	}
});
/**
 * Route to update  Utilisateurs record
 * @POST /utilisateurs/edit/{recid}
 */
router.post(['/edit'], 
	[
		body('nom_utilisateur').optional({nullable: true, checkFalsy: true}),
		body('nom').optional({nullable: true, checkFalsy: true}),
		body('prenom').optional({nullable: true, checkFalsy: true}),
		body('agence').optional({nullable: true, checkFalsy: true}),
		body('profile').optional({nullable: true, checkFalsy: true}),
		body('adresse').optional({nullable: true, checkFalsy: true}),
		body('statut').optional({nullable: true, checkFalsy: true}),
		body('telephone').optional({nullable: true}).not().isEmpty(),
	], validateFormData
, async (req, res) => {
	try{
		const recid = req.user.id;
		let modeldata = req.getValidFormData({ includeOptionals: true });
        // move uploaded file from temp directory to destination directory
		if(modeldata.profile !== undefined) {
			const fileInfo = uploader.moveUploadedFiles(modeldata.profile, 'profile');
			modeldata.profile = fileInfo.filepath;
		}
		const query = {};
		const where = {};
		where['id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.Utilisateurs.accounteditFields();
		let record = await DB.Utilisateurs.findOne(query);
		if(!record){
			return res.notFound();
		}
		await DB.Utilisateurs.update(modeldata, {where: where});
		return res.ok(modeldata);
	}
	catch(err){
		return res.serverError(err);
	}
});
router.get('/currentuserdata', async function (req, res)
{
	const user = req.user;
    return res.ok(user);
});
/**
 * Route to change user password
 * @POST /account
 */
router.post('/changepassword' , 
	[
		body('oldpassword').not().isEmpty(),
		body('newpassword').not().isEmpty(),
		body('confirmpassword').not().isEmpty().custom((value, {req}) => (value === req.body.newpassword))
	], validateFormData, async function (req, res) {
	try{
		let oldPassword = req.body.oldpassword;
		let newPassword = req.body.newpassword;
		let userId = req.user.id;
		let query = {};
		let where = {
			id: userId,
		};
		query.raw = true;
		query.where = where;
		query.attributes = ['mot_de_passe'];
		let user = await DB.Utilisateurs.findOne(query);
		let currentPasswordHash = user.mot_de_passe;
		if(!utils.passwordVerify(oldPassword, currentPasswordHash)){
			return res.badRequest("Current password is incorrect");
		}
		let modeldata = {
			mot_de_passe: utils.passwordHash(newPassword)
		}
		await DB.Utilisateurs.update(modeldata, {where: where});
		return res.ok("Password change completed");
	}
	catch(err){
		return res.serverError(err);
	}
});
export default router;
