<script setup lang="ts">
interface Choice {
  id: number
  choiceText: string
  isCorrect: boolean
}

const props = defineProps<{
  keyIndex: number
  id: number
  text: string
  explanation: string
  choices: Choice[]
}>()

const emit = defineEmits(["update:answer"])

const onUpdate = (event: any) => {
  emit("update:answer", event)
}
</script>

<template>
  <div class="ma-7">
    <p class="text-body-1 font-weight-bold">
      Question {{ props.keyIndex + 1 }}
      <span class="text-red text-h5">*</span>
    </p>
    <v-card
      class="elevation-10"
      variant="elevated"
      color="surface"
    >
      <v-card-title>
        <div v-html="props.text"></div>
      </v-card-title>
      <v-card-text>
        <div class="text-body-1 py-3">
          {{ props.explanation }}
        </div>
        <v-divider
          :thickness="2"
          class="border-opacity-75"
        ></v-divider>
        <v-list>
          <v-radio-group @update:model-value="onUpdate($event)">
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
  </div>
</template>

<style scoped>
.v-card-title {
  color: aliceblue;
  background-color: #3700b3;
}
</style>
