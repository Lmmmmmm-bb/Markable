<script setup lang="ts">
import AutoComplete, {
  AutoCompleteItemUnselectEvent
} from 'primevue/autocomplete';
import PinyinMatch from 'pinyin-match';
import PickList from 'primevue/picklist';
import Button from 'primevue/button';
import vTooltip from 'primevue/tooltip';
import styles from '~/assets/styles/match/index.module.scss';

const route = useRoute();
const source = ref<string[]>((route.params.list as string[]) || []);
const target = ref<string[]>([]);
const input = ref('');
const matchList = ref<string[]>([]);

const onToggleValue = (value: string) => {
  if (source.value.includes(value)) {
    source.value = source.value.filter((item) => item !== value);
    target.value.push(value);
  } else {
    target.value = target.value.filter((item) => item !== value);
    source.value.unshift(value);
  }
};

const handleComplete = () =>
  (matchList.value = source.value.filter((item) =>
    PinyinMatch.match(item, input.value)
  ));

const handleItemSelect = (e: AutoCompleteItemUnselectEvent) => {
  input.value = '';
  onToggleValue(e.value);
};

const handleRemoveItem = (value: string) => {
  onToggleValue(value);
};
</script>

<template>
  <div :class="styles.wrapper">
    <div :class="styles.inputWrapper">
      <auto-complete
        v-model="input"
        placeholder="输入拼音匹配"
        :input-class="styles.input"
        :suggestions="matchList"
        :delay="0"
        complete-on-focus
        force-selection
        @complete="handleComplete"
        @item-select="handleItemSelect($event)"
      />
    </div>
    <PickList :model-value="[source, target]">
      <template #sourceheader>未确认名单 {{ source.length }}</template>
      <template #targetheader>已确认名单 {{ target.length }}</template>
      <template #item="slotProps">
        <div
          v-tooltip.top="'点击改变元素状态'"
          @click="handleRemoveItem(slotProps.item)"
        >
          {{ slotProps.item }}
        </div>
      </template>
    </PickList>
    <div :class="styles.inputWrapper">
      <Button label="重新上传" @click="$router.replace('/')" />
    </div>
  </div>
</template>
