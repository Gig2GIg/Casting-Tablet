<template>
  <div class="text-purple pl-6 py-8 h-full">
    <div class="flex h-full">
      <div class="w-1/4 rounded overflow-hidden shadow-lg mr-10 h-quart">
        <div class="flex m-5">
          <img class="h-5 px-1 mt-1" src="/images/icons/auditions.png" alt="Sunset in the mountains">
          <p class="px-1"> Filter</p>
          {{search}}
        </div>
        <div class="px-6 py-4">
          <div class="font-bold text-sm mb-2 py-2">Union Status</div>
          <div class="tags w-2/5 mb-6">
            <div class="flex">
              <div
                v-for="union in union_status"
                :key="union.key"
                class="py-2 px-4 border border-purple uppercase mr-2 rounded-full cursor-pointer"
                :class="[union.selected ? 'bg-purple text-white' : 'bg-white text-purple']"
                @click="setTags($event, 'union_status', false)"
              >
                {{ union.name }}
              </div>
            </div>
          </div>
          
          <div class="font-bold text-sm mb-2 py-2">Gender</div>
          <div class="tags w-2/5">
            <div class="flex">
              <div
                v-for="gender in gender_list"
                :key="gender.key"
                class="py-2 px-4 uppercase border border-purple mr-2 rounded-full cursor-pointer"
                :class="[gender.selected ? 'bg-purple text-white' : 'bg-white text-purple']"
                @click="setTags($event, 'gender_list', false)"
              >
                {{ gender.name }}
              </div>
            </div>
          </div>
        </div>
        <div class="container flex w-full mt-3 flex-grow h-96">
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
            <card-user
              :title="item.details.first_name +' '+ item.details.last_name"
              time=""
              :image="item.image"
            />
        </div>
        <div
          v-for="item in talentList"
          :key="item.id"
          >
            <card-user
              :title="item.details.first_name +' '+ item.details.last_name"
              time=""
              :image="item.image"
            />
        </div>
        <div
          v-for="item in talentList"
          :key="item.id"
          >
            <card-user
              :title="item.details.first_name +' '+ item.details.last_name"
              time=""
              :image="item.image"
            />
        </div>
        <div
          v-for="item in talentList"
          :key="item.id"
          >
            <card-user
              :title="item.details.first_name +' '+ item.details.last_name"
              time=""
              :image="item.image"
            />
        </div>
        <div
          v-for="item in talentList"
          :key="item.id"
          >
            <card-user
              :title="item.details.first_name +' '+ item.details.last_name"
              time=""
              :image="item.image"
            />
        </div>
        <div
          v-for="item in talentList"
          :key="item.id"
          >
            <card-user
              :title="item.details.first_name +' '+ item.details.last_name"
              time=""
              :image="item.image"
            />
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
      union_status: [
        {
          value: 'any', name: 'Any', selected: false,
        },
        {
          value: 'union', name: 'Union', selected: true,
        },
        {
          value: 'nounion', name: 'Nounion', selected: false,
        },
      ],
      gender_list: [
        {
          key: 'any', name: 'Any', selected: false,
        },
        {
          key: 'male', name: 'Male', selected: true,
        },
        {
          key: 'female', name: 'Female', selected: false,
        },
      ],
    };
  },
  props: {
      search: [String]
  },
  computed: {
    ...mapState('talentDatabase', ['talentList']),
  },
  async created() {},
  async mounted() {},
  watch: {
    search: function () {
      this.currentFilter = this.search.trim();
      if(this.currentFilter != "" && this.flag == ""){
          this.flag = this.talentList;
          this.talentList = this.talentList.filter(word => word == "");
      }
    }
  },
  methods: {
    ...mapActions('talentDatabase', ['fetch']),
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
    },
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
