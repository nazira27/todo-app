<template>
  <div class="banner">
    <v-container>
      <v-row class="mt-5">
        <div style="width: 100%">
          <v-btn
            v-if="!show"
            rounded
            color="primary"
            large
            class="mx-2 started mt-5 mb-5"
            @click="getUsers"
          >
            Показать пользователей
          </v-btn>
          <router-link :to="{ name: `addUsers` }">
            <v-btn
              v-if="show"
              rounded
              color="primary"
              large
              class="mx-2 started mt-5 mb-5"
              style="float: right"
            >
              Добавить <v-icon>mdi-plus</v-icon>
            </v-btn>
          </router-link>
        </div>
        <v-row v-if="show">
          <v-col cols="12" md="12">
            <h2 v-if="show">Список пользователей</h2>
          </v-col>
          <v-col cols="12" md="3">
            <v-select
              v-model="value"
              v-if="show"
              :items="filters"
              :item-text="filters.text"
              :item-value="filters.value"
              label="Фильтр по userId"
              outlined
              rounded
              dense
              @change="getUserById()"
            ></v-select>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="search.title"
              single-line
              outlined
              rounded
              dense
              label="Фильтр по title"
              @change="searchInTitle"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="search.body"
              single-line
              outlined
              rounded
              dense
              label="Фильтр по body"
              @change="searchInBody"
            ></v-text-field>
          </v-col>
        </v-row>

        <!-- <v-data-table
          v-if="show && users.length && !filter"
          :headers="headers"
          :items="users"
        >
          <template v-slot:item.edit="{ item }">
            <v-btn color="primary" dark fab small @click="editItem(item)">
              <v-icon>mdi-lead-pencil</v-icon>
            </v-btn>
          </template>
          <template v-slot:item.delete="{ item }">
            <v-btn @click="handleDelete(item)" color="pink" dark fab small>
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-data-table> -->
        <v-data-table
          v-if="show && items.length"
          :headers="headers"
          :items="items"
          class="elevation-1"
        >
          <template v-slot:item.edit="{ item }">
            <v-btn color="primary" dark fab small @click="editItem(item)">
              <v-icon>mdi-lead-pencil</v-icon>
            </v-btn>
          </template>
          <template v-slot:item.delete="{ item }">
            <v-btn @click="handleDelete(item)" color="pink" dark fab small>
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Banner",
  data() {
    return {
      filter: false,
      search: {
        title: "",
        body: "",
        resultTitle: [],
        resultBody: [],
      },
      query: {},
      value: "",
      show: false,
      headers: [
        {
          text: "UserId",
          align: "start",
          sortable: false,
          value: "userId",
        },
        { text: "Title", value: "title" },
        { text: "Body", value: "body" },
        { text: "Edit", value: "edit", sortable: false },
        { text: "Delete", value: "delete", sortable: false },
      ],
      filters: [
        { text: "all", value: 0 },
        { text: "1", value: 1 },
        { text: "2", value: 2 },
        { text: "3", value: 3 },
        { text: "4", value: 4 },
        { text: "5", value: 5 },
        { text: "6", value: 6 },
        { text: "7", value: 7 },
        { text: "8", value: 8 },
        { text: "9", value: 9 },
        { text: "10", value: 10 },
      ],
      items: []
    };
  },
  computed: {
    ...mapGetters(["users"]),
  },
  watch: {
    users(value) {
      this.items = value
    }
  },
  methods: {
    ...mapActions(["usersList"]),
    searchInBody() {
      this.search.resultBody = []
      let toSearch = this.search.body
      for (var i = 0; i < this.users.length; i++) {
          if (this.users[i].body.indexOf(toSearch) != -1) {
            console.log(toSearch)
            this.search.resultBody.push(this.users[i]);
          }
      }
      this.items = this.search.resultBody
      console.log(this.items, this.show, 'search')
    },
    searchInTitle() {
      this.search.resultTitle = []
      let toSearch = this.search.title
      for (var i = 0; i < this.users.length; i++) {
          if (this.users[i].title.indexOf(toSearch) != -1) {
            console.log(toSearch)
            this.search.resultTitle.push(this.users[i]);
          }
      }
      this.items = this.search.resultTitle
      console.log(this.items, 'search',  this.show)
    },
    getUserById() {
      this.items = [];
      let userId = this.value;
      if (userId === 0) {
        this.query = {};
        this.usersList(this.query);
      } else {
        this.query = { userId: userId };
        this.usersList(this.query);
      }
      this.show = true;
    },
    async getUsers() {
      await this.usersList(this.query);
      this.show = true;
    },
    editItem(item) {
      this.$router.push({
        name: "addUsers",
        params: { item: item },
        query: { edit: true },
      });
    },
    handleDelete(item) {
      let deleteIndex = this.users.indexOf(item);
      // this.items.splice(deleteIndex, 1)
      this.users.splice(deleteIndex, 1);
    },
  },
  mounted() {
    if (this.$route.query.show) {
      this.show = this.$route.query.show;
    }
  },
};
</script>
<style lang="scss">
.vue-typer .custom.typed {
  color: white;
}
</style>
<style scoped>
h1 {
  z-index: 10000;
}
p {
  z-index: 10000;
}
.banner {
  min-height: 70vh;
}
.banner >>> .v-image__image--cover {
  filter: brightness(0.5);
}
.banner {
  position: relative;
  background-repeat: no-repeat;
}

.main {
  margin-top: 20%;
}
.banner:before {
  filter: brightness(0.5);
}
.text-center {
  text-align: center;
}
</style>
