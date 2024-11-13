<template>
  <div>
    <div class="container">
      <div>
        <input type="text" placeholder="Search" v-model="params.search" @change="search()">
        <nuxt-link to="/create">Create</nuxt-link>
        <div class="row">
          <table>
            <thead>
              <th>ID</th>
              <th>Title</th>
              <th>Content</th>
              <th>Actions</th>
            </thead>
            <tbody>
              <tr v-for="(note, index) in notes" :key="index">
                <td>{{ note?.id }}</td>
                <td>{{ note?.title }}</td>
                <td>{{ note?.content }}</td>
                <td>
                  <nuxt-link :to="`/${note?.id}`">Edit</nuxt-link>
                  <button type="button" @click="destroying(note?.id)">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  mapGetters,
  mapActions
} from 'vuex'

export default {
  data() {
    return {
      params: {
        page: 1,
        search: ''
      }
    }
  },

  computed: {
    ...mapGetters({
      notes: 'notes/notes',
    }),
  },

  mounted() {
    this.getData();
    console.log('working');
  },

  methods: {
    ...mapActions({
      fetchNotes: 'notes/fetchNotes',
      deleteNote: 'notes/deleteNote',
    }),

    async destroying(id) {
      await this.deleteNote(id).then((res) => {
        console.log('DELETED');
        this.getData();
      }).catch((err) => {
        console.log(err);
      })
    },

    search() {
      console.log('search');
      this.getData();
    },

    async getData() {
      await this.fetchNotes(this.params)
    }
  },
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: block;
  /* justify-content: center;
  align-items: center; */
  text-align: center;
  margin: 50px;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

.row {
  display: block;
}
</style>
