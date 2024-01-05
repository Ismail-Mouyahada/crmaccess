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
                                                    Details 
                                                </div>
                                                <div class="col-12 md:col-9">
                                                    <Textarea :class="getErrorClass('details')" class="w-full" ref="ctrldetails" rows="5"  v-model="formData.details" placeholder="Entrer Details"    type="textarea">
                                                    </Textarea>
                                                    <small v-if="isFieldValid('details')" class="p-error">{{ getFieldError('details') }}</small> 
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="formgrid grid">
                                                <div class="col-12 md:col-3">
                                                    Societe 
                                                </div>
                                                <div class="col-12 md:col-9">
                                                    <InputText  ref="ctrlsociete" v-model.trim="formData.societe"  label="Societe" type="number" placeholder="Entrer Societe"   step="any"    
                                                    class=" w-full" :class="getErrorClass('societe')">
                                                    </InputText>
                                                    <small v-if="isFieldValid('societe')" class="p-error">{{ getFieldError('societe') }}</small> 
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
			default: 'MESSAGES',
		},
		pageName : {
			type : String,
			default : 'messages',
		},
		routeName : {
			type : String,
			default : 'messagesadd',
		},
		apiPath : {
			type : String,
			default : 'messages/add',
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
		sujet: "", 
		details: "", 
		societe: "", 
		statut: "", 
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
			sujet: {  },
			details: {  },
			societe: { numeric },
			statut: {  }
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
			app.navigateTo(`/messages`);
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
