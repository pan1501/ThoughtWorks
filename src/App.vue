
<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<template>
  <div>
    <Input/>
    <ButtonSection/>
    <Output/>
  </div>
</template>

<script>
import Input from "./components/Input.vue";
import Output from "./components/Output.vue";
import ButtonSection from "./components/ButtonSection.vue";

export default {
  name: "app",
  components: {
    Input,
    Output,
    ButtonSection
  }
};
</script>
