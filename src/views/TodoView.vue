<template>
  <Header />
  <div class="container" style="max-width: 600px">
    <!-- heading Start -->
    <h2 class="text-center mt-5">My TODO App</h2>
    <!-- input -->
    <div class="d-flex mt-5" @keyup.enter="submitTask">
      <input
        type="text"
        v-model="task"
        placeholder="Enter Task"
        class="w-100 form control" />
      <button class="btn btn-warning rounded-0" @click="submitTask">
        Submit
      </button>
    </div>
    <!-- Task Table  -->
    <table class="table table-bordered mt-5">
      <thead>
        <tr>
          <th scope="col">Task</th>
          <th scope="col" style="width: 120px">Status</th>
          <th scope="col" class="text-center">Edit</th>
          <th scope="col" class="text-center">Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(task, id) in tasks" :key="id">
          <td>
            <span :class="{ 'line-through': task.status === 'finished' }">
              {{ task.name }}
            </span>
          </td>
          <td>
            <span
              class="pointer noselect"
              @click="changeStatus(id)"
              :class="{
                'text-danger': task.status === 'to-do',
                'text-success': task.status === 'finished',
                'text-warning': task.status === 'in-progress',
              }">
              {{ capitalizeFirstChar(task.status) }}
            </span>
          </td>
          <td class="text-center">
            <div @click="editTask(id)">
              <span class="fa fa-pen pointer"></span>
            </div>
          </td>
          <td class="text-center">
            <div @click="deleteTask(id)">
              <span class="fa fa-trash pointer"></span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import axios from "axios";

export default {
  name: "TodoView",
  components: {
    Header,
  },
  props: {
    msg: String,
  },
  mounted() {
    let user = localStorage.getItem("user-info");

    if (!user) {
      this.$router.push({ name: "SignupView" });
    }
  },
  data() {
    return {
      task: "",
      status: "",
      editedTask: null,

      statuses: ["to-do", "in-progress", "finished"],
      tasks: [],
    };
  },
  methods: {
    capitalizeFirstChar(str) {
      if (!str) {
        return "";
      }
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    changeStatus(id) {
      let newid = this.statuses.indexOf(this.tasks[id].status);
      if (++newid > 2) newid = 0;
      this.tasks[id].status = this.statuses[newid];
    },

    //submit task
    async submitTask() {
      if (this.tasks.length === 0) return;

      if (this.editedTask != null) {
        this.tasks[this.editedTask].name = this.tasks;
        this.editedTask = null;
      } else {
        this.tasks.push({
          name: this.task,
          status: "todo",
        });
      }
      let alltask = await axios.post("http://localhost:3000/tasks", {
        name: this.task,
      });
      this.task = "";
      localStorage.setItem("user-tasks", JSON.stringify(alltask.data));
    },
    //edit Task
    // editTask(id) {
    //   this.tasks = this.task[id].name;
    //   this.editedTask = id;
    // },
    editTask(id) {
      this.task = this.tasks[id].name;
      this.status = this.tasks[id].status;
      this.editedTask = id;
    },
    updateTask() {
      this.tasks[this.editedTask].name = this.task;
      this.tasks[this.editedTask].status = this.status;
      localStorage.setItem("tasks", JSON.parse(this.tasks));
      this.task = "";
      this.status = "";
      this.editedTask = null;
    },
    // delete Task
    deleteTask(id) {
      this.tasks.splice(id, 1);
      // localStorage.setItem("user-tasks", JSON.stringify(this.tasks));
      localStorage.removeItem("user-tasks");
    },
    async featch() {
      const res = await fetch("http://localhost:3000/tasks");
      const data = await res.json();
      return data;
    },
  },
  async created() {
    this.tasks = await this.featch();
    console.log(this.tasks);
  },
};
</script>

<style>
.pointer {
  cursor: pointer;
}
.noselect {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.line-through {
  text-decoration: line-through;
}
</style>
