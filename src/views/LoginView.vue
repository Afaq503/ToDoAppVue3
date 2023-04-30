<template>
  <img class="logo" src="../assets/logo1.png" />
  <h1>Login</h1>
  <h4>{{ error }}</h4>
  <form @submit.prevent="login">
    <label>Email:</label>
    <input type="email" required v-model="email" />
    <label>Password:</label>
    <input type="password" required v-model="password" />
    <div v-if="passwordError" class="error">
      {{ passwordError }}
    </div>

    <div class="terms">
      <input type="checkbox" v-model="terms" required />
      <label>Accept terms and conditions</label>
    </div>

    <div class="submit">
      <button>Create an account</button>
    </div>
  </form>
  <!-- <div class="login">
    <input type="email" v-model="email" required placeholder="Enter Email" />
    <input
      type="password"
      v-model="password"
      required
      placeholder="Enter Password" />
    <button @click="login">Login</button>
  </div> -->
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
      error: "",
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
      } else {
        this.error = "Email and Password is incorect";
        // console.log(this.error);
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

<style>
h4 {
  color: red;
  font-size: 17px;
  font-weight: 400;
}
</style>
