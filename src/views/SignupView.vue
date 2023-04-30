<template>
  <img class="logo" src="../assets/logo1.png" />
  <h1>Sign Up</h1>
  <form @submit.prevent="sigUp">
    <label>Name:</label>
    <input type="text" required v-model="name" />
    <label>Email:</label>
    <input type="email" required v-model="email" />
    <label>Password:</label>
    <input type="password" required v-model="password" />
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
  <p>Name: {{ name }}</p>
  <p>Email: {{ email }}</p>
  <p>Password: {{ password }}</p>
  <p>Phone: {{ phone }}</p>
  <p>Terms: {{ terms }}</p>
  <!-- <img class="logo" src="../assets/logo1.png" />
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
  </div> -->
</template>

<script>
import axios from "axios";
export default {
  name: "Signup",
  data() {
    return {
      name: "",
      // email: "",
      // password: "",
      email: "",
      password: "",
      phone: "",
      terms: false,
      passwordError: "",
      phoneError: "",
    };
  },
  methods: {
    async sigUp() {
      // if (password.length > 5) {
      //   this.passwordError ? "" : "Password must be at least 6 chars long";
      // }

      this.phoneError =
        this.phone.length > 10 ? "" : "Phone No must be 11 chars long";
      // console.warn("signUp", this.name, this.email, this.password);
      let result = await axios.post("http://localhost:3000/users", {
        name: this.name,
        email: this.email,
        password: this.password,
        phone: this.phone,
      });
      if (this.password.length > 5) {
        this.passwordError ? "" : "Password must be at least 6 chars long";
      }
      console.warn(result);
      if (result.status == 201) {
        localStorage.setItem("user-info", JSON.stringify(result.data));
        this.$router.push({ name: "TodoView" });
      }
    },

    handleSubmit() {
      // console.log("from Submitted");
      // check vlidate password
      this.passwordError =
        this.password.length > 5
          ? ""
          : "Password must be at least 6 chars long";
      this.phoneError =
        this.phone.length > 10 ? "" : "Phone No must be 11 chars long";
      // if (!this.passwordError) {
      //   console.log("email: ", this.email);
      //   console.log("password: ", this.password);
      //   console.log("phone: ", this.phone);
      //   console.log("role: ", this.role);
      //   console.log("skills: ", this.skills);
      //   console.log("terms accepted: ", this.terms);
      // }
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
</style>
