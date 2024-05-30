<template>
  <section class="card-wrapper">
    <card>
      <section class="form-container step3" aria-label="step3-form">
        <h2>Pick add-ons</h2>
        <p class="form-cotainer__description">
          Add-ons help enhance your gaming experience.
        </p>
        <section class="form-inputs step3" aria-label="step3-inputs">
          <ul role="checkbox" class="checkbox__container">
            <li
              v-for="addOn in formStore.addOns"
              class="checkbox__item"
              :class="{ 'input-checked': addOn.isSelected }"
            >
              <label for="online-service" hidden></label>
              <input
                type="checkbox"
                tabindex="0"
                name="online-service"
                :checked="addOn.isSelected"
                @click="emit('selectPlan', addOn)"
                aria-label="checkbox online-service choise"
              />
              <div class="checkbox__service">
                <h3>{{ addOn.name }}</h3>
                <p>{{ addOn.infos }}</p>
              </div>
              <p class="price">
                {{
                  formStore.userPlanChosen.plan.isMonthly
                    ? `+$${addOn.price}/mo`
                    : `+$${addOn.price * formStore.nbOfPayingMonthsPerYear}/yr`
                }}
              </p>
            </li>
          </ul>
        </section>
      </section>
    </card>
  </section>
</template>

<script setup lang="ts">
import Card from "../UI/Card.vue";
import { userInfo } from "../../stores/userInfoStore.ts";
import { onMounted, defineEmits } from "vue";

const emit = defineEmits(["selectPlan"]);
const formStore = userInfo();

onMounted(() => {
  formStore.userPlanChosen.addOns.push(formStore.addOns[0]);
});
</script>
