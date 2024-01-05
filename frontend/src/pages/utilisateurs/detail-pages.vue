<template>
    <div id="master-detailpage">
        <TabView v-model:activeIndex="activeTab">
            <TabPanel>
                <template #header>
                    <div class=" text-lg font-bold" >
                        Societés
                    </div>
                </template>
                <div class="card my-3 p-3 surface-50">
                    <SocietesListPage ref="societesListPage"  field-name="societes.utilisateur_id" :field-value="masterRecord.id" :show-header="true" :show-breadcrumbs="false" isSubPage>
                    </SocietesListPage>
                </div>
            </TabPanel>
        </TabView>
    </div>
</template>
<script setup>
import { watch, computed, ref, onMounted } from 'vue';
import { useApp } from 'src/composables/app.js';
import { usePageStore } from 'src/store/page';
import SocietesListPage from "../societes/list.vue";
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
const store = usePageStore('UTILISATEURS');
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
	 
	// set societes form data
	const societesStore = usePageStore('societes');
	societesStore.setFormData({  });
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
