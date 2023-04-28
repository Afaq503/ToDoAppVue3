<template>
  <img class="logo" src="../assets/logo1.png" />
  <h1>Login</h1>
  <div class="login">
    <input type="email" v-model="email" required placeholder="Enter Email" />
    <input
      type="password"
      v-model="password"
      required
      placeholder="Enter Password" />
    <button @click="login">Login</button>
  </div>
  <div>
    You have not account:
    <span style="font-weight: 800"
      ><router-link to="/signup">Sign Up</router-link></span
    >
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      let result = await axios.get(
        `http://localhost:3000/users?email=${this.email}&password=${this.password}`
      );
      if (result.status == 200 && result.data.length > 0) {
        localStorage.setItem("user-info", JSON.stringify(result.data[0]));
        this.$router.push({ name: "TodoView" });
      }
    },
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    if (user) {
      this.$router.push({ name: "TodoView" });
    }
  },
};
</script>

<style></style>
