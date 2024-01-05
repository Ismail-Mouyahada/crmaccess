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
                                                            Nom Utilisateur *
                                                        </div>
                                                        <div class="col-12 md:col-9">
                                                            <check-duplicate v-model="formData.nom_utilisateur" check-path="components_data/utilisateurs_nom_utilisateur_exist/" v-slot="checker">
                                                            <InputText  ref="ctrlnom_utilisateur" @blur="checker.check" :loading="checker.loading" v-model.trim="formData.nom_utilisateur"  label="Nom Utilisateur" type="text" placeholder="Entrer Nom Utilisateur"      
                                                            class=" w-full" :class="getErrorClass('nom_utilisateur')">
                                                            </InputText>
                                                            <small v-if="isFieldValid('nom_utilisateur')" class="p-error">{{ getFieldError('nom_utilisateur') }}</small> 
                                                            <small v-if="!checker.loading && checker.exist" class="p-error"> Indisponible</small>
                                                            <small v-if="checker.loading" class="text-500">Checking...</small>
                                                            </check-duplicate>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-12">
                                                    <div class="formgrid grid">
                                                        <div class="col-12 md:col-3">
                                                            Nom 
                                                        </div>
                                                        <div class="col-12 md:col-9">
                                                            <InputText  ref="ctrlnom" v-model.trim="formData.nom"  label="Nom" type="text" placeholder="Entrer Nom"      
                                                            class=" w-full" :class="getErrorClass('nom')">
                                                            </InputText>
                                                            <small v-if="isFieldValid('nom')" class="p-error">{{ getFieldError('nom') }}</small> 
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-12">
                                                    <div class="formgrid grid">
                                                        <div class="col-12 md:col-3">
                                                            Prenom 
                                                        </div>
                                                        <div class="col-12 md:col-9">
                                                            <InputText  ref="ctrlprenom" v-model.trim="formData.prenom"  label="Prenom" type="text" placeholder="Entrer Prenom"      
                                                            class=" w-full" :class="getErrorClass('prenom')">
                                                            </InputText>
                                                            <small v-if="isFieldValid('prenom')" class="p-error">{{ getFieldError('prenom') }}</small> 
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-12">
                                                    <div class="formgrid grid">
                                                        <div class="col-12 md:col-3">
                                                            Agence 
                                                        </div>
                                                        <div class="col-12 md:col-9">
                                                            <InputText  ref="ctrlagence" v-model.trim="formData.agence"  label="Agence" type="text" placeholder="Entrer Agence"      
                                                            class=" w-full" :class="getErrorClass('agence')">
                                                            </InputText>
                                                            <small v-if="isFieldValid('agence')" class="p-error">{{ getFieldError('agence') }}</small> 
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-12">
                                                    <div class="formgrid grid">
                                                        <div class="col-12 md:col-3">
                                                            Profile 
                                                        </div>
                                                        <div class="col-12 md:col-9">
                                                            <div class="mb-3">
                                                                <Uploader :class="getErrorClass('profile')" :auto="true" :fileLimit="1" :maxFileSize="3000000" accept=".jpg,.png,.gif,.jpeg" :multiple="false" style="width:100%" label="Choisissez des fichiers ou déposez des fichiers ici" upload-path="fileuploader/upload/profile" v-model="formData.profile"></Uploader>
                                                            </div>
                                                            <small v-if="isFieldValid('profile')" class="p-error">{{ getFieldError('profile') }}</small> 
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
                                                            Telephone *
                                                        </div>
                                                        <div class="col-12 md:col-9">
                                                            <InputText  ref="ctrltelephone" v-model.trim="formData.telephone"  label="Telephone" type="text" placeholder="Entrer Telephone"      
                                                            class=" w-full" :class="getErrorClass('telephone')">
                                                            </InputText>
                                                            <small v-if="isFieldValid('telephone')" class="p-error">{{ getFieldError('telephone') }}</small> 
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
	import { required } from 'src/services/validators';
	import { useApp } from 'src/composables/app.js';
	import { useEditPage } from 'src/composables/editpage.js';
	import { usePageStore } from 'src/store/page';
	const props = defineProps({
		id: [String, Number],
		pageStoreKey: {
			type: String,
			default: 'UTILISATEURS',
		},
		pageName: {
			type: String,
			default: 'utilisateurs',
		},
		routeName: {
			type: String,
			default: 'utilisateursedit',
		},
		pagePath: {
			type : String,
			default : 'utilisateurs/edit',
		},
		apiPath: {
			type: String,
			default: 'utilisateurs/edit',
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
		nom_utilisateur: "", 
		nom: "", 
		prenom: "", 
		agence: "", 
		profile: "", 
		adresse: "", 
		statut: "", 
		telephone: "", 
	}, props.pageData);
	
	const formData = reactive({ ...formDefaultValues });
	
	function afterSubmit(response) {
		app.flashMsg(props.msgTitle, props.msgAfterSave);
		if(app.isDialogOpen()){
			app.closeDialogs(); // if page is open as dialog, close dialog
		}
		else if(props.redirect) {
			app.navigateTo(`/utilisateurs`);
		}
	}
	
	// form validation rules
	const rules = computed(() => {
		return {
			nom_utilisateur: { required },
			nom: {  },
			prenom: {  },
			agence: {  },
			profile: {  },
			adresse: {  },
			statut: {  },
			telephone: { required }
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
