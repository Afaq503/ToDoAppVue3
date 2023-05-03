<template>
  <Header />
  <div class="container" style="max-width: 600px">
    <h2 class="text-center mt-5">My To-Do List</h2>
    <div class="d-flex mt-5" @keyup.enter="addTask">
      <input type="text" v-model="newTask" placeholder="Enter a new task" />
      <button class="btn btn-warning rounded-0" @click="addTask">
        AddTask
      </button>
    </div>

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
            <span v-if="!task.editing">{{ task.name }}</span>
            <input
              v-else
              type="text"
              v-model="task.name"
              placeholder="Edit task" />
          </td>
          <td>
            <span
              class="pointer"
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
            <button @click="toggleEditing(task)">
              {{ task.editing ? "Save" : "Edit" }}
            </button>
          </td>
          <!-- <td class="text-center">
            <div @keyup.enter="toggleEditing(task)">
              <span
                :class="task.editing ? 'fa fa-save' : 'fa fa-pencil'"></span>
            </div>
          </td> -->
          <!-- <td>
            <button @click="deleteTask(index)">Delete</button>
          </td> -->
          <td class="text-center">
            <div @click="deleteTask(task.id)">
              <span class="fa fa-trash pointer"></span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import Header from "../components/Header.vue";
export default {
  name: "TodoView",
  components: {
    Header,
  },
  data() {
    return {
      newTask: "",
      tasks: [],
      newStatus: "todo",
      statuses: ["to-do", "in-progress", "finished"],
    };
  },
  methods: {
    async addTask() {
      if (this.newTask) {
        this.tasks.push({
          name: this.newTask,
          status: this.newStatus,
          editing: false,
        });
      }
      let alltask = await axios.post("http://localhost:3000/tasks", {
        name: this.newTask,
        status: this.newStatus,
      });
      this.newTask = "";

      localStorage.setItem("tasks", JSON.stringify(alltask.data));
    },
    toggleEditing(task) {
      task.editing = !task.editing;
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    },
    async updatetask() {
      // await axios.put("http://localhost:3000/tasks/" + this.id, this.newtask);
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    },
    deleteTask(id) {
      console.log(id);
      axios.delete("http://localhost:3000/tasks/" + id);
      this.featch();
    },
    capitalizeFirstChar(str) {
      if (!str) {
        return "";
      }
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    async changeStatus(index) {
      let newindex = this.statuses.indexOf(this.tasks[index].status);
      if (++newindex > 2) newindex = 0;
      this.tasks[index].status = this.statuses[newindex];
      console.log("States Save");
    },
    async featch() {
      let res = await axios.get("http://localhost:3000/tasks");
      this.tasks = res.data;
    },
  },
  async created() {
    if (localStorage.getItem("tasks")) {
      this.tasks = JSON.stringify(localStorage.getItem("tasks"));
    }
    this.tasks = await this.featch();
    console.log(this.tasks);
  },
  mounted() {
    let user = localStorage.getItem("user-info");

    if (!user) {
      this.$router.push({ name: "SignupView" });
    }
    this.featch();
  },
};
</script>
