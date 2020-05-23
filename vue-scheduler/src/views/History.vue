<template>
  <div>
    <div class="page-title">
      <h3>{{'Menu_history' | localize}}</h3>
    </div>

    <div class="history-chart">
      <canvas ref="canvas"></canvas>
    </div>
    <Loader v-if="loading"/>
    <p class="center" v-else-if="!records.length">
      {{'Empty_posts' | localize}}
      <router-link to="/record">
        {{'Add_record' | localize}}
      </router-link>
    </p>
    <section v-else>
      <HistoryTable 
        :records="items"
      />
      <Paginate 
        v-model="page"
        :pageCount="pageCount"
        :clickHandler="pageChangeHandler"
        :prevText="'Prev' | localize"
        :nextText="'Next' | localize"
        :container-class="'pagination'"
        :page-class="'waves-effect'"
      />
    </section>
  </div>
</template>

<script>
import HistoryTable from '@/components/HistoryTable'
import paginationMixin from '@/mixins/paginations.mixin'
import { Pie } from 'vue-chartjs'
import localizeFilter from '@/filters/localize.filter'

export default {
  name: 'history',
  metaInfo() {
    return {
      title: this.$title('Menu_history')
    }
  },
  extends: Pie,
  data: () => ({
    loading: true,
    records: []
  }),
  mixins: [paginationMixin],
  async mounted() {

    this.records = await this.$store.dispatch("fetchRecords");
    const categories = await this.$store.dispatch("fetchCategories");

    this.setup(categories)
    this.loading = false
    
  },
  methods: {
    setup(categories) {
      this.setupPaginations (this.records.map(record => {
        return {
          ...record,
          categoryName: categories.find(c=>c.id===record.categoryId).title,
          typeClass: record.type === 'income' ? 'green' : 'red',
          typeText: record.type === 'income'
                ? localizeFilter('Income')
                : localizeFilter('Outcome'),
        }
      }))
      this.renderChart({
        labels: categories.map(category => category.title),
        datasets: [{
            label: localizeFilter('Outcome_categories'),
            data: categories.map(category => {
              return this.records.reduce((total,record) => {
                if (record.categoryId === category.id && record.type === 'outcome') {
                  total += +record.amount
                }
                return total
              },0)
            }),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
      })
    }
  },
  components: {
    HistoryTable
  }
}
</script>
