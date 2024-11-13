<template>
  <div>
    Edit
    <br>
    <div>
      <div>
        <label for="">Title</label>
        <input type="text" v-model="form.title">
      </div>
      <div>
        <label for="">content</label>
        <input type="text" v-model="form.content">
      </div>
      <div>
        <button type="button" @click="submit()">Submit</button>
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
      form: {
        title: '',
        content: '',
      }
    }
  },

  mounted() {
    this.getData()
  },

  methods: {
    ...mapActions({
      fetchNote: 'notes/fetchNote',
      updateNote: 'notes/updateNote',
    }),

    async getData() {
      await this.fetchNote(this.$route.params.id).then((res) => {
        this.form.title = res?.title
        this.form.content = res?.content
      }).catch((err) => {
        console.log(err);
      })

    },

    async submit() {
      let payload = {
        id: this.$route.params.id,
        title: this.form.title,
        content: this.form.content,
      }
      await this.updateNote(payload).then((res) => {
        this.$router.push('/')
      }).catch((err) => {
        console.log(err);
      })
    },
  }
}
</script>
