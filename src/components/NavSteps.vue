<template>
  <nav class="steps-wrapper">
    <ul class="steps-container">
      <li class="steps-container__step">
        <div
          class="steps-container__number"
          :class="{
            'steps-container__number--active': props.currentStep === 1,
          }"
        >
          <p>1</p>
        </div>
        <div class="steps-container__titles">
          <p>Step 1</p>
          <h3>YOUR INFO</h3>
        </div>
      </li>
      <li class="steps-container__step">
        <div
          class="steps-container__number"
          :class="{
            'steps-container__number--active': props.currentStep === 2,
          }"
        >
          <p>2</p>
        </div>
        <div class="steps-container__titles">
          <p>Step 2</p>
          <h3>SELECT PLAN</h3>
        </div>
      </li>
      <li class="steps-container__step">
        <div
          class="steps-container__number"
          :class="{
            'steps-container__number--active': props.currentStep === 3,
          }"
        >
          <p>3</p>
        </div>
        <div class="steps-container__titles">
          <p>Step 3</p>
          <h3>ADDS-ON</h3>
        </div>
      </li>
      <li class="steps-container__step">
        <div
          class="steps-container__number"
          :class="{
            'steps-container__number--active':
              props.currentStep === 4 || props.currentStep === 5,
          }"
        >
          <p>4</p>
        </div>
        <div class="steps-container__titles">
          <p>Step 4</p>
          <h3>SUMMARY</h3>
        </div>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
const props = defineProps(["currentStep"]);
</script>

<style scoped></style>
