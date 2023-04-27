<template>
  <div class="container" style="max-width: 600px">
    <!-- heading Start -->
    <h2 class="text-center mt-5">My Vue TODO App</h2>
    <!-- input -->
    <div class="d-flex mt-5">
      <input
        type="text"
        v-model="task"
        placeholder="Enter Task"
        class="w-100 form conttrol" />
      <button class="my-8">Submit</button>
    </div>
    <!-- Task Table  -->
    <table class="table table-bordered">
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
          <!-- <td>{{ task.name }}</td> -->
          <td>
            <span :class="{ 'line-through': task.status === 'finished' }">{{
              task.name
            }}</span>
          </td>
          <td>
            <span
              class="pointer select"
              @click="changeStatus(index)"
              :class="{
                'text-danger': task.status === 'to-do',
                'text-success': task.status === 'to-do',
                'text-warning': task.status === 'to-do',
              }"></span>
          </td>
          <td class="text-center">
            <div @click="deleteTask(index)">
              <span class="fa fa-pen pointer"></span>
            </div>
          </td>
          <td class="text-center">
            <div @click="deleteTask(index)">
              <span class="fa fa-trash pinter"></span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "TodoView",
  props: {
    msg: String,
  },
  data() {
    return {
      task: "",
      editedTask: null,
      statuses: ["to-do", "in-progress", "finished"],
      tasks: [
        {
          name: "hy sdfhsi",
          status: "to-do",
        },
        {
          name: "hy jkbdhsjkhdkjh",
          status: "in-progress",
        },
        {
          name: "hy sdfhsi",
          status: "finished",
        },
      ],
    };
  },
  methods: {
    capitalizeFirstChaet(str) {
      return str.chartAt(0).toUppercase() + str.slice(1);
    },
    changeStatus(index) {
      let newIndex = this.statuses.indexOf(this.task[index].status);
      if (++newIndex > 2) newIndex = 0;
      this.tasks[index].status = this.statuses[newIndex];
    },
  },
};
</script>

<style>
.pointer {
  cursor: pointer;
}
.noselect {
}
</style>
