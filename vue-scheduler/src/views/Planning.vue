<template>
  <div>
    <div class="page-title">
      <h3>{{'Menu_planning' | localize}}</h3>
      <h4>{{info.bill | currency('RUB')}}</h4>
    </div>
    <Loader v-if="loading"/>
    <p class="center" v-else-if="!categories.length">
      {{'Message_emptyCategories' | localize}}.
      <router-link to="/categories">
      {{'Add_category' | localize}}
      </router-link>
    </p>
    <section v-else>
      <div 
        v-for="category in categories"
        :key="category.id"
      >
        <p >
          <strong>{{category.title}}</strong>
            {{category.spend | currency}} {{'From' | localize}} {{category.limit | currency}}
        </p>
        <div class="progress" v-tooltip="category.tooltip">
          <div 
            class="determinate" 
            :class="[category.colorProgress]"
            :style="{width: category.progressPercent+ '%'}">
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import currencyFilter from '@/filters/currency.filter'
import localizeFilter from '@/filters/localize.filter'

export default {
  name: "planning",
  metaInfo() {
    return {
      title: this.$title('Menu_planning')
    }
  },
  data: () => ({
    loading: true,
    categories: []
  }),
  async mounted() {
    const records = await this.$store.dispatch("fetchRecords");
    const categories = await this.$store.dispatch("fetchCategories");

    this.categories = categories.map(category => {
      const spend = records
        .filter(r => r.categoryId === category.id)
        .filter(r => r.type === 'outcome')
        .reduce((total,record) => {
          return total += +record.amount
        },0)
        const percent = 100 * spend / category.limit
        const progressPercent = percent > 100 ? 100 : percent
        const colorProgress = percent < 60
        ? 'green'
        : percent < 100
          ? 'yellow'
          : 'red'

        const tooltipValue = category.limit - spend
        const tooltip = `${tooltipValue < 0 ? 
                  localizeFilter('Excess_on')
                : localizeFilter('Left')}${currencyFilter(Math.abs(tooltipValue))}`

        return {
          ...category,
          progressPercent,
          colorProgress,
          spend,
          tooltip
        }
      
    })
    this.loading = false;
  },
  computed: {
    ...mapGetters(["info"])
  }
};
</script>
