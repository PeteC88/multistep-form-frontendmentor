<template>
  <footer v-if="currentStep < 5">
    <button
      class="footer__btn footer__btn-prev"
      @click="prevStepAction"
      :class="{ 'footer__btn-prev--active': props.currentStep > 1 }"
    >
      Go Back
    </button>
    <button
      class="footer__btn footer__btn-next"
      ref="footerBtn"
      @click="nextStepAction"
      :class="{ 'confirm-button': currentStep === 4 }"
    >
      {{ nextStepOrConfirmText }}
    </button>
  </footer>
</template>

<script setup lang="ts">
import { defineProps, computed, watch, onMounted } from "vue";

const props = defineProps(["currentStep"]);
const emit = defineEmits(["prevStepAction", "nextStepAction"]);

const footerBtn = document.querySelector(".footer__btn-next");
onMounted(() => {});

watch(
  () => props.currentStep,
  (newValue) => {
    if (newValue === 4) {
      if (footerBtn !== null) {
        footerBtn.setAttribute("type", "submit");
      }
    }
  }
);

//actions for prev and nextstep
const prevStepAction = () => {
  emit("prevStepAction");
};

const nextStepAction = () => {
  emit("nextStepAction");
};

const nextStepOrConfirmText = computed(() => {
  return props.currentStep === 4 ? "Confirm" : "Next step";
});
</script>

<style scoped></style>
