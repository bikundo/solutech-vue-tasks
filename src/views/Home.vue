<template>
  <div class="container mx-auto px-4 py-6">
    <button @click="showModal(false)" type="button" class="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
      Show modal
    </button>

    <Modal size="xl" v-if="isShowModal" @close="closeModal">
      <template #header>
        <div class="flex items-center text-lg">
          {{ selectedTask.name }}
        </div>
      </template>
      <template #body>
        <Input placeholder="enter the name of the task " label="task name" v-model="selectedTask.name"/>
        <div class="mt-2 border-2 rounded p-2">
          <h5 class="mb-2  font-bold tracking-tight text-gray-900 dark:text-white">
            description
            <small>
              ( click to edit)
            </small>
          </h5>
          <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400" contenteditable="true" @blur="updateDescription">
            {{ selectedTask.description }}
          </p>
        </div>
        <div class="mt-2 p-2 border-2 rounded">
          <h5 class="mb-2  font-bold tracking-tight text-gray-900 dark:text-white">
            <small>
              due date
            </small>
          </h5>
          <p>
            {{ moment(selectedTask.due_date).format('MMMM Do YYYY, h:mm:ss a') }}
          </p>
        </div>
        <AssignedUser v-if="selectedTask.taskuser" :task="selectedTask"></AssignedUser>
        <unassigned-task v-else :task="selectedTask"></unassigned-task>

      </template>
      <template #footer>
        <div class="flex justify-between">
          <button @click="closeModal" type="button"
                  class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
            Decline
          </button>
          <button @click="closeModal" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            update task
          </button>
        </div>
      </template>
    </Modal>
    <div class="gap-8 columns-4">
      <div class="col mx-2 px-2 py-3 bg-red-50 border rounded">
        <h6>backlog 💡</h6>
        <draggable class="draggable-list" :list="tasks.backlog" group="tasks" id="1" :move="checkMove" @touchstart="showModal">
          <div v-for="(task, i) in tasks.backlog" :key="i" v-on:click.native="showModal(task)">
            <div class="bg-white mt-3 p-2 shadow border rounded">
              <p><b>{{ task.id }}</b> {{ task.name }}</p>
            </div>
          </div>
        </draggable>
      </div>
      <div class="col mx-2 px-2 py-3 bg-blue-50 border rounded">
        <h6>in progress ✍</h6>
        <draggable class="draggable-list" :list="tasks.in_progress" group="tasks" id="2" :move="checkMove" @touchstart="showModal">
          <div v-for="(task, i) in tasks.in_progress" :key="i" v-on:click.native="showModal(task)">
            <div class="bg-white mt-3 p-2 shadow border rounded">
              <p><b>{{ task.id }}</b> {{ task.name }}</p>
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
            id="3"
            :move="checkMove"
            @touchstart="showModal"
        >
          <div v-for="(task, i) in tasks.in_review" :key="i" @click="showModal(task)" v-on:click.native="showModal(task)">
            <div class="bg-white mt-3 p-2 shadow border rounded">
              <p><b>{{ task.id }}</b> {{ task.name }}</p>
            </div>
          </div>
        </draggable>
      </div>
      <div class="col mx-2 px-2 py-3 bg-green-50 border rounded">
        <h6>completed ✅</h6>
        <draggable class="draggable-list" :list="tasks.completed" group="tasks" id="4" :move="checkMove" @touchstart="showModal">
          <div v-for="(task, i) in tasks.completed" :key="i" v-on:click.native="showModal(task)">
            <div class="bg-white mt-3 p-2 shadow border rounded">
              <p><b>{{ task.id }}</b> {{ task.name }}</p>
            </div>
          </div>
        </draggable>
      </div>
    </div>
  </div>
</template>
<script setup>
import moment from "moment";
import UnassignedTask from "../components/unassignedTask.vue";

</script>

<script>
import {VueDraggableNext} from "vue-draggable-next";
import axios from "axios";
import {Modal, Input, TheCard} from 'flowbite-vue'
import AssignedUser from "../components/AssignedUser.vue";


export default {
  components: {
    draggable: VueDraggableNext,
    Modal: Modal,
    Input: Input,
    AssignedUser: AssignedUser,
    TheCard: TheCard,
  },
  data() {
    return {
      tasks: {
        backlog: [],
        in_progress: [],
        in_review: [],
        completed: [],
      },
      isShowModal: false,
      selectedTask: null
    };
  },
  methods: {
    checkMove: function (event) {

      let taskId = event.draggedContext.element.id
      let statusId = event.to.id

      this.updateStatus(taskId, statusId);
    },
    updateDescription(event) {
      console.log(event.target.innerText)
      axios
          .put('https://solutech-tasks.test/api/tasks/' + this.selectedTask.id, {
            description: event.target.innerText,
          })
          .then((response) => this.loadPageData())

    },
    updateStatus(taskId, statusId) {
      axios
          .put('https://solutech-tasks.test/api/tasks/' + taskId, {
            status_id: statusId,
          })
          .then((response) => console.log(response))
    },
    showModal(task) {

      this.isShowModal = true
      this.selectedTask = task
    },
    closeModal() {
      this.isShowModal = false
    },
    loadPageData() {
      this.tasks = {
        backlog: [],
        in_progress: [],
        in_review: [],
        completed: [],
      };
      axios.get('https://solutech-tasks.test/api/tasks')
          .then((response) => {
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
  },
  mounted() {
    this.loadPageData()
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