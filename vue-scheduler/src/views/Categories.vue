<template>
  <div>
    <div class="page-title">
      <h3>{{'Menu_categories' | localize}}</h3>
    </div>
    <section>
      <Loader v-if="loading"/>
      <div class="row" v-else>
        <CategoryCreate @created="addNewCategory"/>
        <CategoryRedact
          v-if="categories.length"
          :categories="categories"
          @updated="updateCategories"
          :key="categories.length + updateCount"
        />
        <p v-else class="center">{{'Message_emptyCategories' | localize}}</p>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from '@/components/CategoryCreate'
import CategoryRedact from '@/components/CategoryRedact'
import localizeFilter from '@/filters/localize.filter'

export default {
  name: 'categories',
  metaInfo() {
    return {
      title: this.$title('Menu_categories')
    }
  },
  data: () => ({
    categories: [],
    loading: true,
    updateCount: 0
  }),
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
  },
  components: {
    CategoryRedact,CategoryCreate
  },
  methods: {
    addNewCategory(category){
      this.categories.push(category)
    },
    updateCategories(category){
      const index = this.categories.findIndex(c => c.id === category.id)
      this.categories[index].title = category.title
      this.categories[index].limit = category.limit
      this.updateCount++
    }
  }
}
</script>
