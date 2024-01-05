
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class Fournisseurs extends BaseModel {
	static init() {
		return super.init(
			{
				
				id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
				logo: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				nom_fournisseurs: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				gaz: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				electrcite: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				verte: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				disponible: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') }
			}, 
			{ 
				sequelize,
				
				tableName: "fournisseurs",
				modelName: "fournisseurs",
			}
		);
	}
	
	static listFields() {
		return [
			'logo', 
			'nom_fournisseurs', 
			'gaz', 
			'electrcite', 
			'verte', 
			'disponible', 
			'id'
		];
	}

	static viewFields() {
		return [
			'id', 
			'logo', 
			'nom_fournisseurs', 
			'gaz', 
			'electrcite', 
			'verte', 
			'disponible'
		];
	}

	static editFields() {
		return [
			'id', 
			'logo', 
			'nom_fournisseurs', 
			'gaz', 
			'electrcite', 
			'verte', 
			'disponible'
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("logo LIKE :search"), 
			Sequelize.literal("nom_fournisseurs LIKE :search"), 
			Sequelize.literal("gaz LIKE :search"), 
			Sequelize.literal("electrcite LIKE :search"), 
			Sequelize.literal("verte LIKE :search"), 
			Sequelize.literal("disponible LIKE :search"), 
			Sequelize.literal("id LIKE :search"),
		];
	}

	
	
}
Fournisseurs.init();
export default Fournisseurs;
