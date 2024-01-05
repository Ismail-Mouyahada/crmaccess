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
                                    modifier
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
                                <div class="grid ">
                                    <div class="col">
                                        <form ref="observer"  tag="form" @submit.prevent="submitForm()" :class="{ 'card ': !isSubPage }" class=" ">
                                            <!--[form-content-start]-->
                                            <div class="grid">
                                                <div class="col-12">
                                                    <div class="formgrid grid">
                                                        <div class="col-12 md:col-3">
                                                            Siren 
                                                        </div>
                                                        <div class="col-12 md:col-9">
                                                            <InputText  ref="ctrlsiren" v-model.trim="formData.siren"  label="Siren" type="text" placeholder="Entrer Siren"      
                                                            class=" w-full" :class="getErrorClass('siren')">
                                                            </InputText>
                                                            <small v-if="isFieldValid('siren')" class="p-error">{{ getFieldError('siren') }}</small> 
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-12">
                                                    <div class="formgrid grid">
                                                        <div class="col-12 md:col-3">
                                                            Logo 
                                                        </div>
                                                        <div class="col-12 md:col-9">
                                                            <InputText  ref="ctrllogo" v-model.trim="formData.logo"  label="Logo" type="text" placeholder="Entrer Logo"      
                                                            class=" w-full" :class="getErrorClass('logo')">
                                                            </InputText>
                                                            <small v-if="isFieldValid('logo')" class="p-error">{{ getFieldError('logo') }}</small> 
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-12">
                                                    <div class="formgrid grid">
                                                        <div class="col-12 md:col-3">
                                                            Nom Entreprise 
                                                        </div>
                                                        <div class="col-12 md:col-9">
                                                            <InputText  ref="ctrlnom_entreprise" v-model.trim="formData.nom_entreprise"  label="Nom Entreprise" type="text" placeholder="Entrer Nom Entreprise"      
                                                            class=" w-full" :class="getErrorClass('nom_entreprise')">
                                                            </InputText>
                                                            <small v-if="isFieldValid('nom_entreprise')" class="p-error">{{ getFieldError('nom_entreprise') }}</small> 
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-12">
                                                    <div class="formgrid grid">
                                                        <div class="col-12 md:col-3">
                                                            Ville 
                                                        </div>
                                                        <div class="col-12 md:col-9">
                                                            <InputText  ref="ctrlville" v-model.trim="formData.ville"  label="Ville" type="text" placeholder="Entrer Ville"      
                                                            class=" w-full" :class="getErrorClass('ville')">
                                                            </InputText>
                                                            <small v-if="isFieldValid('ville')" class="p-error">{{ getFieldError('ville') }}</small> 
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-12">
                                                    <div class="formgrid grid">
                                                        <div class="col-12 md:col-3">
                                                            Code Postal 
                                                        </div>
                                                        <div class="col-12 md:col-9">
                                                            <InputText  ref="ctrlcode_postal" v-model.trim="formData.code_postal"  label="Code Postal" type="text" placeholder="Entrer Code Postal"      
                                                            class=" w-full" :class="getErrorClass('code_postal')">
                                                            </InputText>
                                                            <small v-if="isFieldValid('code_postal')" class="p-error">{{ getFieldError('code_postal') }}</small> 
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-12">
                                                    <div class="formgrid grid">
                                                        <div class="col-12 md:col-3">
                                                            Region 
                                                        </div>
                                                        <div class="col-12 md:col-9">
                                                            <InputText  ref="ctrlregion" v-model.trim="formData.region"  label="Region" type="text" placeholder="Entrer Region"      
                                                            class=" w-full" :class="getErrorClass('region')">
                                                            </InputText>
                                                            <small v-if="isFieldValid('region')" class="p-error">{{ getFieldError('region') }}</small> 
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-12">
                                                    <div class="formgrid grid">
                                                        <div class="col-12 md:col-3">
                                                            Adresse 
                                                        </div>
                                                        <div class="col-12 md:col-9">
                                                            <InputText  ref="ctrladresse" v-model.trim="formData.adresse"  label="Adresse" type="text" placeholder="Entrer Adresse"      
                                                            class=" w-full" :class="getErrorClass('adresse')">
                                                            </InputText>
                                                            <small v-if="isFieldValid('adresse')" class="p-error">{{ getFieldError('adresse') }}</small> 
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-12">
                                                    <div class="formgrid grid">
                                                        <div class="col-12 md:col-3">
                                                            Utilisateur Id 
                                                        </div>
                                                        <div class="col-12 md:col-9">
                                                            <InputText  ref="ctrlutilisateur_id" v-model.trim="formData.utilisateur_id"  label="Utilisateur Id" type="number" placeholder="Entrer Utilisateur Id"   step="any"    
                                                            class=" w-full" :class="getErrorClass('utilisateur_id')">
                                                            </InputText>
                                                            <small v-if="isFieldValid('utilisateur_id')" class="p-error">{{ getFieldError('utilisateur_id') }}</small> 
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-12">
                                                    <div class="formgrid grid">
                                                        <div class="col-12 md:col-3">
                                                            Note Elirpo 
                                                        </div>
                                                        <div class="col-12 md:col-9">
                                                            <InputText  ref="ctrlnote_elirpo" v-model.trim="formData.note_elirpo"  label="Note Elirpo" type="number" placeholder="Entrer Note Elirpo"   step="0.1"    
                                                            class=" w-full" :class="getErrorClass('note_elirpo')">
                                                            </InputText>
                                                            <small v-if="isFieldValid('note_elirpo')" class="p-error">{{ getFieldError('note_elirpo') }}</small> 
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-12">
                                                    <div class="formgrid grid">
                                                        <div class="col-12 md:col-3">
                                                            Note Creditsafe 
                                                        </div>
                                                        <div class="col-12 md:col-9">
                                                            <InputText  ref="ctrlnote_creditsafe" v-model.trim="formData.note_creditsafe"  label="Note Creditsafe" type="number" placeholder="Entrer Note Creditsafe"   step="0.1"    
                                                            class=" w-full" :class="getErrorClass('note_creditsafe')">
                                                            </InputText>
                                                            <small v-if="isFieldValid('note_creditsafe')" class="p-error">{{ getFieldError('note_creditsafe') }}</small> 
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <!--[form-content-end]-->
                                            <div v-if="showSubmitButton" class="text-center my-3">
                                                <Button type="submit" label="Réviser" icon="pi pi-send" :loading="saving" />
                                            </div>
                                        </form>
                                    </div>
                                    <!-- Detal Page Column -->
                                    <template v-if="currentRecord && !isSubPage">
                                        <div class="col-12">
                                            <div class="card  my-3">
                                                <component :is="masterDetailPage" :scroll-into-view="false"></component>
                                            </div>
                                        </div>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </template>
        <template v-if="loading">
            <div style="min-height:200px" class="flex gap-3 justify-content-center align-items-center p-3">
                <div><ProgressSpinner style="width:50px;height:50px" /> </div>
                <div class="text-500">Chargement... </div>
            </div>
        </template>
    </main>
