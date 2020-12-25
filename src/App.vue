<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script>
export default {
  name: "app",
  components: {},
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
  },
  methods: {},
  mounted() {},
};
</script>

<style lang="scss">
@import "styles/App.scss";
@media only screen and (max-width: 600px) {
  main {
    padding: 0 !important;
  }
}
</style>
