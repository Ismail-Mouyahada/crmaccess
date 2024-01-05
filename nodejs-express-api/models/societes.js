
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class Societes extends BaseModel {
	static init() {
		return super.init(
			{
				
				id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
				siren: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				logo: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				nom_entreprise: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				ville: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				code_postal: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				region: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				adresse: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				utilisateur_id: { type:Sequelize.INTEGER  ,defaultValue: Sequelize.literal('DEFAULT') },
				note_elirpo: { type:Sequelize.NUMBER  ,defaultValue: Sequelize.literal('DEFAULT') },
				note_creditsafe: { type:Sequelize.NUMBER  ,defaultValue: Sequelize.literal('DEFAULT') }
			}, 
			{ 
				sequelize,
				
				tableName: "societes",
				modelName: "societes",
			}
		);
	}
	
	static listFields() {
		return [
			'id', 
			'logo', 
			'siren', 
			'nom_entreprise', 
			'ville', 
			'code_postal', 
			'region', 
			'adresse', 
			'utilisateur_id', 
			'note_elirpo', 
			'note_creditsafe'
		];
	}

	static viewFields() {
		return [
			'id', 
			'siren', 
			'logo', 
			'nom_entreprise', 
			'ville', 
			'code_postal', 
			'region', 
			'adresse', 
			'utilisateur_id', 
			'note_elirpo', 
			'note_creditsafe'
		];
	}

	static editFields() {
		return [
			'id', 
			'siren', 
			'logo', 
			'nom_entreprise', 
			'ville', 
			'code_postal', 
			'region', 
			'adresse', 
			'utilisateur_id', 
			'note_elirpo', 
			'note_creditsafe'
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("id LIKE :search"), 
			Sequelize.literal("logo LIKE :search"), 
			Sequelize.literal("siren LIKE :search"), 
			Sequelize.literal("nom_entreprise LIKE :search"), 
			Sequelize.literal("ville LIKE :search"), 
			Sequelize.literal("code_postal LIKE :search"), 
			Sequelize.literal("region LIKE :search"), 
			Sequelize.literal("adresse LIKE :search"),
		];
	}

	
	
}
Societes.init();
export default Societes;