</template>
<script setup>
	import { defineAsyncComponent, computed,  reactive, toRefs, onMounted } from 'vue';
	import { required, numeric, } from 'src/services/validators';
	import { useApp } from 'src/composables/app.js';
	import { useEditPage } from 'src/composables/editpage.js';
	import { usePageStore } from 'src/store/page';
	const props = defineProps({
		id: [String, Number],
		pageStoreKey: {
			type: String,
			default: 'SOCIETES',
		},
		pageName: {
			type: String,
			default: 'societes',
		},
		routeName: {
			type: String,
			default: 'societesedit',
		},
		pagePath: {
			type : String,
			default : 'societes/edit',
		},
		apiPath: {
			type: String,
			default: 'societes/edit',
		},
		submitButtonLabel: {
			type: String,
			default: "Réviser",
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
			default: "Mettre à jour l'enregistrement",
		},
		msgBeforeSave: {
			type: String,
			default: "",
		},
		msgAfterSave: {
			type: String,
			default: "Enregistrement mis à jour avec succès",
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
	});
	
	const store = usePageStore(props.pageStoreKey);
	const app = useApp();
	
	const formDefaultValues = Object.assign({
		siren: "", 
		logo: "", 
		nom_entreprise: "", 
		ville: "", 
		code_postal: "", 
		region: "", 
		adresse: "", 
		utilisateur_id: "", 
		note_elirpo: "", 
		note_creditsafe: "", 
	}, props.pageData);
	
	const formData = reactive({ ...formDefaultValues });
	
	function afterSubmit(response) {
		app.flashMsg(props.msgTitle, props.msgAfterSave);
		if(app.isDialogOpen()){
			app.closeDialogs(); // if page is open as dialog, close dialog
		}
		else if(props.redirect) {
			app.navigateTo(`/societes`);
		}
	}
	
	// form validation rules
	const rules = computed(() => {
		return {
			siren: {  },
			logo: {  },
			nom_entreprise: {  },
			ville: {  },
			code_postal: {  },
			region: {  },
			adresse: {  },
			utilisateur_id: { numeric },
			note_elirpo: { numeric },
			note_creditsafe: { numeric }
		}
	});
	
	const page = useEditPage({store, props, formData, rules, afterSubmit });
	
	const {  currentRecord: editRecord } = toRefs(store.state);
	const {  pageReady, saving, loading, } = toRefs(page.state);
	
	const { apiUrl } = page.computedProps;
	
	const { load, submitForm, getErrorClass, getFieldError, isFieldValid,  } = page.methods;
	const masterDetailPage = computed(() => defineAsyncComponent(() => import("./detail-pages.vue")));
	
	onMounted(()=>{
		const pageTitle = "modifier";
		app.setPageTitle(props.routeName, pageTitle); // set browser page title
	});
</script>
<style scoped>
</style>
