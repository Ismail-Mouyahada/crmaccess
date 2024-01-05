
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class Evenements extends BaseModel {
	static init() {
		return super.init(
			{
				
				id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
				type_evenement: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				sujet: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				statut: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				date_rendez_vous: { type:Sequelize.DATE  ,defaultValue: Sequelize.literal('DEFAULT') },
				date_creation: { type:Sequelize.DATE   },
				details: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				societe_id: { type:Sequelize.INTEGER  ,defaultValue: Sequelize.literal('DEFAULT') }
			}, 
			{ 
				sequelize,
				
				tableName: "evenements",
				modelName: "evenements",
			}
		);
	}
	
	static listFields() {
		return [
			'id', 
			'type_evenement', 
			'sujet', 
			'statut', 
			'date_rendez_vous', 
			'date_creation', 
			'societe_id'
		];
	}

	static viewFields() {
		return [
			'id', 
			'type_evenement', 
			'sujet', 
			'statut', 
			'date_rendez_vous', 
			'date_creation', 
			'details', 
			'societe_id'
		];
	}

	static editFields() {
		return [
			'type_evenement', 
			'sujet', 
			'statut', 
			'date_rendez_vous', 
			'details', 
			'societe_id', 
			'id'
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("id LIKE :search"), 
			Sequelize.literal("type_evenement LIKE :search"), 
			Sequelize.literal("sujet LIKE :search"), 
			Sequelize.literal("statut LIKE :search"), 
			Sequelize.literal("details LIKE :search"),
		];
	}

	
	
}
Evenements.init();
export default Evenements;
