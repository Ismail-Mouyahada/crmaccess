import { Router } from 'express';
import { body } from 'express-validator';
import validateFormData from '../helpers/validate_form.js';
import DB from '../models/db.js';


const router = Router();




/**
 * Route to list evenements records
 * @GET /evenements/index/{fieldname}/{fieldvalue}
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
			let searchFields = DB.Evenements.searchFields();
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
		query.attributes = DB.Evenements.listFields();
		let page = parseInt(req.query.page) || 1;
		let limit = parseInt(req.query.limit) || 10;
		let result = await DB.Evenements.paginate(query, page, limit);
		return res.ok(result);
	}
	catch(err) {
		return res.serverError(err);
	}
});


/**
 * Route to view Evenements record
 * @GET /evenements/view/{recid}
 */
router.get('/view/:recid', async (req, res) => {
	try{
		const recid = req.params.recid || null;
		const query = {}
		const where = {}
		where['id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.Evenements.viewFields();
		let record = await DB.Evenements.findOne(query);
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
 * Route to insert Evenements record
 * @POST /evenements/add
 */
router.post('/add/', 
	[
		body('type_evenement').optional({nullable: true, checkFalsy: true}),
		body('sujet').optional({nullable: true, checkFalsy: true}),
		body('statut').optional({nullable: true, checkFalsy: true}),
		body('date_rendez_vous').optional({nullable: true, checkFalsy: true}),
		body('details').optional({nullable: true, checkFalsy: true}),
		body('societe_id').optional({nullable: true, checkFalsy: true}).isNumeric(),
	], validateFormData
, async function (req, res) {
	try{
		let modeldata = req.getValidFormData();
		
		//save Evenements record
		let record = await DB.Evenements.create(modeldata);
		//await record.reload(); //reload the record from database
		const recid =  record['id'];
		
		return res.ok(record);
	} catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to get  Evenements record for edit
 * @GET /evenements/edit/{recid}
 */
router.get('/edit/:recid', async (req, res) => {
	try{
		const recid = req.params.recid;
		const query = {};
		const where = {};
		where['id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.Evenements.editFields();
		let record = await DB.Evenements.findOne(query);
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
 * Route to update  Evenements record
 * @POST /evenements/edit/{recid}
 */
router.post('/edit/:recid', 
	[
		body('type_evenement').optional({nullable: true, checkFalsy: true}),
		body('sujet').optional({nullable: true, checkFalsy: true}),
		body('statut').optional({nullable: true, checkFalsy: true}),
		body('date_rendez_vous').optional({nullable: true, checkFalsy: true}),
		body('details').optional({nullable: true, checkFalsy: true}),
		body('societe_id').optional({nullable: true, checkFalsy: true}).isNumeric(),
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
		query.attributes = DB.Evenements.editFields();
		let record = await DB.Evenements.findOne(query);
		if(!record){
			return res.notFound();
		}
		await DB.Evenements.update(modeldata, {where: where});
		return res.ok(modeldata);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to delete Evenements record by table primary key
 * Multi delete supported by recid separated by comma(,)
 * @GET /evenements/delete/{recid}
 */
router.get('/delete/:recid', async (req, res) => {
	try{
		const recid = (req.params.recid || '').split(',');
		const query = {};
		const where = {};
		where['id'] = recid;
		query.raw = true;
		query.where = where;
		let records = await DB.Evenements.findAll(query);
		records.forEach(async (record) => { 
			//perform action on each record before delete
		});
		await DB.Evenements.destroy(query);
		return res.ok(recid);
	}
	catch(err){
		return res.serverError(err);
	}
});
export default router;
