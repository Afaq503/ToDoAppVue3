<template>
  <!-- <div class="container1"> -->
  <img class="logo" src="../assets/logo1.png" />
  <h1>Sign Up</h1>
  <form @submit.prevent="sigUp">
    <label>Name:</label>
    <input type="text" required v-model="name" />
    <div v-if="nameError" class="error">
      {{ nameError }}
    </div>
    <label>Email:</label>
    <input type="email" required v-model="email" />
    <label>Password:</label>
    <input type="password" required v-model="password" autocomplete="on" />
    <div v-if="passwordError" class="error">
      {{ passwordError }}
    </div>
    <label>Phone:</label>
    <input type="phone" required v-model="phone" />
    <div v-if="phoneError" class="error">
      {{ phoneError }}
    </div>

    <div class="terms">
      <input type="checkbox" v-model="terms" required />
      <label>Accept terms and conditions</label>
    </div>

    <div class="submit">
      <button>Create an account</button>
    </div>
  </form>
  <div>
    You have already account:
    <span style="font-weight: 800"
      ><router-link to="/">Login</router-link></span
    >
  </div>
  <!-- </div> -->
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
      phone: "",
      terms: false,
      passwordError: "",
      phoneError: "",
      nameError: "",
    };
  },
  methods: {
    async sigUp() {
      if (this.name.length <= 3) {
        return (this.nameError = "Name must be at least 3 chars long");
      } else this.nameError = "";
      if (this.password.length <= 5) {
        return (this.passwordError = "Password must be at least 6 chars long");
      } else this.passwordError = "";

      if (this.phone.length <= 10) {
        return (this.phoneError = "Phone No must be 11 chars long");
      } else this.phoneError = "";
      let result = await axios.post("http://localhost:3000/users", {
        name: this.name,
        email: this.email,
        password: this.password,
        phone: this.phone,
      });

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

<style>
form {
  max-width: 420px;
  margin: 30px auto;
  background: white;
  text-align: left;
  padding: 40px;
  border-radius: 10px;
}
label {
  color: #aaa;
  display: inline-block;
  margin: 20px 0 15px;
  font-size: 0.6em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}
input,
select {
  display: block;
  padding: 10px 6px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #ddd;
  color: #555;
}
input[type="checkbox"] {
  display: inline-block;
  width: 16px;
  margin: 0 10px 0;
  position: relative;
  top: 2px;
}
.pill {
  display: inline-block;
  margin: 20px 10px 0 0;
  padding: 6px 12px;
  background: #eee;
  border-radius: 20px;
  font-size: 12px;
  letter-spacing: 1px;
  font-weight: bold;
  color: #777;
  cursor: pointer;
}
button {
  background: #0b6dff;
  border: 0;
  padding: 10px 20px;
  margin-top: 20px;
  color: white;
  border-radius: 20px;
}
.submit {
  text-align: center;
}
.error {
  color: red;
  margin-top: 10px;
  font-size: 0.8em;
  font-weight: bold;
}
/* .container1 {
  border: 1px solid black;
  margin-top: 10px;
  margin-left: 500px;
  margin-right: 500px;
} */
</style>
