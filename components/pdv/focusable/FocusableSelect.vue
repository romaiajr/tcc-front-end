<template>
  <div class="focusable-select">
    <ul>
      <li class="focusable-select-title">
        <FocusableElement ref="selectTitle" :title="title" shift-flag>
          {{ title }}
        </FocusableElement>
      </li>
      <li
        v-for="(item, index) in items"
        :key="index"
        class="focusable-select-item"
      >
        <FocusableElement
          :title="shouldTranslate ? $t(item.title) : item.title"
          @click="() => handleSubmit(index)"
          @keydown.shift="() => readInfoText($t(item.infotext ?? ''))"
        >
          {{ shouldTranslate ? $t(item.title) : item.title }}
        </FocusableElement>
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
interface FocusableSelectProps {
  title: string;
  items: {
    title: string;
    infotext?: string;
  }[];
  shiftFlag?: boolean;
  shouldTranslate?: boolean;
}

const { title, items, shiftFlag } = defineProps<FocusableSelectProps>();

const tts = useTTS();

const emit = defineEmits(['submit']);

const readInfoText = (infoText: string) => {
  if (shiftFlag) {
    tts.speakPhrase(infoText);
  }
};

const handleSubmit = (index: number) => {
  emit('submit', index);
};

const selectTitle = ref();

onMounted(() => {
  nextTick();
  selectTitle.value.focusableRef.focus();
});
</script>

<style scoped>
.focusable-select {
  display: table;
  width: 50%;
  text-align: center;
  border-spacing: 0;
  border-collapse: collapse;
}

.focusable-select ul {
  list-style-type: none;
  padding: 0;
  width: 100%;
  display: table-row-group;
}

.focusable-select li {
  display: table-row;
  width: 100%;
}

.pdv-select-title {
  font-size: 1.5rem;
  font-weight: bold;
  padding: 10px;
  background-color: #fff;
  margin-bottom: 16px;
  cursor: default;
  display: table-cell;
}

.pdv-select-item {
  display: table-cell;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ccc;
  cursor: pointer;
}

.focusable-element {
  outline: none;
  border: none;
  display: block;
  width: 100%;
  padding: 10px;
}

.focusable-element:focus {
  border: 1px solid #ff7043;
  background-color: #ffe0b2;
}
</style>
