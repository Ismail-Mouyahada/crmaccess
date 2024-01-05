import { Router } from 'express';
import DB from '../models/db.js';


const router = Router();


 /**
 * Route to get societe_id_option_list records
 * @GET /components_data/societe_id_option_list
 */
router.get('/societe_id_option_list', async (req, res) => {
	try{
		let sqltext = `SELECT  DISTINCT id AS value,nom_entreprise AS label FROM societes ORDER BY id ASC` ;
		
		let records = await DB.rawQueryList(sqltext);
		return res.ok(records);
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to get fournisseur_option_list records
 * @GET /components_data/fournisseur_option_list
 */
router.get('/fournisseur_option_list', async (req, res) => {
	try{
		let sqltext = `SELECT  DISTINCT nom_fournisseurs AS value,nom_fournisseurs AS label FROM fournisseurs ORDER BY nom_fournisseurs ASC` ;
		
		let records = await DB.rawQueryList(sqltext);
		return res.ok(records);
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to get compteurselec_societe_id_autofill records
 * @GET /components_data/compteurselec_societe_id_autofill
 */
router.get('/compteurselec_societe_id_autofill', async (req, res) => {
	try{
		let sqltext = `SELECT id FROM societes WHERE nom_entreprise=:value` ;
		let queryParams = {};
		queryParams['value'] = req.query.value;
		let records = await DB.rawQueryList(sqltext, queryParams,);
		return res.ok(records);
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to get societe_id_option_list_2 records
 * @GET /components_data/societe_id_option_list_2
 */
router.get('/societe_id_option_list_2', async (req, res) => {
	try{
		let sqltext = `SELECT  DISTINCT id AS value,nom_entreprise AS label FROM societes ORDER BY nom_entreprise DESC` ;
		
		let records = await DB.rawQueryList(sqltext);
		return res.ok(records);
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to get type_evenement_option_list records
 * @GET /components_data/type_evenement_option_list
 */
router.get('/type_evenement_option_list', async (req, res) => {
	try{
		let sqltext = `SELECT  DISTINCT nom_evenement AS value,nom_evenement AS label FROM type_evenements ORDER BY nom_evenement DESC` ;
		
		let records = await DB.rawQueryList(sqltext);
		return res.ok(records);
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to check if field value already exist in a Utilisateurs table
 * @GET /components_data/utilisateurs_nom_utilisateur_exist/{fieldvalue}
 */
router.get('/utilisateurs_nom_utilisateur_exist/:fieldvalue', async (req, res) => {
	try{
		let val = req.params.fieldvalue
		let count = await DB.Utilisateurs.count({ where:{ 'nom_utilisateur': val } });
		if(count > 0){
			return res.ok("true");
		}
		return res.ok("false");
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to check if field value already exist in a Utilisateurs table
 * @GET /components_data/utilisateurs_email_exist/{fieldvalue}
 */
router.get('/utilisateurs_email_exist/:fieldvalue', async (req, res) => {
	try{
		let val = req.params.fieldvalue
		let count = await DB.Utilisateurs.count({ where:{ 'email': val } });
		if(count > 0){
			return res.ok("true");
		}
		return res.ok("false");
	}
	catch(err){
		return res.serverError(err);
	}
});
export default router;
