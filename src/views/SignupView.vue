<template>
  <img class="logo" src="../assets/logo1.png" />
  <h1>Sign Up</h1>
  <div class="register">
    <input type="text" v-model="name" required placeholder="Enter Name" />
    <input type="email" v-model="email" required placeholder="Enter Email" />
    <input
      type="password"
      v-model="password"
      required
      placeholder="Enter Password" />
    <button @click="sigUp">Sign Up</button>
  </div>
  <div>
    You have already account:
    <span style="font-weight: 800"
      ><router-link to="/">Login</router-link></span
    >
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Signup",
  data() {
    return {
      name: "",
      email: "",
      password: "",
    };
  },
  methods: {
    async sigUp() {
      console.warn("signUp", this.name, this.email, this.password);
      let result = await axios.post("http://localhost:3000/users", {
        name: this.name,
        email: this.email,
        password: this.password,
      });
      console.warn(result);
      if (result.status == 201) {
        localStorage.setItem("user-info", JSON.stringify(result.data));
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
