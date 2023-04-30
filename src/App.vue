<script setup></script>

<template>
  <header></header>
  <RouterView />

  <main></main>
</template>

<style>
#app {
  font-family: Arial, Helvetica, sans-serif;
  text-align: center;
  /* margin-top: 60px; */
}
body {
  padding: 0;
  margin: 0;
}
.logo {
  width: 100px;
  margin-top: 10px;
}
.register input,
.login input {
  width: 300px;
  height: 40px;
  padding-left: 20px;
  display: block;
  margin-bottom: 30px;
  margin-right: auto;
  margin-left: auto;
  border: 1px solid skyblue;
}
.register button,
.login button {
  width: 320px;
  height: 40px;
  border: 1px solid skyblue;
  background: skyblue;
  color: "#fff";
  cursor: pointer;
  /* border-radius: 10px; */
}
</style>
