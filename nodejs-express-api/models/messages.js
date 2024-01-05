
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class Messages extends BaseModel {
	static init() {
		return super.init(
			{
				
				id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
				sujet: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				details: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				societe: { type:Sequelize.INTEGER  ,defaultValue: Sequelize.literal('DEFAULT') },
				statut: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') }
			}, 
			{ 
				sequelize,
				
				tableName: "messages",
				modelName: "messages",
			}
		);
	}
	
	static listFields() {
		return [
			'id', 
			'sujet', 
			'details', 
			'societe', 
			'statut'
		];
	}

	static viewFields() {
		return [
			'id', 
			'sujet', 
			'details', 
			'societe', 
			'statut'
		];
	}

	static editFields() {
		return [
			'id', 
			'sujet', 
			'details', 
			'societe', 
			'statut'
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("id LIKE :search"), 
			Sequelize.literal("sujet LIKE :search"), 
			Sequelize.literal("details LIKE :search"), 
			Sequelize.literal("statut LIKE :search"),
		];
	}

	
	
}
Messages.init();
export default Messages;
