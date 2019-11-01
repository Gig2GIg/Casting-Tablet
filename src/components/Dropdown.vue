<template>
    <div class="btn-group">
        <li @click="toggleMenu()" class="dropdown-toggle text-purple font-bold" v-if="selectedOption.round !== undefined">
          Round {{ selectedOption.round }}
          <span class="caret"></span>
        </li>

        <li @click="toggleMenu()" class="dropdown-toggle text-purple font-bold" v-if="selectedOption.round === undefined">
          {{placeholderText}}
          <span class="caret"></span>
        </li>

        <ul class="dropdown-menu" v-if="showMenu">
            <li v-for="option in options">
                <a href="javascript:void(0)" class="text-purple" @click="updateOption(option)">
                    Round {{ option.round }}
                </a>
            </li>
            <li v-if="create || state == 0">
                <a href="javascript:void(0)" class="text-purple" @click="emitCreate()">
                    + Create Round
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
    export default {
        data() {
            return {
                selectedOption: {
                  name: '',
                },
                showMenu: false,
                create: true,
                placeholderText: 'Please select an item',
            }
        },
        props: {
            options: {
                type: [Array, Object]
            },
            selected: {},
            placeholder: [String],
            state:[Number],
            closeOnOutsideClick: {
              type: [Boolean],
              default: true,
            },
        },
        computed:{
          ...mapState('round', ['rounds']),

        },
        async mounted() {
         await  this.fetch(this.$route.params.id);
          this.options = this.rounds;
          if(this.options != ""){
            this.selectedOption = this.options.filter(option => option.status == 1);
            if(this.selectedOption.length>0){
              this.create = false;
            }
            this.selectedOption = this.selectedOption.length > 0 ? this.selectedOption[0] : this.selectedOption;
            this.$emit('setOption', this.selectedOption)
          }

            if (this.placeholder)
            {
                this.placeholderText = this.placeholder;
                this.$emit('setOption', this.selectedOption);
            }

            if (this.closeOnOutsideClick) {
              document.addEventListener('click', this.clickHandler);
            }
        },

        beforeDestroy() {
            document.removeEventListener('click', this.clickHandler);
        },

        methods: {
          ...mapActions('round', ['fetch']),
            updateOption(option) {
                this.selectedOption = option;
                this.showMenu = false;
                this.$emit('updateOption', this.selectedOption);
            },

            emitCreate(){
              this.$emit('updateOption', "create");
            },

            toggleMenu() {
              this.showMenu = !this.showMenu;
            },

            clickHandler(event) {
                const { target } = event;
                const { $el } = this;

                if (!$el.contains(target)) {
                  this.showMenu = false;
                }
            },
        }
    }
</script>

<style>

.btn-group {
  min-width: 160px;
  height: 40px;
  position: relative;
  margin: 10px 1px;
  display: inline-block;
  vertical-align: middle;
}
.btn-group a:hover {
  text-decoration: none;
}

.dropdown-toggle {
  color: #636b6f;
  min-width: 160px;
  padding: 10px;
  text-transform: none;
  font-weight: 300;
  margin-bottom: 7px;
  border: 0;
  background-image: linear-gradient(#009688, #009688), linear-gradient(#D2D2D2, #D2D2D2);
  background-size: 0 2px, 100% 1px;
  background-repeat: no-repeat;
  background-position: center bottom, center calc(100% - 1px);
  background-color: transparent;
  transition: background 0s ease-out;
  float: none;
  box-shadow: none;
  border-radius: 0;
}
.dropdown-toggle:hover {
  background: #e1e1e1;
  cursor: pointer;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  float: left;
  min-width: 160px;
  padding: 5px 0;
  margin: 2px 0 0;
  list-style: none;
  font-size: 14px;
  text-align: left;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
  background-clip: padding-box;
}

.dropdown-menu > li > a {
  padding: 10px 30px;
  display: block;
  clear: both;
  font-weight: normal;
  line-height: 1.6;
  color: #333333;
  white-space: nowrap;
  text-decoration: none;
}
.dropdown-menu > li > a:hover {
  background: #efefef;
  color: #409FCB;
}

.dropdown-menu > li {
  overflow: hidden;
  width: 100%;
  position: relative;
  margin: 0;
}

.caret {
  display: relative;
  width: 0;
  position: relative;
  top: 10px;
  height: 0;
  margin-left: 2px;
  vertical-align: middle;
  border-top: 4px dashed;
  border-top: 4px solid \9;
  border-right: 4px solid transparent;
  border-left: 4px solid transparent;
  float: right;
}

li {
    list-style: none;
}
</style>
