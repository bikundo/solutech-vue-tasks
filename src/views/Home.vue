<template>
  <div class="container mx-auto px-4 py-6">
    <div class="gap-8 columns-4">
      <div class="col mx-2 px-2 py-3 bg-red-50 border rounded">
        <h6>backlog 💡</h6>
        <draggable class="draggable-list" :list="tasks.backlog" group="tasks">
          <div v-for="(task, i) in tasks.backlog" :key="i">
            <div class="bg-white mt-3 p-2 shadow border rounded">
              <p>{{ task.name }}</p>
            </div>
          </div>
        </draggable>
      </div>
      <div class="col mx-2 px-2 py-3 bg-blue-50 border rounded">
        <h6>in progress ✍</h6>
        <draggable class="draggable-list" :list="tasks.in_progress" group="tasks">
          <div v-for="(task, i) in tasks.in_progress" :key="i">
            <div class="bg-white mt-3 p-2 shadow border rounded">
              <p>{{ task.name }}</p>
            </div>
          </div>
        </draggable>
      </div>
      <div class="col mx-2 px-2 py-3 bg-blue-50 border rounded">
        <h6>In Review 🗓</h6>
        <draggable
            class="draggable-list"
            :list="tasks.in_review"
            group="tasks"
        >
          <div v-for="(task, i) in tasks.in_review" :key="i">
            <div class="bg-white mt-3 p-2 shadow border rounded">
              <p>{{ task.name }}</p>
            </div>
          </div>
        </draggable>
      </div>
      <div class="col mx-2 px-2 py-3 bg-green-50 border rounded">
        <h6>completed ✅</h6>
        <draggable class="draggable-list" :list="tasks.completed" group="tasks">
          <div v-for="(task, i) in tasks.completed" :key="i">
            <div class="bg-white mt-3 p-2 shadow border rounded">
              <p>{{ task.name }}</p>
            </div>
          </div>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import {VueDraggableNext} from "vue-draggable-next";
import axios from "axios";

export default {
  components: {
    draggable: VueDraggableNext,
  },
  data() {
    return {
      tasks: {
        backlog: [],
        in_progress: [],
        in_review: [],
        completed: [],
      },
    };
  },

  mounted() {

    axios.get('https://solutech-tasks.test/api/tasks')
        .then((response) => {
          console.log(response)
          response.data.data.forEach(task => {
            switch (task.status_id) {
              case 1:
                this.tasks.backlog.push(task)
                break;
              case 2:
                this.tasks.in_progress.push(task)
                break;
              case 3:
                this.tasks.in_review.push(task)
                break;
              case 4:
                this.tasks.completed.push(task)
                break;
            }
          });
        })
  }
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