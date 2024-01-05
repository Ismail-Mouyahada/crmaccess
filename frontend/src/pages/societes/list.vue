<template>
    <main class="main-page"  id="">
        <template v-if="showHeader">
            <section class="page-section mb-3" >
                <div class="container-fluid">
                    <div class="grid justify-content-between align-items-center">
                        <div  class="col " >
                            <div class=" text-2xl text-primary font-bold" >
                                Societes
                            </div>
                        </div>
                        <div  class="col-fixed " >
                            <router-link :to="`/societes/add`">
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
                                <Breadcrumb :home="{icon: 'pi pi-home', to: '/societes'}" :model="pageBreadCrumb" />
                            </template>
                            <div class="grid ">
                                <div class="col">
                                    <!-- page records template -->
                                    <div class="page-records"  >
                                        <DataTable :lazy="true"   :loading="loading"    v-model:selection="selectedItems"
                                             :value="records" dataKey="id" @sort="onSort($event)" class=" p-datatable-sm" :stripedRows ="true" :showGridlines="false" :rowHover="true" responsiveLayout="stack">
                                            <Column selectionMode="multiple" headerStyle="width: 2rem" />
                                                <Column  field="" header="" >
                                                    <template #body="{ data, index }">
                                                        <Button @click="setCurrentRecord(data)" class="p-button-text" icon="pi pi-caret-down" label="" />
                                                    </template>
                                                </Column>
                                                <Column  field="id" header="Id" >
                                                    <template #body="{ data, index }">
                                                        <router-link :to="`/societes/view/${data.id}`">
                                                            {{ data.id }}
                                                        </router-link>
                                                    </template>
                                                </Column>
                                                <Column  field="logo" header="Logo" >
                                                    <template #body="{ data, index }">
                                                        <image-viewer image-size="small" image-preview-size="" :src="data.logo" width="50px" height="50px" class="img-fluid" :num-display="1">
                                                        </image-viewer>
                                                    </template>
                                                </Column>
                                                <Column  field="siren" header="Siren" >
                                                    <template #body="{ data, index }">
                                                        {{ data.siren }}
                                                    </template>
                                                </Column>
                                                <Column  field="nom_entreprise" header="Nom Entreprise" >
                                                    <template #body="{ data, index }">
                                                        {{ data.nom_entreprise }}
                                                    </template>
                                                </Column>
                                                <Column  field="ville" header="Ville" >
                                                    <template #body="{ data, index }">
                                                        {{ data.ville }}
                                                    </template>
                                                </Column>
                                                <Column  field="code_postal" header="Code Postal" >
                                                    <template #body="{ data, index }">
                                                        {{ data.code_postal }}
                                                    </template>
                                                </Column>
                                                <Column  field="region" header="Region" >
                                                    <template #body="{ data, index }">
                                                        {{ data.region }}
                                                    </template>
                                                </Column>
                                                <Column  field="adresse" header="Adresse" >
                                                    <template #body="{ data, index }">
                                                        {{ data.adresse }}
                                                    </template>
                                                </Column>
                                                <Column  field="utilisateur_id" header="Utilisateur Id" >
                                                    <template #body="{ data, index }">
                                                        {{ data.utilisateur_id }}
                                                    </template>
                                                </Column>
                                                <Column  field="note_elirpo" header="Note Elirpo" >
                                                    <template #body="{ data, index }">
                                                        <!-- <ProgressBar size="17px" :value="$utils.toPercent(data.note_elirpo, 100)" color="accent" v-tooltip="{value: data.note_elirpo}">
                                                        {{  $utils.toPercent(data.note_elirpo, 100) + '%'}}
                                                        </ProgressBar> -->
                                                        <Knob :size="60" readonly v-model="data.note_elirpo" :min="0" :max="100" />
                                                    </template>
                                                </Column>
                                                <Column  field="note_creditsafe" header="Note Creditsafe" >
                                                    <template #body="{ data, index }">
                                                        <!-- <ProgressBar size="17px" :value="$utils.toPercent(data.note_creditsafe, 100)" color="accent" v-tooltip="{value: data.note_creditsafe}">
                                                        {{  $utils.toPercent(data.note_creditsafe, 100) + '%'}}
                                                        </ProgressBar> -->
                                                        <Knob :size="60" readonly v-model="data.note_creditsafe" :min="0" :max="100" />
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
                                    <!-- Detal Page Column -->
                                    <template v-if="currentRecord && !isSubPage">
                                        <div class="col-12">
                                            <div class="card  p-0">
                                                <component :is="masterDetailPage" :scroll-into-view="true"></component>
                                            </div>
                                        </div>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
</template>
<script setup>
	import { defineAsyncComponent, computed,  toRefs, onMounted } from 'vue';
	import { usePageStore } from 'src/store/page';
	import { utils } from 'src/utils';
	import { useApp } from 'src/composables/app.js';
	import { useListPage } from 'src/composables/listpage.js';
	
	const props = defineProps({
		primaryKey : {
			type : String,
			default : 'id',
		},
		pageStoreKey: {
			type: String,
			default: 'SOCIETES',
		},
		pageName: {
			type: String,
			default : 'societes',
		},
		routeName: {
			type: String,
			default: 'societeslist',
		},
		apiPath: {
			type: String,
			default: 'societes/index',
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
	
	const {records, filters, currentRecord, totalRecords,  selectedItems,  pagination,} = toRefs(store.state);
	const { pageReady, loading, } = toRefs(page.state);
	
	const {  pageBreadCrumb,   totalPages, recordsPosition, } = page.computedProps;
	
	const { load,    exportPage, debounce, onSort,  deleteItem, setCurrentRecord,   } = page.methods;
	
	function getActionMenuModel(data){
		return [
		{
			label: "View",
			to: `/societes/view/${data.id}`,
			icon: "pi pi-eye"
		},
		{
			label: "Edit",
			to: `/societes/edit/${data.id}`,
			icon: "pi pi-pencil"
		},
		{
			label: "Delete",
			command: (event) => { deleteItem(data.id) },
			icon: "pi pi-trash"
		}
	]
	}
	const masterDetailPage = computed(() => defineAsyncComponent(() => import("./detail-pages.vue")));
	
	onMounted(()=>{ 
		const pageTitle = "Societes";
		app.setPageTitle(props.routeName, pageTitle);
	});
</script>
<style scoped>
</style>
