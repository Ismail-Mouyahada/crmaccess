<template>
    <div id="master-detailpage">
        <TabView v-model:activeIndex="activeTab">
            <TabPanel>
                <template #header>
                    <div class=" text-lg font-bold" >
                        Compteurs electrcité
                    </div>
                </template>
                <div class="card my-3 p-3 surface-50">
                    <CompteurselecListPage ref="compteurselecListPage"  field-name="compteurs_elec.societe_id" :field-value="masterRecord.id" :show-header="true" :show-breadcrumbs="false" isSubPage>
                    </CompteurselecListPage>
                </div>
            </TabPanel>
            <TabPanel>
                <template #header>
                    <div class=" text-lg font-bold" >
                        Compteurs Gaz
                    </div>
                </template>
                <div class="card my-3 p-3 surface-50">
                    <CompteursgazListPage ref="compteursgazListPage"  field-name="compteurs_gaz.societe_id" :field-value="masterRecord.id" :show-header="true" :show-breadcrumbs="false" isSubPage>
                    </CompteursgazListPage>
                </div>
            </TabPanel>
            <TabPanel>
                <template #header>
                    <div class=" text-lg font-bold" >
                        Evenements
                    </div>
                </template>
                <div class="card my-3 p-3 surface-50">
                    <EvenementsListPage ref="evenementsListPage"  field-name="evenements.societe_id" :field-value="masterRecord.id" :show-header="true" :show-breadcrumbs="false" isSubPage>
                    </EvenementsListPage>
                </div>
            </TabPanel>
        </TabView>
    </div>
</template>
<script setup>
import { watch, computed, ref, onMounted } from 'vue';
import { useApp } from 'src/composables/app.js';
import { usePageStore } from 'src/store/page';
import CompteurselecListPage from "../compteurselec/list.vue";
import CompteursgazListPage from "../compteursgaz/list.vue";
import EvenementsListPage from "../evenements/list.vue";
const props = defineProps({
	isSubPage: {
		type : Boolean,
		default : true,
	},
	scrollIntoView: {
		type : Boolean,
		default : false,
	},
});
const store = usePageStore('SOCIETES');
const app = useApp();
const masterRecord = computed(() => store.state.currentRecord);
const activeTab = ref(0);
const pageReady = computed(() => masterRecord.value != null);
//scroll detail page into view
function scrollToDetailPage() {
	if (props.scrollIntoView) {
		const pageElement = document.getElementById('master-detailpage');
		if(pageElement){
			pageElement.scrollIntoView({behavior:'smooth', block:'start'});
		}
	}
}
// pass form data from master to detail
function setDetailPageFormData(){
	const record = masterRecord.value;
	 
	// set compteurselec form data
	const compteurselecStore = usePageStore('compteurselec');
	compteurselecStore.setFormData({  });
	 
	// set compteursgaz form data
	const compteursgazStore = usePageStore('compteursgaz');
	compteursgazStore.setFormData({  });
	 
	// set evenements form data
	const evenementsStore = usePageStore('evenements');
	evenementsStore.setFormData({  });
}
watch(() => masterRecord, () => {
		setDetailPageFormData();
		scrollToDetailPage();
	},
	{ deep: true, immediate: true }
);
onMounted(()=>{ 
    scrollToDetailPage();
});
</script>
