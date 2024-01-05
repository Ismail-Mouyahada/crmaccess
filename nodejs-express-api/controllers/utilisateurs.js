import { Router } from 'express';
import { body } from 'express-validator';
import utils from '../helpers/utils.js';
import uploader from '../helpers/uploader.js';
import validateFormData from '../helpers/validate_form.js';
import DB from '../models/db.js';


const router = Router();




/**
 * Route to list utilisateurs records
 * @GET /utilisateurs/index/{fieldname}/{fieldvalue}
 */
router.get(['/', '/index/:fieldname?/:fieldvalue?'], async (req, res) => {  
	try{
		const query = {};
		let queryFilters = [];
		let where = {};
		let replacements = {};
		let fieldName = req.params.fieldname;
		let fieldValue = req.params.fieldvalue;
		
		if (fieldName){
			queryFilters.push(DB.filterBy(fieldName, fieldValue));
		}
		let search = req.query.search;
		if(search){
			let searchFields = DB.Utilisateurs.searchFields();
			where[DB.op.or] = searchFields;
			replacements.search = `%${search}%`;
		}
		
		if(queryFilters.length){
			where[DB.op.and] = queryFilters;
		}
		query.raw = true;
		query.where = where;
		query.replacements = replacements;
		query.order = DB.getOrderBy(req, 'id', 'desc');
		query.attributes = DB.Utilisateurs.listFields();
		let page = parseInt(req.query.page) || 1;
		let limit = parseInt(req.query.limit) || 10;
		let result = await DB.Utilisateurs.paginate(query, page, limit);
		return res.ok(result);
	}
	catch(err) {
		return res.serverError(err);
	}
});


/**
 * Route to view Utilisateurs record
 * @GET /utilisateurs/view/{recid}
 */
router.get('/view/:recid', async (req, res) => {
	try{
		const recid = req.params.recid || null;
		const query = {}
		const where = {}
		where['id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.Utilisateurs.viewFields();
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
 * Route to insert Utilisateurs record
 * @POST /utilisateurs/add
 */
router.post('/add/', 
	[
		body('nom_utilisateur').not().isEmpty(),
		body('profile').optional({nullable: true, checkFalsy: true}),
		body('telephone').not().isEmpty(),
		body('mot_de_passe').not().isEmpty(),
		body('confirm_password', 'Passwords do not match').custom((value, {req}) => (value === req.body.mot_de_passe)),
		body('email').not().isEmpty().isEmail(),
	], validateFormData
, async function (req, res) {
	try{
		let modeldata = req.getValidFormData();
		modeldata.mot_de_passe = utils.passwordHash(modeldata.mot_de_passe);
		
		// check if nom_utilisateur already exist.
		let nom_utilisateurCount = await DB.Utilisateurs.count({ where:{ 'nom_utilisateur': modeldata.nom_utilisateur } });
		if(nom_utilisateurCount > 0){
			return res.badRequest(`${modeldata.nom_utilisateur} already exist.`);
		}
		
		// check if email already exist.
		let emailCount = await DB.Utilisateurs.count({ where:{ 'email': modeldata.email } });
		if(emailCount > 0){
			return res.badRequest(`${modeldata.email} already exist.`);
		}
		
        // move uploaded file from temp directory to destination directory
		if(modeldata.profile !== undefined) {
			const fileInfo = uploader.moveUploadedFiles(modeldata.profile, 'profile');
			modeldata.profile = fileInfo.filepath;
		}
		
		//save Utilisateurs record
		let record = await DB.Utilisateurs.create(modeldata);
		//await record.reload(); //reload the record from database
		const recid =  record['id'];
		
		return res.ok(record);
	} catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to get  Utilisateurs record for edit
 * @GET /utilisateurs/edit/{recid}
 */
router.get('/edit/:recid', async (req, res) => {
	try{
		const recid = req.params.recid;
		const query = {};
		const where = {};
		where['id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.Utilisateurs.editFields();
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
router.post('/edit/:recid', 
	[
		body('nom_utilisateur').optional({nullable: true}).not().isEmpty(),
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
		const recid = req.params.recid;
		let modeldata = req.getValidFormData({ includeOptionals: true });
		
		// check if nom_utilisateur already exist.
		let nom_utilisateurCount = await DB.Utilisateurs.count({where:{'nom_utilisateur': modeldata.nom_utilisateur, 'id': {[DB.op.ne]: recid} }});
		if(nom_utilisateurCount > 0){
			return res.badRequest(`${modeldata.nom_utilisateur} already exist.`);
		}
		
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
		query.attributes = DB.Utilisateurs.editFields();
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


/**
 * Route to delete Utilisateurs record by table primary key
 * Multi delete supported by recid separated by comma(,)
 * @GET /utilisateurs/delete/{recid}
 */
router.get('/delete/:recid', async (req, res) => {
	try{
		const recid = (req.params.recid || '').split(',');
		const query = {};
		const where = {};
		where['id'] = recid;
		query.raw = true;
		query.where = where;
		let records = await DB.Utilisateurs.findAll(query);
		records.forEach(async (record) => { 
			//perform action on each record before delete
		});
		await DB.Utilisateurs.destroy(query);
		return res.ok(recid);
	}
	catch(err){
		return res.serverError(err);
	}
});
export default router;
