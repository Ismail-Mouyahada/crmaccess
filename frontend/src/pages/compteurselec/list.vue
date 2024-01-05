<template>
    <main class="main-page"  id="">
        <template v-if="showHeader">
            <section class="page-section mb-3" >
                <div class="container-fluid">
                    <div class="grid justify-content-between align-items-center">
                        <div  class="col " >
                            <div class=" text-2xl text-primary font-bold" >
                                Compteurs Elec
                            </div>
                        </div>
                        <div  class="col-fixed " >
                            <router-link :to="`/compteurselec/add`">
                                <Button label="Ajouter un nouveau" icon="pi pi-plus" type="button" class="p-button w-full bg-primary "  />
                            </router-link>
                        </div>
                        <div  class="col-12 md:col-3 " >
                            <span class="p-input-icon-left w-full">
                            <i class="pi pi-search" />
                            <InputText  placeholder="Chercher" class="w-full" :value="filters.search.value" @input="debounce(() => { filters.search.value = $event.target.value })"  />
                            </span>
                        </div>
                        
                    </div>
                </div>
            </section>
        </template>
        <section class="page-section " >
            <div class="container-fluid">
                <div class="grid ">
                    <div  class="col comp-grid" >
                        <div class="flex align-items-center">
                            <filter-tags :controller="page.filterController" />
                        </div>
                        <div >
                            <template v-if="showBreadcrumbs && $route.query.tag && !isSubPage">
                                <Breadcrumb :home="{icon: 'pi pi-home', to: '/compteurselec'}" :model="pageBreadCrumb" />
                            </template>
                            <!-- page records template -->
                            <div class="page-records"  >
                                <DataTable :lazy="true"   :loading="loading"    v-model:selection="selectedItems"
                                     :value="records" dataKey="id" @sort="onSort($event)" class=" p-datatable-sm" :stripedRows ="true" :showGridlines="false" :rowHover="true" responsiveLayout="stack">
                                    <Column selectionMode="multiple" headerStyle="width: 2rem" />
                                        <Column  field="id" header="Id" >
                                            <template #body="{ data, index }">
                                                <router-link :to="`/compteurselec/view/${data.id}`">
                                                    {{ data.id }}
                                                </router-link>
                                            </template>
                                        </Column>
                                        <Column  field="pdl" header="PDL" >
                                            <template #body="{ data, index }">
                                                {{ data.pdl }}
                                            </template>
                                        </Column>
                                        <Column  field="segment" header="Segment" >
                                            <template #body="{ data, index }">
                                                {{ data.segment }}
                                            </template>
                                        </Column>
                                        <Column  field="taux_cspe" header="CSPE" >
                                            <template #body="{ data, index }">
                                                {{ data.taux_cspe }}
                                            </template>
                                        </Column>
                                        <Column  field="fta" header="FTA" >
                                            <template #body="{ data, index }">
                                                {{ data.fta }}
                                            </template>
                                        </Column>
                                        <Column  field="base_consommation" header="C.Base" >
                                            <template #body="{ data, index }">
                                                {{ data.base_consommation }}
                                            </template>
                                        </Column>
                                        <Column  field="date_debut_fourniture" header="DDF" >
                                            <template #body="{ data, index }">
                                                {{ data.date_debut_fourniture }}
                                            </template>
                                        </Column>
                                        <Column  field="date_fin_fourniture" header="DFF" >
                                            <template #body="{ data, index }">
                                                {{ data.date_fin_fourniture }}
                                            </template>
                                        </Column>
                                        <Column  field="date_cloture" header="Date Cloture" >
                                            <template #body="{ data, index }">
                                                {{ data.date_cloture }}
                                            </template>
                                        </Column>
                                        <Column  field="date_remise_offre" header="Date Remise Offre" >
                                            <template #body="{ data, index }">
                                                {{ data.date_remise_offre }}
                                            </template>
                                        </Column>
                                        <Column  field="reseau_distribution" header="Reseau Distribution" >
                                            <template #body="{ data, index }">
                                                {{ data.reseau_distribution }}
                                            </template>
                                        </Column>
                                        <Column  field="courtage" header="Courtage" >
                                            <template #body="{ data, index }">
                                                <div>
                                                    <Button v-if="data.courtage == 'true'" icon="pi pi-check-circle" class="p-button-sm p-button-success" v-tooltip="{value: data.courtage}" />
                                                    <Button v-else icon="pi pi-ban" class="p-button-sm p-button-warning" v-tooltip="{value: data.courtage}" />
                                                </div>
                                            </template>
                                        </Column>
                                        <Column  field="efficacite" header="Efficacite" >
                                            <template #body="{ data, index }">
                                                <div>
                                                    <Button v-if="data.efficacite == 'true'" icon="pi pi-check-circle" class="p-button-sm p-button-success" v-tooltip="{value: data.efficacite}" />
                                                    <Button v-else icon="pi pi-ban" class="p-button-sm p-button-warning" v-tooltip="{value: data.efficacite}" />
                                                </div>
                                            </template>
                                        </Column>
                                        <Column  field="fiscalite" header="Fiscalite" >
                                            <template #body="{ data, index }">
                                                <div>
                                                    <Button v-if="data.fiscalite == 'true'" icon="pi pi-check-circle" class="p-button-sm p-button-success" v-tooltip="{value: data.fiscalite}" />
                                                    <Button v-else icon="pi pi-ban" class="p-button-sm p-button-warning" v-tooltip="{value: data.fiscalite}" />
                                                </div>
                                            </template>
                                        </Column>
                                        <Column  field="societe_id" header="Societe" >
                                            <template #body="{ data, index }">
                                                {{ data.societe_id }}
                                            </template>
                                        </Column>
                                        <Column  field="fournisseur" header="Fournisseur" >
                                            <template #body="{ data, index }">
                                                {{ data.fournisseur }}
                                            </template>
                                        </Column>
                                        <Column  headerStyle="width: 2rem" headerClass="text-center">
                                            <template #body="{ data, index }">
                                                <div class="flex justify-content-end">
                                                    <SplitButton dropdownIcon="pi pi-bars" class="p-button dropdown-only p-button-text p-button-plain" :model="getActionMenuModel(data)">
                                                        <i></i>
                                                    </SplitButton>
                                                </div>
                                            </template>
                                        </Column>
                                    </DataTable>
                                </div>
                                <!-- Empty record -->
                                <template v-if="pageReady && !records.length">
                                    <div class="p-3 my-3 text-500 text-lg font-medium text-center">
                                        Aucun Enregistrement Trouvé
                                    </div>
                                </template>
                                <!-- end of empty record-->
                                <!-- pagination component-->
                                <template v-if="showFooter && pageReady">
                                    <div class="grid justify-content-between align-items-center">
                                        <div class="flex gap-2 flex-grow-0">
                                            <div v-if="selectedItems.length" class="m-2">
                                                <Button @click="deleteItem(selectedItems)" icon="pi pi-trash" class="p-button-danger" title="Supprimer sélectionnée" />
                                            </div>
                                        </div>
                                        <div v-if="paginate && totalPages > 1" class="flex-grow-1">
                                            <Paginator class="paginator-flat my-3" :first="recordsPosition - 1" @page="(event)=>{pagination.page = event.page + 1}" :rows="pagination.limit" :totalRecords="totalRecords">
                                                <template #start>
                                                    <span class="px-2">
                                                    Records <b>{{ recordsPosition }} sur {{ totalRecords }}</b>
                                                    </span>
                                                </template>
                                                <template #end>
                                                </template>
                                            </Paginator>
                                        </div>
                                    </div>
                                </template>
                                <!-- end of pagination component-->
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
</template>
<script setup>
	import {   toRefs, onMounted } from 'vue';
	import { usePageStore } from 'src/store/page';
	import { useApp } from 'src/composables/app.js';
	import { useListPage } from 'src/composables/listpage.js';
	
	const props = defineProps({
		primaryKey : {
			type : String,
			default : 'id',
		},
		pageStoreKey: {
			type: String,
			default: 'COMPTEURSELEC',
		},
		pageName: {
			type: String,
			default : 'compteurselec',
		},
		routeName: {
			type: String,
			default: 'compteurseleclist',
		},
		apiPath: {
			type: String,
			default: 'compteurselec/index',
		},
		autoLoad: {
			type: Boolean,
			default: true,
		},
		enableCache: {
			type: Boolean,
			default: false,
		},
		paginate: {
			type: Boolean,
			default: true,
		},
		showHeader: {
			type: Boolean,
			default: true,
		},
		showFooter: {
			type: Boolean,
			default: true,
		},
		showBreadcrumbs: {
			type: Boolean,
			default: true,
		},
		exportButton: {
			type: Boolean,
			default: true,
		},
		importButton: {
			type: Boolean,
			default: false,
		},
		multiCheckbox: {
			type: Boolean,
			default: true,
		},
		page: {
			type: Number,
			default: 1,
		},
		limit: {
			type: Number,
			default: 10,
		},
		mergeRecords: { // for infinite loading
			type: Boolean,
			default: false,
		},
		search: {
			type: String,
			default: '',
		},
		fieldName: null,
		fieldValue: null,
		queryParams: { 
			type: Object,
			default: () => ({})
		},
		sortBy: {
			type: String,
			default: '',
		},
		sortType: {
			type: String,
			default: 'desc', //desc or asc
		},
		isSubPage: {
			type: Boolean,
			default: false,
		},
		emptyRecordMsg: {
			type: String,
			default: "Aucun Enregistrement Trouvé",
		},
		titleBeforeDelete: {
			type: String,
			default: "Supprimer l'enregistrement",
		},
		msgBeforeDelete: {
			type: String,
			default: "Êtes-vous sûr de vouloir supprimer cet enregistrement?",
		},
		msgAfterDelete: {
			type: String,
			default: "Enregistrement supprimé avec succès",
		},
		filterTagClass: {
			type: String,
			default: 'surface-card p-2 text-500 flex-grow-1 text-center m-1 mb-3 flex-grow-1 text-center',
		}
	});
	
	const app = useApp();
	
	const defaultStoreState = {
		filters: {
			search: {
				tag: "Search",
				value: '',
				valueType: 'single',
				options: [],
			}
		},
		pagination: {
			page: props.page,
			limit: props.limit,
			sortBy: props.sortBy,
			sortType: props.sortType
		},
		primaryKey: props.primaryKey,
		enableCache: props.enableCache
	}
	const store = usePageStore(props.pageStoreKey,  defaultStoreState);
	
	// page hooks where logics resides
	const page = useListPage({ store, props });
	
	const {records, filters,  totalRecords,  selectedItems,  pagination,} = toRefs(store.state);
	const { pageReady, loading, } = toRefs(page.state);
	
	const {  pageBreadCrumb,   totalPages, recordsPosition, } = page.computedProps;
	
	const { load,    exportPage, debounce, onSort,  deleteItem,    } = page.methods;
	
	function getActionMenuModel(data){
		return [
		{
			label: "View",
			to: `/compteurselec/view/${data.id}`,
			icon: "pi pi-eye"
		},
		{
			label: "Edit",
			to: `/compteurselec/edit/${data.id}`,
			icon: "pi pi-pencil"
		},
		{
			label: "Delete",
			command: (event) => { deleteItem(data.id) },
			icon: "pi pi-trash"
		}
	]
	}
	
	onMounted(()=>{ 
		const pageTitle = "Compteurs Elec";
		app.setPageTitle(props.routeName, pageTitle);
	});
</script>
<style scoped>
</style>
