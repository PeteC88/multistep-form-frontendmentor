<template>
    <footer v-if="currentStep < 5">
        <button class="footer__btn footer__btn-prev" @click="prevStepAction" :class="{'footer__btn-prev--active': props.currentStep > 1}">
            Go Back
        </button>
        <button class="footer__btn" @click="nextStepAction" :class="{'confirm-button': currentStep === 4}">
            {{ nextStepOrConfirmText }}
        </button>
    </footer>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';

const props = defineProps(['currentStep']);
const emit = defineEmits(['prevStepAction', 'nextStepAction']);

console.log(props.currentStep, 'prpos from footer');


//actions for prev and nextstep
const prevStepAction = ()=>{
    emit('prevStepAction', )
}


const nextStepAction = ()=>{
    emit('nextStepAction');
}

const nextStepOrConfirmText = computed(()=>{
    return props.currentStep === 4 ? 'Confirm' : 'Next step'; 
})

</script>

<style scoped>

</style>