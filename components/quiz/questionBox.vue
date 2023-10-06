<script setup>
const props = defineProps({
  id: Number,
  text: String,
  explanation: String,
  choices: Array,
  answer: Number,
})

const emit = defineEmits(["update:answer"])
</script>

<template>
  <v-card
    variant="elevated"
    class="ma-10 elevation-10"
    color="surface"
  >
    <v-card-title>{{ props.text }}</v-card-title>
    <v-card-text>
      <div class="text-body-1 py-3">
        {{ props.explanation }}
      </div>
      <v-divider
        :thickness="2"
        class="border-opacity-75"
      ></v-divider>
      <v-list>
        <v-radio-group @update:model-value="emit('update:answer', $event)">
          <div
            v-for="choice in props.choices"
            :key="choice.id"
          >
            <v-radio
              :label="choice.choiceText"
              :value="choice.id"
              color="primary"
            ></v-radio>
            <v-divider
              :thickness="1"
              class="border-opacity-25"
            ></v-divider>
          </div>
        </v-radio-group>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.v-card-title {
  color: aliceblue;
  background-color: #3700b3;
}
</style>
