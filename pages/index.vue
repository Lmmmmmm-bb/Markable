<script setup lang="ts">
import FileUpload, { FileUploadRemoveEvent } from 'primevue/fileupload';
import DataTable from 'primevue/datatable';
import RadioButton from 'primevue/radiobutton';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';
import PickList from 'primevue/picklist';
import { read, utils } from 'xlsx';
import styles from '~/assets/styles/index.module.scss';

const router = useRouter();

const fileData = ref();
const selectKey = ref<string>();
const filter = ref([[], []]);

const handleUpload = (e: FileUploadRemoveEvent) => {
  const [sheet] = e.files;
  const reader = new FileReader();
  reader.readAsArrayBuffer(sheet);
  reader.addEventListener('load', (e) => {
    const data = e.target.result;
    const { Sheets, SheetNames } = read(data);
    const sheet = utils.sheet_to_json(Sheets[SheetNames[0]]);
    fileData.value = sheet;
  });
};

const handleSubmit = () => {
  const [list] = filter.value;
  router.push({ name: 'match', params: { list } });
};

watch(
  () => [fileData.value, selectKey.value],
  ([data, key]) =>
    key ? (filter.value = [data.map((item) => item[key]), []]) : [[], []]
);
</script>

<template>
  <div :class="styles.wrapper">
    <file-upload
      v-if="!fileData"
      mode="basic"
      choose-label="上传 Excel 文件"
      accept=".xlsx"
      auto
      custom-upload
      @uploader="handleUpload"
    />
    <template v-if="fileData">
      <splitter :class="styles.splitterWrapper">
        <splitter-panel>
          <data-table
            scroll-height="100vh"
            :class="styles.dataTable"
            :value="fileData"
            scrollable
          >
            <column
              v-for="(_, key, index) in fileData[0]"
              :key="index"
              :field="key.toString()"
            >
              <template #header>
                <radio-button
                  :id="key"
                  v-model="selectKey"
                  :value="key"
                  :class="styles.dataTableHeader"
                  name="key"
                />
                <label :for="key.toString()">{{ key }}</label>
              </template>
            </column>
          </data-table>
        </splitter-panel>
        <splitter-panel v-show="selectKey">
          <pick-list v-model="filter">
            <template #sourceheader>已选择名单</template>
            <template #targetheader>剔除名单</template>
            <template #item="slotProps">
              <div>
                <div>{{ slotProps.item }}</div>
              </div>
            </template>
          </pick-list>
          <div :class="styles.splitterAction">
            <Button @click="handleSubmit">确认名单</Button>
          </div>
        </splitter-panel>
      </splitter>
    </template>
  </div>
</template>
