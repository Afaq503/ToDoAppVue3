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
        <tr v-for="(task, index) in tasks" :key="index">
          <td>
            <span :class="{ 'line-through': task.status === 'finished' }">
              {{ task.name }}
            </span>
          </td>
          <td>
            <span
              class="pointer noselect"
              @click="changeStatus(index)"
              :class="{
                'text-danger': task.status === 'to-do',
                'text-success': task.status === 'finished',
                'text-warning': task.status === 'in-progress',
              }">
              {{ capitalizeFirstChar(task.status) }}
            </span>
          </td>
          <td class="text-center">
            <div @click="editTask(index)">
              <span class="fa fa-pen pointer"></span>
            </div>
          </td>
          <td class="text-center">
            <div @click="deleteTask(index)">
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
      tasks: [
        // {
        //   name: "hy sdfhsi",
        //   status: "to-do",
        // },
        // {
        //   name: "hy jkbdhsjkhdkjh",
        //   status: "in-progress",
        // },
        // {
        //   name: "hy sdfhsi",
        //   status: "finished",
        // },
      ],
    };
  },
  methods: {
    capitalizeFirstChar(str) {
      return str.charAt(0) + str.slice(1);
    },
    changeStatus(index) {
      let newIndex = this.statuses.indexOf(this.tasks[index].status);
      if (++newIndex > 2) newIndex = 0;
      this.tasks[index].status = this.statuses[newIndex];
    },
    //edit Task
    editTask(index) {
      this.task = this.tasks[index].name;
      this.editedTask = index;
    },
    // delete Task
    deleteTask(index) {
      this.tasks.splice(index, 1);
    },
    //submit task
    async submitTask() {
      // let tasks = JSON.parse(localStorage.getItem("tasks"));
      if (this.task.length === 0) return;

      if (this.editedTask != null) {
        this.tasks[this.editedTask].name = this.task;
        this.editedTask = null;
      } else {
        this.tasks.push({
          name: this.task,
          status: "todo",
        });
      }
      // localStorage.setItem("task", JSON.stringify(this.tasks));
      let alltask = await axios.post("http://localhost:3000/task", {
        task: this.task,
      });
      this.task = "";

      if (alltask.status == 201) {
        localStorage.setItem("user-tasks", JSON.stringify(alltask.data));
        // this.$router.push({ name: "TodoView" });
      }
    },
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
