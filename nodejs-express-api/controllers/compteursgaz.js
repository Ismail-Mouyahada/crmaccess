import { Router } from 'express';
import { body } from 'express-validator';
import validateFormData from '../helpers/validate_form.js';
import DB from '../models/db.js';


const router = Router();




/**
 * Route to list compteursgaz records
 * @GET /compteursgaz/index/{fieldname}/{fieldvalue}
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
			let searchFields = DB.CompteursGaz.searchFields();
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
		query.attributes = DB.CompteursGaz.listFields();
		let page = parseInt(req.query.page) || 1;
		let limit = parseInt(req.query.limit) || 10;
		let result = await DB.CompteursGaz.paginate(query, page, limit);
		return res.ok(result);
	}
	catch(err) {
		return res.serverError(err);
	}
});


/**
 * Route to view CompteursGaz record
 * @GET /compteursgaz/view/{recid}
 */
router.get('/view/:recid', async (req, res) => {
	try{
		const recid = req.params.recid || null;
		const query = {}
		const where = {}
		where['id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.CompteursGaz.viewFields();
		let record = await DB.CompteursGaz.findOne(query);
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
 * Route to insert CompteursGaz record
 * @POST /compteursgaz/add
 */
router.post('/add/', 
	[
		body('pce').optional({nullable: true, checkFalsy: true}),
		body('societe_id').optional({nullable: true, checkFalsy: true}),
		body('profil').optional({nullable: true, checkFalsy: true}),
		body('tarif_distribution').optional({nullable: true, checkFalsy: true}),
		body('eligible_cee').optional({nullable: true, checkFalsy: true}),
		body('car').optional({nullable: true, checkFalsy: true}).isNumeric(),
		body('date_debut_fourniture').optional({nullable: true, checkFalsy: true}),
		body('date_fin_fourniture').optional({nullable: true, checkFalsy: true}),
		body('date_remise_offre').optional({nullable: true, checkFalsy: true}),
		body('date_cloture').optional({nullable: true, checkFalsy: true}),
		body('efficacite').optional({nullable: true, checkFalsy: true}),
		body('fiscalite').optional({nullable: true, checkFalsy: true}),
		body('courtage').optional({nullable: true, checkFalsy: true}),
		body('fournisseur').optional({nullable: true, checkFalsy: true}),
	], validateFormData
, async function (req, res) {
	try{
		let modeldata = req.getValidFormData();
		
		//save CompteursGaz record
		let record = await DB.CompteursGaz.create(modeldata);
		//await record.reload(); //reload the record from database
		const recid =  record['id'];
		
		return res.ok(record);
	} catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to get  CompteursGaz record for edit
 * @GET /compteursgaz/edit/{recid}
 */
router.get('/edit/:recid', async (req, res) => {
	try{
		const recid = req.params.recid;
		const query = {};
		const where = {};
		where['id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.CompteursGaz.editFields();
		let record = await DB.CompteursGaz.findOne(query);
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
 * Route to update  CompteursGaz record
 * @POST /compteursgaz/edit/{recid}
 */
router.post('/edit/:recid', 
	[
		body('pce').optional({nullable: true, checkFalsy: true}),
		body('societe_id').optional({nullable: true, checkFalsy: true}),
		body('profil').optional({nullable: true, checkFalsy: true}),
		body('tarif_distribution').optional({nullable: true, checkFalsy: true}),
		body('eligible_cee').optional({nullable: true, checkFalsy: true}),
		body('car').optional({nullable: true, checkFalsy: true}).isNumeric(),
		body('date_debut_fourniture').optional({nullable: true, checkFalsy: true}),
		body('date_fin_fourniture').optional({nullable: true, checkFalsy: true}),
		body('date_remise_offre').optional({nullable: true, checkFalsy: true}),
		body('date_cloture').optional({nullable: true, checkFalsy: true}),
		body('efficacite').optional({nullable: true, checkFalsy: true}),
		body('fiscalite').optional({nullable: true, checkFalsy: true}),
		body('courtage').optional({nullable: true, checkFalsy: true}),
		body('fournisseur').optional({nullable: true, checkFalsy: true}),
	], validateFormData
, async (req, res) => {
	try{
		const recid = req.params.recid;
		let modeldata = req.getValidFormData({ includeOptionals: true });
		const query = {};
		const where = {};
		where['id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.CompteursGaz.editFields();
		let record = await DB.CompteursGaz.findOne(query);
		if(!record){
			return res.notFound();
		}
		await DB.CompteursGaz.update(modeldata, {where: where});
		return res.ok(modeldata);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to delete CompteursGaz record by table primary key
 * Multi delete supported by recid separated by comma(,)
 * @GET /compteursgaz/delete/{recid}
 */
router.get('/delete/:recid', async (req, res) => {
	try{
		const recid = (req.params.recid || '').split(',');
		const query = {};
		const where = {};
		where['id'] = recid;
		query.raw = true;
		query.where = where;
		let records = await DB.CompteursGaz.findAll(query);
		records.forEach(async (record) => { 
			//perform action on each record before delete
		});
		await DB.CompteursGaz.destroy(query);
		return res.ok(recid);
	}
	catch(err){
		return res.serverError(err);
	}
});
export default router;
