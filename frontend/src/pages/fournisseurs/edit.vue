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
                                <form ref="observer"  tag="form" @submit.prevent="submitForm()" :class="{ 'card ': !isSubPage }" class=" ">
                                    <!--[form-content-start]-->
                                    <div class="grid">
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
                                                    Nom Fournisseurs 
                                                </div>
                                                <div class="col-12 md:col-9">
                                                    <InputText  ref="ctrlnom_fournisseurs" v-model.trim="formData.nom_fournisseurs"  label="Nom Fournisseurs" type="text" placeholder="Entrer Nom Fournisseurs"      
                                                    class=" w-full" :class="getErrorClass('nom_fournisseurs')">
                                                    </InputText>
                                                    <small v-if="isFieldValid('nom_fournisseurs')" class="p-error">{{ getFieldError('nom_fournisseurs') }}</small> 
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="formgrid grid">
                                                <div class="col-12 md:col-3">
                                                    Gaz 
                                                </div>
                                                <div class="col-12 md:col-9">
                                                    <InputText  ref="ctrlgaz" v-model.trim="formData.gaz"  label="Gaz" type="text" placeholder="Entrer Gaz"      
                                                    class=" w-full" :class="getErrorClass('gaz')">
                                                    </InputText>
                                                    <small v-if="isFieldValid('gaz')" class="p-error">{{ getFieldError('gaz') }}</small> 
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="formgrid grid">
                                                <div class="col-12 md:col-3">
                                                    Electrcite 
                                                </div>
                                                <div class="col-12 md:col-9">
                                                    <InputText  ref="ctrlelectrcite" v-model.trim="formData.electrcite"  label="Electrcite" type="text" placeholder="Entrer Electrcite"      
                                                    class=" w-full" :class="getErrorClass('electrcite')">
                                                    </InputText>
                                                    <small v-if="isFieldValid('electrcite')" class="p-error">{{ getFieldError('electrcite') }}</small> 
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="formgrid grid">
                                                <div class="col-12 md:col-3">
                                                    Verte 
                                                </div>
                                                <div class="col-12 md:col-9">
                                                    <InputText  ref="ctrlverte" v-model.trim="formData.verte"  label="Verte" type="text" placeholder="Entrer Verte"      
                                                    class=" w-full" :class="getErrorClass('verte')">
                                                    </InputText>
                                                    <small v-if="isFieldValid('verte')" class="p-error">{{ getFieldError('verte') }}</small> 
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="formgrid grid">
                                                <div class="col-12 md:col-3">
                                                    Disponible 
                                                </div>
                                                <div class="col-12 md:col-9">
                                                    <InputText  ref="ctrldisponible" v-model.trim="formData.disponible"  label="Disponible" type="text" placeholder="Entrer Disponible"      
                                                    class=" w-full" :class="getErrorClass('disponible')">
                                                    </InputText>
                                                    <small v-if="isFieldValid('disponible')" class="p-error">{{ getFieldError('disponible') }}</small> 
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
	import {  computed,  reactive, toRefs, onMounted } from 'vue';
	import { required } from 'src/services/validators';
	import { useApp } from 'src/composables/app.js';
	import { useEditPage } from 'src/composables/editpage.js';
	import { usePageStore } from 'src/store/page';
	const props = defineProps({
		id: [String, Number],
		pageStoreKey: {
			type: String,
			default: 'FOURNISSEURS',
		},
		pageName: {
			type: String,
			default: 'fournisseurs',
		},
		routeName: {
			type: String,
			default: 'fournisseursedit',
		},
		pagePath: {
			type : String,
			default : 'fournisseurs/edit',
		},
		apiPath: {
			type: String,
			default: 'fournisseurs/edit',
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
		logo: "", 
		nom_fournisseurs: "", 
		gaz: "", 
		electrcite: "", 
		verte: "", 
		disponible: "", 
	}, props.pageData);
	
	const formData = reactive({ ...formDefaultValues });
	
	function afterSubmit(response) {
		app.flashMsg(props.msgTitle, props.msgAfterSave);
		if(app.isDialogOpen()){
			app.closeDialogs(); // if page is open as dialog, close dialog
		}
		else if(props.redirect) {
			app.navigateTo(`/fournisseurs`);
		}
	}
	
	// form validation rules
	const rules = computed(() => {
		return {
			logo: {  },
			nom_fournisseurs: {  },
			gaz: {  },
			electrcite: {  },
			verte: {  },
			disponible: {  }
		}
	});
	
	const page = useEditPage({store, props, formData, rules, afterSubmit });
	
	const {  currentRecord: editRecord } = toRefs(store.state);
	const {  pageReady, saving, loading, } = toRefs(page.state);
	
	const { apiUrl } = page.computedProps;
	
	const { load, submitForm, getErrorClass, getFieldError, isFieldValid,  } = page.methods;
	
	onMounted(()=>{
		const pageTitle = "modifier";
		app.setPageTitle(props.routeName, pageTitle); // set browser page title
	});
</script>
<style scoped>
</style>
