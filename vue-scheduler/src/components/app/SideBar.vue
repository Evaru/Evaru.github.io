<template>
  <ul class="sidenav app-sidenav" :class="{open: value}">
    <router-link
        v-for="link in links"
        :key="link.url"
        tag="li"
        active-class="active"
        :to="link.url"
        :exact="link.exact">
      <a href="#" class="waves-effect waves-orange pointer">{{link.title}}</a>
    </router-link>
  </ul>
</template>

<script>
import localizeFilter from '@/filters/localize.filter'

export default {
    props: ['value'],
    data: () => ({
       links: [
           {title: localizeFilter('Menu_bill'), url:'/', exact:true},
           {title: localizeFilter('Menu_history'), url:'/history'},
           {title: localizeFilter('Menu_planning'), url:'/planning'},
           {title: localizeFilter('Menu_record'), url:'/record'},
           {title: localizeFilter('Menu_categories'), url:'/categories'},
       ]
   })
}
</script>
