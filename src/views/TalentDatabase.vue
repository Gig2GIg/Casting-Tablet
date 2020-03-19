<template>
  <div class="text-purple pl-6 py-8 h-full">
    <div class="flex h-full">
      <div class="w-1/4 rounded overflow-hidden shadow-lg mr-10 h-quart">
        <div class="flex m-5">
          <img class="h-5 px-1 mt-1" src="/images/icons/auditions.png" alt="Sunset in the mountains">
          <p class="px-1"> Filter</p>
        </div>
        <div class="px-6 py-4">
          <div class="font-bold text-sm mb-2 py-2">Union Status</div>
          <div class="tags w-2/5 mb-6 w-full">
            <div class="flex flex-wrap w-full">
              <div
                v-for="union in union_status"
                :key="union.key"
                class="py-2 px-4 border border-purple uppercase mr-2 rounded-full cursor-pointer mb-2"
                :class="[union.selected ? 'bg-purple text-white' : 'bg-white text-purple']"
                @click="setTags($event, 'union_status', false)"
              >
                {{ union.name }}
              </div>
            </div>
          </div>

          <div class="font-bold text-sm mb-2 py-2">Gender</div>
          <div class="tags w-2/5 w-full">
            <div class="flex flex-wrap w-full">
              <div
                v-for="gender in gender_list"
                :key="gender.key"
                class="py-2 px-4 uppercase border border-purple mr-2 rounded-full cursor-pointer mb-2"
                :class="[gender.selected ? 'bg-purple text-white' : 'bg-white text-purple']"
                @click="setTags($event, 'gender_list', false)"
              >
                {{ gender.name }}
              </div>
            </div>
          </div>
        </div>
        <div class="container flex w-full mt-3 flex-grow h-96 cursor-pointer" @click="filterData">
          <div class="flex w-full text-center justify-center content-center flex-wrap">
            <div class="m-3 content-center rounded-full red-light w-40 h-10 flex items-center button-detail">
                <p class="text-white text-sm font-bold content-center tracking-tighter flex-1">Search</p>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-wrap w-9/12 content-start">
        <div
          v-for="item in talentList"
          :key="item.id"
          >
          <router-link :to="{ name: 'talent/user', params: {id: item.details.user_id, image: item.image, code: encyCode(item.share_code)} }">
            <card-user
              :title="item.details && item.details.first_name ? item.details.first_name +' '+ item.details.last_name : ''"
              time=""
              :image="item.image"
              class="relative"
            />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import { debug } from 'util';

export default {
  data() {
    return {
      flag:"",
      isLoading: true,
      currentFilter:this.search,
      selectedGender:{
          key: 'male', name: 'male', selected: true,
      },
      selectedUnion:{
          value: '1', name: 'UNION', selected: true,
      },
      union_status: [
        {
          value: '0', name: 'ANY', selected: false,
        },
        {
          value: '1', name: 'UNION', selected: true,
        },
        {
          value: '2', name: 'Non Union', selected: false,
        },
      ],
      gender_list: [
        {
          key: 'ANY', name: 'any', selected: false,
        },
        {
          key: 'male', name: 'male', selected: true,
        },
        {
          key: 'female', name: 'female', selected: false,
        },
      ],
    };
  },
  props: {
      search: [String],
      reload: [Number],
  },
  computed: {
    ...mapState('talentDatabase', ['talentList']),
  },
  async created() {},
  async mounted() {
    this.fetch();
  },
  watch: {
    reload: function () {
      this.fetch();
    }
  },
  methods: {
    ...mapActions('talentDatabase', ['fetch', 'filter']),
    setTags({ target }, type, multiple = false) {
      const text = target.textContent.trim();
      const itemSelected = this[type].find(item => item.name === text);
      if (multiple) {
        if (itemSelected.selected) {
          itemSelected.selected = false;
          return;
        }
        itemSelected.selected = true;
        return;
      }

      this[type].forEach(item => item.selected = false);
      itemSelected.selected = true;
      if(type == 'gender_list'){
        this.selectedGender = itemSelected;
        return;
      }
      this.selectedUnion = itemSelected;
      return;
    },
    encyCode(code){
      return window.btoa(code);
    },
    async filterData(){
      let data = {
        base: this.search,
        union: this.selectedUnion.value,
        gender: this.selectedGender.key,
      }
      await this.filter(data);
    }
  },
};
</script>
<style scoped>
@media (min-width: 1280px){
  .container {
      max-width: 900px;
  }
}
</style>
