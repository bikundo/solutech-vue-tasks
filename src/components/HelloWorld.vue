<template>
  <div class="container mx-auto px-4 py-6">
    <div class="gap-8 columns-4">
      <div class="col mx-2 px-2 py-3 bg-red-50 border rounded">
        <h6>backlog 💡</h6>
        <draggable class="draggable-list" :list="tasks.ideas" group="tasks">
          <div v-for="(idea, i) in tasks.ideas" :key="i">
            <div class="bg-white mt-3 p-2 shadow border rounded">
              <p>{{ idea }}</p>
            </div>
          </div>
        </draggable>
      </div>
      <div class="col mx-2 px-2 py-3 bg-blue-50 border rounded">
        <h6>in progress ✍</h6>
        <draggable class="draggable-list" :list="tasks.todos" group="tasks">
          <div v-for="(todo, i) in tasks.todos" :key="i">
            <div class="bg-white mt-3 p-2 shadow border rounded">
              <p>{{ todo }}</p>
            </div>
          </div>
        </draggable>
      </div>
      <div class="col mx-2 px-2 py-3 bg-blue-50 border rounded">
        <h6>In Review 🗓</h6>
        <draggable
            class="draggable-list"
            :list="tasks.inProgress"
            group="tasks"
        >
          <div v-for="(task, i) in tasks.inProgress" :key="i">
            <div class="bg-white mt-3 p-2 shadow border rounded">
              <p>{{ task }}</p>
            </div>
          </div>
        </draggable>
      </div>
      <div class="col mx-2 px-2 py-3 bg-green-50 border rounded">
        <h6>completed ✅</h6>
        <draggable class="draggable-list" :list="tasks.completed" group="tasks">
          <div v-for="(task, i) in tasks.completed" :key="i">
            <div class="bg-white mt-3 p-2 shadow border rounded">
              <p>{{ task }}</p>
            </div>
          </div>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import {VueDraggableNext} from "vue-draggable-next";

export default {
  components: {
    draggable: VueDraggableNext,
  },
  data() {
    return {
      tasks: {
        ideas: ["Migrate codebase to TypeScript"],
        todos: ["Dockerize App", "Add vue.draggable to project"],
        inProgress: ["Implement Web3 Features", "Bump to vite.js"],
        completed: [],
      },
    };
  },
};
</script>

<style scoped>
h6 {
  font-weight: 700;
}

.col {
  height: 90vh;
  overflow: auto;
}

.draggable-list {
  min-height: 10vh;
}

.draggable-list > div {
  cursor: pointer;
}
</style>