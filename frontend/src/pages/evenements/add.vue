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
                                        <div class="col-12">
                                            <div class="formgrid grid">
                                                <div class="col-12 md:col-3">
                                                    Type Evenement 
                                                </div>
                                                <div class="col-12 md:col-9">
                                                    <api-data-source :enable-cache="true"   api-path="components_data/type_evenement_option_list" >
                                                        <template v-slot="req">
                                                            <Dropdown  class="w-full" :class="getErrorClass('type_evenement')"   :loading="req.loading"   optionLabel="label" optionValue="value" ref="ctrltype_evenement"  v-model="formData.type_evenement" :options="req.response" label="Type Evenement"  placeholder="Sélectionnez une valeur" >
                                                            </Dropdown> 
                                                            <small v-if="isFieldValid('type_evenement')" class="p-error">{{ getFieldError('type_evenement') }}</small> 
                                                        </template>
                                                    </api-data-source>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="formgrid grid">
                                                <div class="col-12 md:col-3">
                                                    Sujet 
                                                </div>
                                                <div class="col-12 md:col-9">
                                                    <InputText  ref="ctrlsujet" v-model.trim="formData.sujet"  label="Sujet" type="text" placeholder="Entrer Sujet"      
                                                    class=" w-full" :class="getErrorClass('sujet')">
                                                    </InputText>
                                                    <small v-if="isFieldValid('sujet')" class="p-error">{{ getFieldError('sujet') }}</small> 
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="formgrid grid">
                                                <div class="col-12 md:col-3">
                                                    Statut 
                                                </div>
                                                <div class="col-12 md:col-9">
                                                    <InputText  ref="ctrlstatut" v-model.trim="formData.statut"  label="Statut" type="text" placeholder="Entrer Statut"      
                                                    class=" w-full" :class="getErrorClass('statut')">
                                                    </InputText>
                                                    <small v-if="isFieldValid('statut')" class="p-error">{{ getFieldError('statut') }}</small> 
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="formgrid grid">
                                                <div class="col-12 md:col-3">
                                                    Date Rendez Vous 
                                                </div>
                                                <div class="col-12 md:col-9">
                                                    <Calendar  :showButtonBar="true" :showTime="true" dateFormat="yy-mm-dd" hourFormat="24" v-model="formData.date_rendez_vous" :showIcon="true" class="w-full" :class="getErrorClass('date_rendez_vous')"     mask="yy-MM-DD HH:mm"     />
                                                    <small v-if="isFieldValid('date_rendez_vous')" class="p-error">{{ getFieldError('date_rendez_vous') }}</small> 
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="formgrid grid">
                                                <div class="col-12 md:col-3">
                                                    Details 
                                                </div>
                                                <div class="col-12 md:col-9">
                                                    <div class="mb-3" :class="getErrorClass('details')">
                                                        <Editor label="Details" ref="ctrldetails" placeholder="Entrer Details" v-model="formData.details" editorStyle="height: 120px"></Editor >
                                                        <!-- <small class="p-3 text-negative" v-if="invalid && validated">{{errors[0]}}</small> -->
                                                    </div>
                                                    <small v-if="isFieldValid('details')" class="p-error">{{ getFieldError('details') }}</small> 
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="formgrid grid">
                                                <div class="col-12 md:col-3">
                                                    Societe Id 
                                                </div>
                                                <div class="col-12 md:col-9">
                                                    <InputText  ref="ctrlsociete_id" v-model.trim="formData.societe_id"  label="Societe Id" type="number" placeholder="Entrer Societe Id"   step="any"    
                                                    class=" w-full" :class="getErrorClass('societe_id')">
                                                    </InputText>
                                                    <small v-if="isFieldValid('societe_id')" class="p-error">{{ getFieldError('societe_id') }}</small> 
                                                </div>
                                            </div>
                                        </div>
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
			default: 'EVENEMENTS',
		},
		pageName : {
			type : String,
			default : 'evenements',
		},
		routeName : {
			type : String,
			default : 'evenementsadd',
		},
		apiPath : {
			type : String,
			default : 'evenements/add',
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
		type_evenement: "", 
		sujet: "", 
		statut: "", 
		date_rendez_vous: new Date(), 
		details: "", 
		societe_id: "", 
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
			type_evenement: {  },
			sujet: {  },
			statut: {  },
			date_rendez_vous: {  },
			details: {  },
			societe_id: { numeric }
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
			app.navigateTo(`/evenements`);
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
