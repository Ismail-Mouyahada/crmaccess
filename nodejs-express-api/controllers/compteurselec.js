import { Router } from 'express';
import { body } from 'express-validator';
import validateFormData from '../helpers/validate_form.js';
import DB from '../models/db.js';


const router = Router();




/**
 * Route to list compteurselec records
 * @GET /compteurselec/index/{fieldname}/{fieldvalue}
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
			let searchFields = DB.CompteursElec.searchFields();
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
		query.attributes = DB.CompteursElec.listFields();
		let page = parseInt(req.query.page) || 1;
		let limit = parseInt(req.query.limit) || 10;
		let result = await DB.CompteursElec.paginate(query, page, limit);
		return res.ok(result);
	}
	catch(err) {
		return res.serverError(err);
	}
});


/**
 * Route to view CompteursElec record
 * @GET /compteurselec/view/{recid}
 */
router.get('/view/:recid', async (req, res) => {
	try{
		const recid = req.params.recid || null;
		const query = {}
		const where = {}
		where['id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.CompteursElec.viewFields();
		let record = await DB.CompteursElec.findOne(query);
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
 * Route to insert CompteursElec record
 * @POST /compteurselec/add
 */
router.post('/add/', 
	[
		body('pdl').optional({nullable: true, checkFalsy: true}),
		body('segment').optional({nullable: true, checkFalsy: true}),
		body('societe_id').optional({nullable: true, checkFalsy: true}),
		body('fta').optional({nullable: true, checkFalsy: true}),
		body('reseau_distribution').optional({nullable: true, checkFalsy: true}),
		body('base_consommation').optional({nullable: true, checkFalsy: true}).isNumeric(),
		body('taux_cspe').optional({nullable: true, checkFalsy: true}).isNumeric(),
		body('hp_conso').optional({nullable: true, checkFalsy: true}).isNumeric(),
		body('hc_conso').optional({nullable: true, checkFalsy: true}).isNumeric(),
		body('pte_conso').optional({nullable: true, checkFalsy: true}).isNumeric(),
		body('hch_conso').optional({nullable: true, checkFalsy: true}).isNumeric(),
		body('hpe_conso').optional({nullable: true, checkFalsy: true}).isNumeric(),
		body('hp_puiss').optional({nullable: true, checkFalsy: true}).isNumeric(),
		body('hc_puiss').optional({nullable: true, checkFalsy: true}).isNumeric(),
		body('pte_puiss').optional({nullable: true, checkFalsy: true}).isNumeric(),
		body('hph_puiss').optional({nullable: true, checkFalsy: true}).isNumeric(),
		body('hpe_puiss').optional({nullable: true, checkFalsy: true}).isNumeric(),
		body('date_debut_fourniture').optional({nullable: true, checkFalsy: true}),
		body('date_fin_fourniture').optional({nullable: true, checkFalsy: true}),
		body('date_remise_offre').optional({nullable: true, checkFalsy: true}),
		body('date_cloture').optional({nullable: true, checkFalsy: true}),
		body('courtage').optional({nullable: true, checkFalsy: true}),
		body('efficacite').optional({nullable: true, checkFalsy: true}),
		body('fiscalite').optional({nullable: true, checkFalsy: true}),
		body('fournisseur').optional({nullable: true, checkFalsy: true}),
	], validateFormData
, async function (req, res) {
	try{
		let modeldata = req.getValidFormData();
		
		//save CompteursElec record
		let record = await DB.CompteursElec.create(modeldata);
		//await record.reload(); //reload the record from database
		const recid =  record['id'];
		
		return res.ok(record);
	} catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to get  CompteursElec record for edit
 * @GET /compteurselec/edit/{recid}
 */
router.get('/edit/:recid', async (req, res) => {
	try{
		const recid = req.params.recid;
		const query = {};
		const where = {};
		where['id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.CompteursElec.editFields();
		let record = await DB.CompteursElec.findOne(query);
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
 * Route to update  CompteursElec record
 * @POST /compteurselec/edit/{recid}
 */
router.post('/edit/:recid', 
	[
		body('pdl').optional({nullable: true, checkFalsy: true}),
		body('segment').optional({nullable: true, checkFalsy: true}),
		body('societe_id').optional({nullable: true, checkFalsy: true}),
		body('fta').optional({nullable: true, checkFalsy: true}),
		body('reseau_distribution').optional({nullable: true, checkFalsy: true}),
		body('base_consommation').optional({nullable: true, checkFalsy: true}).isNumeric(),
		body('taux_cspe').optional({nullable: true, checkFalsy: true}).isNumeric(),
		body('hp_conso').optional({nullable: true, checkFalsy: true}).isNumeric(),
		body('hc_conso').optional({nullable: true, checkFalsy: true}).isNumeric(),
		body('pte_conso').optional({nullable: true, checkFalsy: true}).isNumeric(),
		body('hch_conso').optional({nullable: true, checkFalsy: true}).isNumeric(),
		body('hpe_conso').optional({nullable: true, checkFalsy: true}).isNumeric(),
		body('hp_puiss').optional({nullable: true, checkFalsy: true}).isNumeric(),
		body('hc_puiss').optional({nullable: true, checkFalsy: true}).isNumeric(),
		body('pte_puiss').optional({nullable: true, checkFalsy: true}).isNumeric(),
		body('hph_puiss').optional({nullable: true, checkFalsy: true}).isNumeric(),
		body('hpe_puiss').optional({nullable: true, checkFalsy: true}).isNumeric(),
		body('date_debut_fourniture').optional({nullable: true, checkFalsy: true}),
		body('date_fin_fourniture').optional({nullable: true, checkFalsy: true}),
		body('date_remise_offre').optional({nullable: true, checkFalsy: true}),
		body('date_cloture').optional({nullable: true, checkFalsy: true}),
		body('courtage').optional({nullable: true, checkFalsy: true}),
		body('efficacite').optional({nullable: true, checkFalsy: true}),
		body('fiscalite').optional({nullable: true, checkFalsy: true}),
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
		query.attributes = DB.CompteursElec.editFields();
		let record = await DB.CompteursElec.findOne(query);
		if(!record){
			return res.notFound();
		}
		await DB.CompteursElec.update(modeldata, {where: where});
		return res.ok(modeldata);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to delete CompteursElec record by table primary key
 * Multi delete supported by recid separated by comma(,)
 * @GET /compteurselec/delete/{recid}
 */
router.get('/delete/:recid', async (req, res) => {
	try{
		const recid = (req.params.recid || '').split(',');
		const query = {};
		const where = {};
		where['id'] = recid;
		query.raw = true;
		query.where = where;
		let records = await DB.CompteursElec.findAll(query);
		records.forEach(async (record) => { 
			//perform action on each record before delete
		});
		await DB.CompteursElec.destroy(query);
		return res.ok(recid);
	}
	catch(err){
		return res.serverError(err);
	}
});
export default router;
