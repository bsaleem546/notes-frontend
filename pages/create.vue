<template>
  <div>
    Create
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
  methods: {
    ...mapActions({
      createNote: 'notes/createNote',
    }),

    async submit() {
      await this.createNote(this.form).then((res) => {
        this.$router.push('/')
      }).catch((err) => {
        console.log(err);
      })
    },
  }
}
</script>
