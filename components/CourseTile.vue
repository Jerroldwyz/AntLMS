<script setup lang="ts">
// const props = defineProps<{
//   id: number
//   title: string
//   thumbnail: string | null
// }>()
</script>

<template>
  <v-col
    cols="3"
    sm="6"
    md="4"
    lg="3"
  >
    <v-hover>
      <template #default="{ isHovering, props }">
        <v-card
          v-bind="props"
          :elevation="isHovering ? 5 : undefined"
        >
          <v-img
            cover
            height="170"
            :src="
              props.thumbnail != null && props.thumbnail != ''
                ? props.thumbnail
                : 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'
            "
          >
            <v-toolbar color="rgba(0,0,0,0)">
              <template #append>
                <v-menu offset="0, 100">
                  <template #activator="{ props }">
                    <v-btn
                      icon="mdi-dots-vertical"
                      v-bind="props"
                    ></v-btn>
                  </template>

                  <v-list>
                    <v-list-item> Remove course </v-list-item>
                  </v-list>
                </v-menu>
              </template>
            </v-toolbar>
          </v-img>

          <v-container>
            <v-card-title class="text-h6 text-left font-weight-medium">{{
              props.title
            }}</v-card-title>
          </v-container>
        </v-card>
      </template>
    </v-hover>
  </v-col>
</template>
