<template>
  <v-container>
    <v-form @submit.prevent="handleSubmit" method="post" ref="form">
      <v-row>
        <router-link to="/">
          <v-icon>mdi-keyboard-backspace</v-icon>
        </router-link>
        <v-col cols="12" sm="12">
          <h2>Данные пользователя</h2>
          <h3>Title</h3>
          <v-text-field
            v-model="form.title"
            single-line
            outlined
            rounded
            filled
          ></v-text-field>
          <h3>Body</h3>
          <v-text-field
            v-model="form.body"
            single-line
            outlined
            rounded
            filled
          ></v-text-field>
          <v-btn
            rounded
            color="primary"
            type="submit"
            :loading="isLoading"
            block
            large
            class="subtitle-1"
            >{{ method === "post" ? "Submit" : "Edit" }}</v-btn
          >
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "AddUsers",
  data() {
    return {
      editIndex: "",
      show: true,
      isLoading: false,
      form: {
        title: "",
        body: "",
        id: "",
        userId: 11,
      },
      method: "post",
    };
  },
  computed: {
    ...mapGetters(["users"]),
  },
  methods: {
    handleSubmit() {
      if (this.method === "put") {
        this.users[this.editIndex] = this.form
        // fetch("https://jsonplaceholder.typicode.com/posts/1", {
        //   method: "PUT",
        //   body: JSON.stringify({
        //     id: this.form.id,
        //     title: this.form.title,
        //     body: this.form.body,
        //     userId: this.form.userId,
        //   }),
        //   headers: {
        //     "Content-type": "application/json; charset=UTF-8",
        //   },
        // })
        //   .then((response) => response.json())
        //   .then((json) => console.log(json));
      } else {
        this.users.push(this.form);
        // fetch("https://jsonplaceholder.typicode.com/posts", {
        //   method: "POST",
        //   body: JSON.stringify({
        //     title: this.form.title,
        //     body: this.form.body,
        //     userId: 1,
        //   }),
        //   headers: {
        //     "Content-type": "application/json; charset=UTF-8",
        //   },
        // }).then((response) => response.json());
      }

      this.$router.push({
        path: "/",
        query: { show: true },
      });
    },
  },
  mounted() {
    if (this.$route.query.edit) {
      this.item = this.$route.params.item;
      this.form = this.$route.params.item;
      this.editIndex = this.users.indexOf(this.item);
      this.method = "put";
    }
  },
};
</script>
<style scoped>
a {
  text-decoration: none;
}
</style>
