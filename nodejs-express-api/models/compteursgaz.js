
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class CompteursGaz extends BaseModel {
	static init() {
		return super.init(
			{
				
				id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
				pce: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				profil: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				car: { type:Sequelize.NUMBER  ,defaultValue: Sequelize.literal('DEFAULT') },
				tarif_distribution: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				eligible_cee: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				date_cloture: { type:Sequelize.DATEONLY  ,defaultValue: Sequelize.literal('DEFAULT') },
				date_remise_offre: { type:Sequelize.DATEONLY  ,defaultValue: Sequelize.literal('DEFAULT') },
				date_debut_fourniture: { type:Sequelize.DATEONLY  ,defaultValue: Sequelize.literal('DEFAULT') },
				date_fin_fourniture: { type:Sequelize.DATEONLY  ,defaultValue: Sequelize.literal('DEFAULT') },
				efficacite: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				fiscalite: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				courtage: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				societe_id: { type:Sequelize.INTEGER  ,defaultValue: Sequelize.literal('DEFAULT') },
				fournisseur: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') }
			}, 
			{ 
				sequelize,
				
				tableName: "compteurs_gaz",
				modelName: "compteurs_gaz",
			}
		);
	}
	
	static listFields() {
		return [
			Sequelize.literal('PCE AS pce'), 
			'profil', 
			'car', 
			'tarif_distribution', 
			'eligible_cee', 
			'date_cloture', 
			'date_remise_offre', 
			'date_debut_fourniture', 
			'date_fin_fourniture', 
			'efficacite', 
			'fiscalite', 
			'courtage', 
			'societe_id', 
			'fournisseur', 
			'id'
		];
	}

	static viewFields() {
		return [
			'id', 
			Sequelize.literal('PCE AS pce'), 
			'profil', 
			'car', 
			'tarif_distribution', 
			'eligible_cee', 
			'date_cloture', 
			'date_remise_offre', 
			'date_debut_fourniture', 
			'date_fin_fourniture', 
			'efficacite', 
			'fiscalite', 
			'courtage', 
			'societe_id', 
			'fournisseur'
		];
	}

	static editFields() {
		return [
			Sequelize.literal('PCE AS pce'), 
			'societe_id', 
			'profil', 
			'tarif_distribution', 
			'eligible_cee', 
			'car', 
			'date_debut_fourniture', 
			'date_fin_fourniture', 
			'date_remise_offre', 
			'date_cloture', 
			'efficacite', 
			'fiscalite', 
			'courtage', 
			'fournisseur', 
			'id'
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("PCE LIKE :search"), 
			Sequelize.literal("profil LIKE :search"), 
			Sequelize.literal("tarif_distribution LIKE :search"), 
			Sequelize.literal("eligible_cee LIKE :search"), 
			Sequelize.literal("efficacite LIKE :search"), 
			Sequelize.literal("fiscalite LIKE :search"), 
			Sequelize.literal("courtage LIKE :search"), 
			Sequelize.literal("fournisseur LIKE :search"), 
			Sequelize.literal("id LIKE :search"),
		];
	}

	
	
}
CompteursGaz.init();
export default CompteursGaz;
