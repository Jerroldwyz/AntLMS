<template>
  <v-container>
    <!-- Course Title -->
    <h1 class="course-title">{{ courseTitle }}</h1>

    <v-row>
      <!-- Navigation Bar -->
      <v-col cols="3">
        <v-card class="nav-bar">
          <v-card-title class="nav-title">Navigation</v-card-title>
          <v-list density="compact">
            <v-list-item
              class="nav-item"
              @click="selectedNavItem = 'modules'"
            >
              <v-list-item-title>Modules</v-list-item-title>
            </v-list-item>
            <v-list-item
              class="nav-item"
              @click="selectedNavItem = 'quizzes'"
            >
              <v-list-item-title>Quizzes</v-list-item-title>
            </v-list-item>
            <!-- Add other navigation items here (e.g., discussions) -->
          </v-list>
        </v-card>
      </v-col>

      <!-- Content Area -->
      <v-col cols="9">
        <div class="content-area">
          <!-- Modules -->
          <div v-if="selectedNavItem === 'modules'">
            <v-expansion-panels>
              <v-expansion-panel
                v-for="(module, moduleIndex) in modules"
                :key="moduleIndex"
              >
                <v-expansion-panel-title class="module-title">
                  {{ module.title }}
                </v-expansion-panel-title>
                <v-expansion-panel-text :expanded="moduleIndex === 0">
                  <!-- Set expanded to true for the first module -->
                  <!-- Headings -->
                  <v-expansion-panels>
                    <v-expansion-panel
                      v-for="(heading, headingIndex) in module.headings"
                      :key="headingIndex"
                    >
                      <v-expansion-panel-title class="heading-title">
                        {{ heading.title }}
                      </v-expansion-panel-title>
                      <v-expansion-panel-text>
                        <!-- Content -->
                        <div class="content-textbox">
                          <div
                            v-for="(content, contentIndex) in heading.content"
                            :key="contentIndex"
                          >
                            {{ content.text }}
                          </div>
                        </div>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </div>

          <!-- Quizzes -->
          <div v-else-if="selectedNavItem === 'quizzes'">
            <div
              v-for="(quiz, quizIndex) in quizzes"
              :key="quizIndex"
              class="quiz-item"
            >
              <h2 class="quiz-title">{{ quiz.title }}</h2>
              <p class="quiz-description">{{ quiz.description }}</p>
            </div>
          </div>

          <!-- Add other content sections for discussions, assignments, etc. -->
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      courseTitle: "Your Course Title",
      selectedNavItem: "modules", // Default to 'modules'
      modules: [
        {
          title: "Module 1",
          headings: [
            {
              title: "Heading 1.1",
              content: [
                { text: "Content goes here..." },
                { text: "More content goes here..." },
              ],
            },
            {
              title: "Heading 1.2",
              content: [
                { text: "Content goes here..." },
                { text: "More content goes here..." },
              ],
            },
            {
              title: "Heading 1.3",
              content: [
                { text: "Content goes here..." },
                { text: "More content goes here..." },
              ],
            },
            // Add more headings here
          ],
        },
        {
          title: "Module 2",
          headings: [
            {
              title: "Heading 2.1",
              content: [
                { text: "Content goes here..." },
                { text: "More content goes here..." },
              ],
            },
            {
              title: "Heading 2.2",
              content: [
                { text: "Content goes here..." },
                { text: "More content goes here..." },
              ],
            },
            {
              title: "Heading 2.3",
              content: [
                { text: "Content goes here..." },
                { text: "More content goes here..." },
              ],
            },
            // Add more headings here
          ],
        },
        // Add more modules here
      ],
      quizzes: [
        { title: "Quiz 1", description: "Description of Quiz 1" },
        { title: "Quiz 2", description: "Description of Quiz 2" },
        // Add more quizzes here
      ],
    }
  },
}
</script>

<style scoped>
.course-title {
  font-size: 32px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

.nav-bar {
  background-color: rgba(255, 255, 255, 0.2); /* Glass-like effect */
  padding: 10px;
  border-radius: 5px;
}

.nav-bar v-list-item-title {
  color: #fff;
}

.content-area {
  padding: 20px;
}

.module-title,
.heading-title,
.subheading-title,
.quiz-title {
  font-size: 20px;
  font-weight: bold;
  color: #007acc;
}

.content-textbox {
  background-color: rgba(255, 255, 255, 0.9); /* Light glass-like effect */
  padding: 20px;
  margin-top: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.quiz-item {
  margin-bottom: 20px;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.2); /* Glass-like effect */
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.quiz-item:hover {
  background-color: rgba(
    255,
    255,
    255,
    0.3
  ); /* Lighter glass effect on hover */
}

.course-title {
  font-size: 32px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

.nav-bar {
  background-color: rgba(255, 255, 255, 0.2); /* Glass-like effect */
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Shadow effect */
}

.nav-title {
  font-size: 18px;
  font-weight: bold;
  color: #007acc;
}

.nav-item {
  color: #007acc;
  transition:
    background-color 0.3s,
    color 0.3s;
}

.nav-item:hover {
  background-color: rgba(0, 122, 204, 0.2); /* Light blue background on hover */
  color: #004a80; /* Darker blue text on hover */
}

/* ... (rest of the styles) */
</style>
