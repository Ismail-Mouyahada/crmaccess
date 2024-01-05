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
                                        <Fieldset legend="ID de compteur" toggleable>
                                            <div class="grid">
                                                <div class="col-12">
                                                    <div class="formgrid grid">
                                                        <div class="col-12 md:col-3">
                                                            PDL 
                                                        </div>
                                                        <div class="col-12 md:col-9">
                                                            <InputText  ref="ctrlpdl" v-model.trim="formData.pdl"  label="PDL" type="text" placeholder="000000000"      
                                                            class=" w-full" :class="getErrorClass('pdl')">
                                                            </InputText>
                                                            <small v-if="isFieldValid('pdl')" class="p-error">{{ getFieldError('pdl') }}</small> 
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-12">
                                                    <div class="formgrid grid">
                                                        <div class="col-12 md:col-3">
                                                            Segment 
                                                        </div>
                                                        <div class="col-12 md:col-9">
                                                            <Dropdown  class="w-full" :class="getErrorClass('segment')"      optionLabel="label" optionValue="value" ref="ctrlsegment"  v-model="formData.segment" :options="app.menus.segment" label="Segment"  placeholder="Sélectionnez une valeur" >
                                                            </Dropdown> 
                                                            <small v-if="isFieldValid('segment')" class="p-error">{{ getFieldError('segment') }}</small> 
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-12">
                                                    <div class="formgrid grid">
                                                        <div class="col-12 md:col-3">
                                                            Societe 
                                                        </div>
                                                        <div class="col-12 md:col-9">
                                                            <api-data-source :enable-cache="true"   api-path="components_data/societe_id_option_list" >
                                                                <template v-slot="req">
                                                                    <Dropdown  class="w-full" :class="getErrorClass('societe_id')"   :loading="req.loading"   optionLabel="label" optionValue="value" ref="ctrlsociete_id"  v-model="formData.societe_id" :options="req.response" label="Societe"  placeholder="Sélectionnez une valeur" >
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
                                                            FTA 
                                                        </div>
                                                        <div class="col-12 md:col-9">
                                                            <Dropdown  class="w-full" :class="getErrorClass('fta')"      optionLabel="label" optionValue="value" ref="ctrlfta"  v-model="formData.fta" :options="app.menus.fta" label="FTA"  placeholder="Sélectionnez une valeur" >
                                                            </Dropdown> 
                                                            <small v-if="isFieldValid('fta')" class="p-error">{{ getFieldError('fta') }}</small> 
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-12">
                                                    <div class="formgrid grid">
                                                        <div class="col-12 md:col-3">
                                                            Reseau Distribution 
                                                        </div>
                                                        <div class="col-12 md:col-9">
                                                            <Dropdown  class="w-full" :class="getErrorClass('reseau_distribution')"      optionLabel="label" optionValue="value" ref="ctrlreseau_distribution"  v-model="formData.reseau_distribution" :options="app.menus.reseauDistribution" label="Reseau Distribution"  placeholder="Sélectionnez le reseau" >
                                                            </Dropdown> 
                                                            <small v-if="isFieldValid('reseau_distribution')" class="p-error">{{ getFieldError('reseau_distribution') }}</small> 
                                                        </div>
                                                    </div>
                                                </div>
                                            </div></Fieldset>
                                            <Fieldset legend="Consommation" toggleable>
                                                <div class="grid">
                                                    <div class="lg:col-6 col-12">
                                                        <div class="formgrid grid">
                                                            <div class="col-12 md:col-3">
                                                                Base  
                                                            </div>
                                                            <div class="col-12 md:col-9">
                                                                <InputText  ref="ctrlbase_consommation" v-model.trim="formData.base_consommation"  label="Base " type="number" placeholder="0.00"   step="0.1"    
                                                                class=" w-full" :class="getErrorClass('base_consommation')">
                                                                </InputText>
                                                                <small v-if="isFieldValid('base_consommation')" class="p-error">{{ getFieldError('base_consommation') }}</small> 
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="lg:col-6 col-12">
                                                        <div class="formgrid grid">
                                                            <div class="col-12 md:col-3">
                                                                CSPE 
                                                            </div>
                                                            <div class="col-12 md:col-9">
                                                                <InputText  ref="ctrltaux_cspe" v-model.trim="formData.taux_cspe"  label="CSPE" type="number" placeholder="0.00"   step="0.1"    
                                                                class=" w-full" :class="getErrorClass('taux_cspe')">
                                                                </InputText>
                                                                <small v-if="isFieldValid('taux_cspe')" class="p-error">{{ getFieldError('taux_cspe') }}</small> 
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="lg:col-6 col-12">
                                                        <div class="formgrid grid">
                                                            <div class="col-12 md:col-3">
                                                                HP 
                                                            </div>
                                                            <div class="col-12 md:col-9">
                                                                <InputText  ref="ctrlhp_conso" v-model.trim="formData.hp_conso"  label="HP" type="number" placeholder="0.00"   step="0.1"    
                                                                class=" w-full" :class="getErrorClass('hp_conso')">
                                                                </InputText>
                                                                <small v-if="isFieldValid('hp_conso')" class="p-error">{{ getFieldError('hp_conso') }}</small> 
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="lg:col-6 col-12">
                                                        <div class="formgrid grid">
                                                            <div class="col-12 md:col-3">
                                                                HC 
                                                            </div>
                                                            <div class="col-12 md:col-9">
                                                                <InputText  ref="ctrlhc_conso" v-model.trim="formData.hc_conso"  label="HC" type="number" placeholder="0.00"   step="0.1"    
                                                                class=" w-full" :class="getErrorClass('hc_conso')">
                                                                </InputText>
                                                                <small v-if="isFieldValid('hc_conso')" class="p-error">{{ getFieldError('hc_conso') }}</small> 
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="lg:col-6 col-12">
                                                        <div class="formgrid grid">
                                                            <div class="col-12 md:col-3">
                                                                PTE 
                                                            </div>
                                                            <div class="col-12 md:col-9">
                                                                <InputText  ref="ctrlpte_conso" v-model.trim="formData.pte_conso"  label="PTE" type="number" placeholder="0.00"   step="0.1"    
                                                                class=" w-full" :class="getErrorClass('pte_conso')">
                                                                </InputText>
                                                                <small v-if="isFieldValid('pte_conso')" class="p-error">{{ getFieldError('pte_conso') }}</small> 
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="lg:col-6 col-12">
                                                        <div class="formgrid grid">
                                                            <div class="col-12 md:col-3">
                                                                HCH 
                                                            </div>
                                                            <div class="col-12 md:col-9">
                                                                <InputText  ref="ctrlhch_conso" v-model.trim="formData.hch_conso"  label="HCH" type="number" placeholder="0.00"   step="0.1"    
                                                                class=" w-full" :class="getErrorClass('hch_conso')">
                                                                </InputText>
                                                                <small v-if="isFieldValid('hch_conso')" class="p-error">{{ getFieldError('hch_conso') }}</small> 
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="lg:col-6 col-12">
                                                        <div class="formgrid grid">
                                                            <div class="col-12 md:col-3">
                                                                HPE 
                                                            </div>
                                                            <div class="col-12 md:col-9">
                                                                <InputText  ref="ctrlhpe_conso" v-model.trim="formData.hpe_conso"  label="HPE" type="number" placeholder="0.00"   step="0.1"    
                                                                class=" w-full" :class="getErrorClass('hpe_conso')">
                                                                </InputText>
                                                                <small v-if="isFieldValid('hpe_conso')" class="p-error">{{ getFieldError('hpe_conso') }}</small> 
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div></Fieldset>
                                                <Fieldset legend="Puissance" toggleable>
                                                    <div class="grid">
                                                        <div class="lg:col-6 col-12">
                                                            <div class="formgrid grid">
                                                                <div class="col-12 md:col-3">
                                                                    HP 
                                                                </div>
                                                                <div class="col-12 md:col-9">
                                                                    <InputText  ref="ctrlhp_puiss" v-model.trim="formData.hp_puiss"  label="HP" type="number" placeholder="0.00"   step="0.1"    
                                                                    class=" w-full" :class="getErrorClass('hp_puiss')">
                                                                    </InputText>
                                                                    <small v-if="isFieldValid('hp_puiss')" class="p-error">{{ getFieldError('hp_puiss') }}</small> 
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="lg:col-6 col-12">
                                                            <div class="formgrid grid">
                                                                <div class="col-12 md:col-3">
                                                                    HC 
                                                                </div>
                                                                <div class="col-12 md:col-9">
                                                                    <InputText  ref="ctrlhc_puiss" v-model.trim="formData.hc_puiss"  label="HC" type="number" placeholder="0.00"   step="0.1"    
                                                                    class=" w-full" :class="getErrorClass('hc_puiss')">
                                                                    </InputText>
                                                                    <small v-if="isFieldValid('hc_puiss')" class="p-error">{{ getFieldError('hc_puiss') }}</small> 
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="lg:col-6 col-12">
                                                            <div class="formgrid grid">
                                                                <div class="col-12 md:col-3">
                                                                    PTE 
                                                                </div>
                                                                <div class="col-12 md:col-9">
                                                                    <InputText  ref="ctrlpte_puiss" v-model.trim="formData.pte_puiss"  label="PTE" type="number" placeholder="0.00"   step="0.1"    
                                                                    class=" w-full" :class="getErrorClass('pte_puiss')">
                                                                    </InputText>
                                                                    <small v-if="isFieldValid('pte_puiss')" class="p-error">{{ getFieldError('pte_puiss') }}</small> 
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="lg:col-6 col-12">
                                                            <div class="formgrid grid">
                                                                <div class="col-12 md:col-3">
                                                                    HPH 
                                                                </div>
                                                                <div class="col-12 md:col-9">
                                                                    <InputText  ref="ctrlhph_puiss" v-model.trim="formData.hph_puiss"  label="HPH" type="number" placeholder="0.00"   step="0.1"    
                                                                    class=" w-full" :class="getErrorClass('hph_puiss')">
                                                                    </InputText>
                                                                    <small v-if="isFieldValid('hph_puiss')" class="p-error">{{ getFieldError('hph_puiss') }}</small> 
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="lg:col-6 col-12">
                                                            <div class="formgrid grid">
                                                                <div class="col-12 md:col-3">
                                                                    HPE 
                                                                </div>
                                                                <div class="col-12 md:col-9">
                                                                    <InputText  ref="ctrlhpe_puiss" v-model.trim="formData.hpe_puiss"  label="HPE" type="number" placeholder="0.00"   step="0.1"    
                                                                    class=" w-full" :class="getErrorClass('hpe_puiss')">
                                                                    </InputText>
                                                                    <small v-if="isFieldValid('hpe_puiss')" class="p-error">{{ getFieldError('hpe_puiss') }}</small> 
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div></Fieldset>
                                                    <Fieldset legend="Dates" toggleable>
                                                        <div class="grid">
                                                            <div class="lg:col-6 col-12">
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
                                                            <div class="lg:col-6 col-12">
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
                                                            <div class="lg:col-6 col-12">
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
                                                            <div class="lg:col-6 col-12">
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
	import { required, numeric, } from 'src/services/validators';
	import { useApp } from 'src/composables/app.js';
	import { useEditPage } from 'src/composables/editpage.js';
	import { usePageStore } from 'src/store/page';
	const props = defineProps({
		id: [String, Number],
		pageStoreKey: {
			type: String,
			default: 'COMPTEURSELEC',
		},
		pageName: {
			type: String,
			default: 'compteurselec',
		},
		routeName: {
			type: String,
			default: 'compteurselecedit',
		},
		pagePath: {
			type : String,
			default : 'compteurselec/edit',
		},
		apiPath: {
			type: String,
			default: 'compteurselec/edit',
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
		pdl: "", 
		segment: "", 
		societe_id: "", 
		fta: "", 
		reseau_distribution: "", 
		base_consommation: "", 
		taux_cspe: "", 
		hp_conso: "", 
		hc_conso: "", 
		pte_conso: "", 
		hch_conso: "", 
		hpe_conso: "", 
		hp_puiss: "", 
		hc_puiss: "", 
		pte_puiss: "", 
		hph_puiss: "", 
		hpe_puiss: "", 
		date_debut_fourniture: new Date(), 
		date_fin_fourniture: new Date(), 
		date_remise_offre: new Date(), 
		date_cloture: new Date(), 
		courtage: null, 
		efficacite: null, 
		fiscalite: null, 
		fournisseur: "", 
	}, props.pageData);
	
	const formData = reactive({ ...formDefaultValues });
	
	function afterSubmit(response) {
		app.flashMsg(props.msgTitle, props.msgAfterSave);
		if(app.isDialogOpen()){
			app.closeDialogs(); // if page is open as dialog, close dialog
		}
		else if(props.redirect) {
			app.navigateTo(`/compteurselec`);
		}
	}
	
	// form validation rules
	const rules = computed(() => {
		return {
			pdl: {  },
			segment: {  },
			societe_id: {  },
			fta: {  },
			reseau_distribution: {  },
			base_consommation: { numeric },
			taux_cspe: { numeric },
			hp_conso: { numeric },
			hc_conso: { numeric },
			pte_conso: { numeric },
			hch_conso: { numeric },
			hpe_conso: { numeric },
			hp_puiss: { numeric },
			hc_puiss: { numeric },
			pte_puiss: { numeric },
			hph_puiss: { numeric },
			hpe_puiss: { numeric },
			date_debut_fourniture: {  },
			date_fin_fourniture: {  },
			date_remise_offre: {  },
			date_cloture: {  },
			courtage: {  },
			efficacite: {  },
			fiscalite: {  },
			fournisseur: {  }
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
