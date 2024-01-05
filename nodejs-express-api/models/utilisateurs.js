
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class Utilisateurs extends BaseModel {
	static init() {
		return super.init(
			{
				
				id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
				nom_utilisateur: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				nom: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				prenom: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				agence: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				profile: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				adresse: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				statut: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				telephone: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				mot_de_passe: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				email: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') }
			}, 
			{ 
				sequelize,
				
				tableName: "utilisateurs",
				modelName: "utilisateurs",
			}
		);
	}
	
	static listFields() {
		return [
			'id', 
			'profile', 
			'nom_utilisateur', 
			'nom', 
			'prenom', 
			'agence', 
			'adresse', 
			'statut', 
			'telephone', 
			'email'
		];
	}

	static viewFields() {
		return [
			'id', 
			'nom_utilisateur', 
			'nom', 
			'prenom', 
			'agence', 
			'adresse', 
			'statut', 
			'telephone', 
			'email'
		];
	}

	static accounteditFields() {
		return [
			'id', 
			'nom_utilisateur', 
			'nom', 
			'prenom', 
			'agence', 
			'profile', 
			'adresse', 
			'statut', 
			'telephone'
		];
	}

	static accountviewFields() {
		return [
			'id', 
			'nom_utilisateur', 
			'nom', 
			'prenom', 
			'agence', 
			'adresse', 
			'statut', 
			'telephone', 
			'email'
		];
	}

	static editFields() {
		return [
			'id', 
			'nom_utilisateur', 
			'nom', 
			'prenom', 
			'agence', 
			'profile', 
			'adresse', 
			'statut', 
			'telephone'
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("id LIKE :search"), 
			Sequelize.literal("nom_utilisateur LIKE :search"), 
			Sequelize.literal("nom LIKE :search"), 
			Sequelize.literal("prenom LIKE :search"), 
			Sequelize.literal("agence LIKE :search"), 
			Sequelize.literal("adresse LIKE :search"), 
			Sequelize.literal("statut LIKE :search"), 
			Sequelize.literal("telephone LIKE :search"), 
			Sequelize.literal("email LIKE :search"),
		];
	}

	
	
}
Utilisateurs.init();
export default Utilisateurs;
