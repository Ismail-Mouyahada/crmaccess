<template>
    <main class="main-page"  id="">
        <template v-if="pageReady">
            <template v-if="showHeader">
                <section class="page-section mb-3" >
                    <div class="container">
                        <div class="grid justify-content-between align-items-center">
                            <div  v-if="!isSubPage"  class="col-fixed " >
                                <Button @click="$router.go(-1)" label=""  class="p-button p-button-text " icon="pi pi-arrow-left"  />
                            </div>
                            <div  class="col " >
                                <div class=" text-2xl text-primary font-bold" >
                                    Ajouter un nouveau
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </section>
            </template>
            <section class="page-section " >
                <div class="container">
                    <div class="grid ">
                        <div  class="md:col-9 sm:col-12 comp-grid" >
                            <div >
                                <form ref="observer" tag="form" @submit.prevent="submitForm()" :class="{ 'card ': !isSubPage }" class=" ">
                                    <div class="grid">
                                        <Fieldset legend="ID de compteur" toggleable>
                                            <div class="grid">
                                                <div class="col-12">
                                                    <div class="formgrid grid">
                                                        <div class="col-12 md:col-3">
                                                            PCE 
                                                        </div>
                                                        <div class="col-12 md:col-9">
                                                            <InputText  ref="ctrlpce" v-model.trim="formData.pce"  label="PCE" type="text" placeholder="GE-000000"      
                                                            class=" w-full" :class="getErrorClass('pce')">
                                                            </InputText>
                                                            <small v-if="isFieldValid('pce')" class="p-error">{{ getFieldError('pce') }}</small> 
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-12">
                                                    <div class="formgrid grid">
                                                        <div class="col-12 md:col-3">
                                                            Societe 
                                                        </div>
                                                        <div class="col-12 md:col-9">
                                                            <api-data-source :enable-cache="true"   api-path="components_data/societe_id_option_list_2" >
                                                                <template v-slot="req">
                                                                    <Dropdown  class="w-full" :class="getErrorClass('societe_id')"   :loading="req.loading"   optionLabel="label" optionValue="value" ref="ctrlsociete_id"  v-model="formData.societe_id" :options="req.response" label="Societe"  placeholder="Sélectionnez un orgaisme" >
                                                                    </Dropdown> 
                                                                    <small v-if="isFieldValid('societe_id')" class="p-error">{{ getFieldError('societe_id') }}</small> 
                                                                </template>
                                                            </api-data-source>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-12">
                                                    <div class="formgrid grid">
                                                        <div class="col-12 md:col-3">
                                                            Profil 
                                                        </div>
                                                        <div class="col-12 md:col-9">
                                                            <Dropdown  class="w-full" :class="getErrorClass('profil')"      optionLabel="label" optionValue="value" ref="ctrlprofil"  v-model="formData.profil" :options="app.menus.profil" label="Profil"  placeholder="Sélectionnez le profil" >
                                                            </Dropdown> 
                                                            <small v-if="isFieldValid('profil')" class="p-error">{{ getFieldError('profil') }}</small> 
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-12">
                                                    <div class="formgrid grid">
                                                        <div class="col-12 md:col-3">
                                                            Tarif Distribution 
                                                        </div>
                                                        <div class="col-12 md:col-9">
                                                            <Dropdown  class="w-full" :class="getErrorClass('tarif_distribution')"      optionLabel="label" optionValue="value" ref="ctrltarif_distribution"  v-model="formData.tarif_distribution" :options="app.menus.tarifDistribution" label="Tarif Distribution"  placeholder="Sélectionnez une valeur" >
                                                            </Dropdown> 
                                                            <small v-if="isFieldValid('tarif_distribution')" class="p-error">{{ getFieldError('tarif_distribution') }}</small> 
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-12">
                                                    <div class="formgrid grid">
                                                        <div class="col-12 md:col-3">
                                                            Eligible C.E.E 
                                                        </div>
                                                        <div class="col-12 md:col-9">
                                                            <div class="field-checkbox">
                                                                <label>
                                                                <InputSwitch  true-value="true" false-value="false" name="ctrleligible_cee" :class="getErrorClass('eligible_cee')" v-model="formData.eligible_cee" />
                                                                </label>
                                                            </div>
                                                            <small v-if="isFieldValid('eligible_cee')" class="p-error">{{ getFieldError('eligible_cee') }}</small> 
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-12">
                                                    <div class="formgrid grid">
                                                        <div class="col-12 md:col-3">
                                                            CAR 
                                                        </div>
                                                        <div class="col-12 md:col-9">
                                                            <InputText  ref="ctrlcar" v-model.trim="formData.car"  label="CAR" type="number" placeholder="0.00"   step="0.1"    
                                                            class=" w-full" :class="getErrorClass('car')">
                                                            </InputText>
                                                            <small v-if="isFieldValid('car')" class="p-error">{{ getFieldError('car') }}</small> 
                                                        </div>
                                                    </div>
                                                </div>
                                            </div></Fieldset>
                                            <Fieldset legend="Dates" toggleable>
                                                <div class="grid">
                                                    <div class="col-12">
                                                        <div class="formgrid grid">
                                                            <div class="col-12 md:col-3">
                                                                DDF 
                                                            </div>
                                                            <div class="col-12 md:col-9">
                                                                <Calendar  :showButtonBar="true" class="w-full" :class="getErrorClass('date_debut_fourniture')" dateFormat="yy-mm-dd" v-model="formData.date_debut_fourniture" :showIcon="true"     mask="YYYY-MM-DD"      />
                                                                <small v-if="isFieldValid('date_debut_fourniture')" class="p-error">{{ getFieldError('date_debut_fourniture') }}</small> 
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-12">
                                                        <div class="formgrid grid">
                                                            <div class="col-12 md:col-3">
                                                                DFF 
                                                            </div>
                                                            <div class="col-12 md:col-9">
                                                                <Calendar  :showButtonBar="true" class="w-full" :class="getErrorClass('date_fin_fourniture')" dateFormat="yy-mm-dd" v-model="formData.date_fin_fourniture" :showIcon="true"     mask="YYYY-MM-DD"      />
                                                                <small v-if="isFieldValid('date_fin_fourniture')" class="p-error">{{ getFieldError('date_fin_fourniture') }}</small> 
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-12">
                                                        <div class="formgrid grid">
                                                            <div class="col-12 md:col-3">
                                                                DRO 
                                                            </div>
                                                            <div class="col-12 md:col-9">
                                                                <Calendar  :showButtonBar="true" class="w-full" :class="getErrorClass('date_remise_offre')" dateFormat="yy-mm-dd" v-model="formData.date_remise_offre" :showIcon="true"     mask="YYYY-MM-DD"      />
                                                                <small v-if="isFieldValid('date_remise_offre')" class="p-error">{{ getFieldError('date_remise_offre') }}</small> 
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-12">
                                                        <div class="formgrid grid">
                                                            <div class="col-12 md:col-3">
                                                                DC 
                                                            </div>
                                                            <div class="col-12 md:col-9">
                                                                <Calendar  :showButtonBar="true" class="w-full" :class="getErrorClass('date_cloture')" dateFormat="yy-mm-dd" v-model="formData.date_cloture" :showIcon="true"     mask="YYYY-MM-DD"      />
                                                                <small v-if="isFieldValid('date_cloture')" class="p-error">{{ getFieldError('date_cloture') }}</small> 
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div></Fieldset>
                                                <Fieldset legend="Services" toggleable>
                                                    <div class="grid">
                                                        <div class="col-12">
                                                            <div class="formgrid grid">
                                                                <div class="col-12 md:col-3">
                                                                    Efficacite 
                                                                </div>
                                                                <div class="col-12 md:col-9">
                                                                    <div class="field-checkbox">
                                                                        <label>
                                                                        <InputSwitch  true-value="true" false-value="false" name="ctrlefficacite" :class="getErrorClass('efficacite')" v-model="formData.efficacite" />
                                                                        </label>
                                                                    </div>
                                                                    <small v-if="isFieldValid('efficacite')" class="p-error">{{ getFieldError('efficacite') }}</small> 
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-12">
                                                            <div class="formgrid grid">
                                                                <div class="col-12 md:col-3">
                                                                    Fiscalite 
                                                                </div>
                                                                <div class="col-12 md:col-9">
                                                                    <div class="field-checkbox">
                                                                        <label>
                                                                        <InputSwitch  true-value="true" false-value="false" name="ctrlfiscalite" :class="getErrorClass('fiscalite')" v-model="formData.fiscalite" />
                                                                        </label>
                                                                    </div>
                                                                    <small v-if="isFieldValid('fiscalite')" class="p-error">{{ getFieldError('fiscalite') }}</small> 
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-12">
                                                            <div class="formgrid grid">
                                                                <div class="col-12 md:col-3">
                                                                    Courtage 
                                                                </div>
                                                                <div class="col-12 md:col-9">
                                                                    <div class="field-checkbox">
                                                                        <label>
                                                                        <InputSwitch  true-value="true" false-value="false" name="ctrlcourtage" :class="getErrorClass('courtage')" v-model="formData.courtage" />
                                                                        </label>
                                                                    </div>
                                                                    <small v-if="isFieldValid('courtage')" class="p-error">{{ getFieldError('courtage') }}</small> 
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div></Fieldset>
                                                    <Fieldset legend="Rattachement" toggleable>
                                                        <div class="grid">
                                                            <div class="col-12">
                                                                <div class="formgrid grid">
                                                                    <div class="col-12 md:col-3">
                                                                        Fournisseur 
                                                                    </div>
                                                                    <div class="col-12 md:col-9">
                                                                        <api-data-source :enable-cache="true"   api-path="components_data/fournisseur_option_list" >
                                                                            <template v-slot="req">
                                                                                <Dropdown  class="w-full" :class="getErrorClass('fournisseur')"   :loading="req.loading"   optionLabel="label" optionValue="value" ref="ctrlfournisseur"  v-model="formData.fournisseur" :options="req.response" label="Fournisseur"  placeholder="Sélectionnez une valeur" >
                                                                                </Dropdown> 
                                                                                <small v-if="isFieldValid('fournisseur')" class="p-error">{{ getFieldError('fournisseur') }}</small> 
                                                                            </template>
                                                                        </api-data-source>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div></Fieldset>
                                                    </div>
                                                    <div v-if="showSubmitButton" class="text-center my-3">
                                                        <Button class="p-button-primary" type="submit" label="Soumettre" icon="pi pi-send" :loading="saving" />
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </template>
                    </main>
