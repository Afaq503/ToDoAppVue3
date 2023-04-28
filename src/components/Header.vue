<template>
  <div class="nav">
    <img class="logo1" src="../assets/logo1.png" />
    <a href="#">ToDo</a>
    <a href="#">Login</a>
    <a href="#">Sing Up</a>
    <a @click="logout" href="#">Logout</a>
  </div>
</template>

<script>
export default {
  name: "Header",
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push({ name: "LoginView" });
    },
  },
};
</script>

<style>
.nav {
  background-color: skyblue;
  overflow: hidden;
}
.nav a {
  float: left;
  color: "#f2f2f2f2";
  padding: 14px 16px;
  text-align: center;
  font-size: 17px;
  text-decoration: none;
  margin-right: 5px;
}
.nav a:hover {
  background: blue;
  color: white;
}
.nav .logo1 {
  width: 50px;
  height: 50px;
  margin: 5px;
  border-radius: 20px;
}
</style>
