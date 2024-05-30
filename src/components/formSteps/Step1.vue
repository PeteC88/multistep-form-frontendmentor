<template>
  <section class="card-wrapper">
    <card>
      <section class="form-container step1" aria-label="step1-form">
        <h2>Personal Info</h2>
        <p class="form-cotainer__description">
          Please provide your name, email address, and phone number.
        </p>
        <section class="form-inputs step1" aria-label="step1-inputs">
          <label for="name"
            >Name
            <span
              class="error-message"
              :class="{
                'error-message--active': nextStepClicked && !userChoise.name,
              }"
              >{{ errorMessage }}</span
            ></label
          >
          <input
            type="text"
            name="name"
            placeholder="e.g. Stephen King"
            v-model="userChoise.name"
            minlength="3"
            aria-invalid="true"
            aria-required="true"
            :class="{ 'input--error': nextStepClicked && !userChoise.name }"
          />
          <label for="email"
            >Email Address
            <span
              class="error-message"
              :class="{
                'error-message--active': nextStepClicked && !userChoise.email,
              }"
              >{{ errorMessage }}</span
            ></label
          >
          <!-- pattern indicate at least 2 char for each part of the mail [^@\s][^@\s] (all char except @ and white space) and after the . at least 2 char and max 64 -->
          <input
            type="email"
            pattern="[^@\s][^@\s]+@[^@\s][^@\s]+\.[^@\s]{2,64}"
            name="email"
            title="e.g. stephenking@lorem.com at least 2 char for each part"
            placeholder="e.g. stephenking@lorem.com"
            v-model="userChoise.email"
            aria-invalid="true"
            aria-required="true"
            :class="{ 'input--error': nextStepClicked && !userChoise.email }"
          />
          <label for="phone"
            >Phone Number
            <span
              class="error-message"
              :class="{
                'error-message--active':
                  nextStepClicked && !userChoise.phoneNumber,
              }"
              >{{ errorMessage }}</span
            ></label
          >
          <input
            type="tel"
            name="phone"
            placeholder="e.g. +1 234 567 890"
            pattern="[+]{1}[0-9]{10,}"
            title=" use + for the prefix and then the number e.g. +1 234 567 890"
            v-model="userChoise.phoneNumber"
            minlengt="10"
            maxlength="20"
            aria-invalid="true"
            aria-required="true"
            :class="{
              'input--error': nextStepClicked && !userChoise.phoneNumber,
            }"
          />
        </section>
      </section>
    </card>
  </section>
</template>

<script setup lang="ts">
import Card from "../UI/Card.vue";
import { userInfo } from "../../stores/userInfoStore.ts";
import { computed } from "vue";

const emit = defineEmits(["changeNextClickEvent"]);

const formStore = userInfo();

const userChoise = formStore.getUserPlanChosen;

const errorMessage = "This field is required";

const props = defineProps(["nextStepClicked"]);

let nextStepClicked = computed(() => {
  return props.nextStepClicked;
});
</script>

<style lang="scss" scoped></style>
