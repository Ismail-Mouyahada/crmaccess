
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class CompteursElec extends BaseModel {
	static init() {
		return super.init(
			{
				
				id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
				pdl: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				segment: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				taux_cspe: { type:Sequelize.NUMBER  ,defaultValue: Sequelize.literal('DEFAULT') },
				base_consommation: { type:Sequelize.NUMBER  ,defaultValue: Sequelize.literal('DEFAULT') },
				hp_conso: { type:Sequelize.NUMBER  ,defaultValue: Sequelize.literal('DEFAULT') },
				hc_conso: { type:Sequelize.NUMBER  ,defaultValue: Sequelize.literal('DEFAULT') },
				pte_conso: { type:Sequelize.NUMBER  ,defaultValue: Sequelize.literal('DEFAULT') },
				hch_conso: { type:Sequelize.NUMBER  ,defaultValue: Sequelize.literal('DEFAULT') },
				hpe_conso: { type:Sequelize.NUMBER  ,defaultValue: Sequelize.literal('DEFAULT') },
				hp_puiss: { type:Sequelize.NUMBER  ,defaultValue: Sequelize.literal('DEFAULT') },
				hc_puiss: { type:Sequelize.NUMBER  ,defaultValue: Sequelize.literal('DEFAULT') },
				pte_puiss: { type:Sequelize.NUMBER  ,defaultValue: Sequelize.literal('DEFAULT') },
				hph_puiss: { type:Sequelize.NUMBER  ,defaultValue: Sequelize.literal('DEFAULT') },
				hpe_puiss: { type:Sequelize.NUMBER  ,defaultValue: Sequelize.literal('DEFAULT') },
				date_cloture: { type:Sequelize.DATEONLY  ,defaultValue: Sequelize.literal('DEFAULT') },
				date_remise_offre: { type:Sequelize.DATEONLY  ,defaultValue: Sequelize.literal('DEFAULT') },
				date_debut_fourniture: { type:Sequelize.DATEONLY  ,defaultValue: Sequelize.literal('DEFAULT') },
				date_fin_fourniture: { type:Sequelize.DATEONLY  ,defaultValue: Sequelize.literal('DEFAULT') },
				reseau_distribution: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				courtage: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				efficacite: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				fiscalite: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				societe_id: { type:Sequelize.INTEGER  ,defaultValue: Sequelize.literal('DEFAULT') },
				fournisseur: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				fta: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') }
			}, 
			{ 
				sequelize,
				
				tableName: "compteurs_elec",
				modelName: "compteurs_elec",
			}
		);
	}
	
	static listFields() {
		return [
			'id', 
			'pdl', 
			'segment', 
			'taux_cspe', 
			Sequelize.literal('FTA AS fta'), 
			'base_consommation', 
			'date_debut_fourniture', 
			'date_fin_fourniture', 
			'date_cloture', 
			'date_remise_offre', 
			'reseau_distribution', 
			'courtage', 
			'efficacite', 
			'fiscalite', 
			'societe_id', 
			'fournisseur'
		];
	}

	static viewFields() {
		return [
			'id', 
			'pdl', 
			'segment', 
			'taux_cspe', 
			'base_consommation', 
			'hp_conso', 
			'hc_conso', 
			'pte_conso', 
			'hch_conso', 
			'hpe_conso', 
			'hp_puiss', 
			'hc_puiss', 
			'pte_puiss', 
			'hph_puiss', 
			'hpe_puiss', 
			'date_cloture', 
			'date_remise_offre', 
			'date_debut_fourniture', 
			'date_fin_fourniture', 
			'reseau_distribution', 
			'courtage', 
			'efficacite', 
			'fiscalite', 
			'societe_id', 
			'fournisseur', 
			Sequelize.literal('FTA AS fta')
		];
	}

	static editFields() {
		return [
			'pdl', 
			'segment', 
			'societe_id', 
			Sequelize.literal('FTA AS fta'), 
			'reseau_distribution', 
			'base_consommation', 
			'taux_cspe', 
			'hp_conso', 
			'hc_conso', 
			'pte_conso', 
			'hch_conso', 
			'hpe_conso', 
			'hp_puiss', 
			'hc_puiss', 
			'pte_puiss', 
			'hph_puiss', 
			'hpe_puiss', 
			'date_debut_fourniture', 
			'date_fin_fourniture', 
			'date_remise_offre', 
			'date_cloture', 
			'courtage', 
			'efficacite', 
			'fiscalite', 
			'fournisseur', 
			'id'
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("id LIKE :search"), 
			Sequelize.literal("pdl LIKE :search"), 
			Sequelize.literal("segment LIKE :search"), 
			Sequelize.literal("FTA LIKE :search"), 
			Sequelize.literal("reseau_distribution LIKE :search"), 
			Sequelize.literal("courtage LIKE :search"), 
			Sequelize.literal("efficacite LIKE :search"), 
			Sequelize.literal("fiscalite LIKE :search"), 
			Sequelize.literal("fournisseur LIKE :search"),
		];
	}

	
	
}
CompteursElec.init();
export default CompteursElec;