</template>
<script setup>
	import {  computed,  reactive, toRefs, onMounted } from 'vue';
	import { required, numeric, } from 'src/services/validators';
	import { useApp } from 'src/composables/app.js';
	import { useAddPage } from 'src/composables/addpage.js';
	import { usePageStore } from 'src/store/page';
	const props = defineProps({
		pageStoreKey: {
			type: String,
			default: 'COMPTEURSGAZ',
		},
		pageName : {
			type : String,
			default : 'compteursgaz',
		},
		routeName : {
			type : String,
			default : 'compteursgazadd',
		},
		apiPath : {
			type : String,
			default : 'compteursgaz/add',
		},
		submitButtonLabel: {
			type: String,
			default: "Soumettre",
		},
		formValidationError: {
			type: String,
			default: "Le formulaire est invalide",
		},
		formValidationMsg: {
			type: String,
			default: "Veuillez remplir le formulaire",
		},
		msgTitle: {
			type: String,
			default: "Créer un enregistrement",
		},
		msgAfterSave: {
			type: String,
			default: "Enregistrement ajouté avec succès",
		},
		msgBeforeSave: {
			type: String,
			default: "",
		},
		showHeader: {
			type: Boolean,
			default: true,
		},
		showSubmitButton: {
			type: Boolean,
			default: true,
		},
		redirect: {
			type : Boolean,
			default : true,
		},
		isSubPage: {
			type : Boolean,
			default : false,
		},
		pageData: { // use to set formData default values from another page
			type: Object,
			default: () => ({
		pce: "", 
		societe_id: "", 
		profil: "", 
		tarif_distribution: "", 
		eligible_cee: null, 
		car: "", 
		date_debut_fourniture: new Date(), 
		date_fin_fourniture: new Date(), 
		date_remise_offre: new Date(), 
		date_cloture: new Date(), 
		efficacite: null, 
		fiscalite: null, 
		courtage: null, 
		fournisseur: "", 
			})
		},
	});
	//lines
	const store = usePageStore(props.pageStoreKey);
	const app = useApp();
	
	const formData = reactive({ ...props.pageData });
	
	//vuelidate form validation rules
	const rules = computed(() => {
		return {
			pce: {  },
			societe_id: {  },
			profil: {  },
			tarif_distribution: {  },
			eligible_cee: {  },
			car: { numeric },
			date_debut_fourniture: {  },
			date_fin_fourniture: {  },
			date_remise_offre: {  },
			date_cloture: {  },
			efficacite: {  },
			fiscalite: {  },
			courtage: {  },
			fournisseur: {  }
		}
	});
	
	const page = useAddPage({ store, props, formData, rules, beforeSubmit, afterSubmit });
	
	// event raised before submit form
	function beforeSubmit(){
		return true;
	}
	
	// event raised after form submited
	function afterSubmit(response) { 
		app.flashMsg(props.msgTitle, props.msgAfterSave);
		page.setFormDefaultValues(); //reset form data
		if(app.isDialogOpen()){
			app.closeDialogs(); // if page is open as dialog, close dialog
		}
		else if(props.redirect) {
			app.navigateTo(`/compteursgaz`);
		}
	}
	
	const {  saving, pageReady, } = toRefs(page.state);
	
	const { submitForm, getErrorClass, getFieldError, isFieldValid,  } = page.methods;
	
	onMounted(()=>{
		const pageTitle = "Ajouter un nouveau";
		app.setPageTitle(props.routeName, pageTitle); // set browser page title
	});
	
	// expose page object for other components access
	defineExpose({
		page
	});
</script>
<style scoped>
</style>
