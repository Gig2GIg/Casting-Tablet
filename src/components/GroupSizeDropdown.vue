<template>
    <div class="btn-group w-1/3 px-2 h-12">
        <li @click="toggleMenu()" class="text-purple rounded-full overflow-hidden w-full h-full py-3 px-6 placeholder-purple focus:outline-none border border-purple" v-if="selectedOption !== ''">
          {{selectedOption}}
          <span class="caret"></span>
        </li>

        <li @click="toggleMenu()" class="text-purple rounded-full overflow-hidden w-full h-full py-3 px-6 placeholder-purple focus:outline-none border border-purple" v-if="selectedOption === ''">
          {{placeholderText}}
          <span class="caret"></span>
        </li>

        <ul class="dropdown-menu w-full overflow-auto max-height-group" v-if="showMenu">
            <li v-for="(option,index) in options" :key="index" class="w-full h-full">
                <a href="javascript:void(0)" class="text-purple" @click="updateOption(option)">
                    {{option}}
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import axios from 'axios';

    export default {
        data() {
            return {
                selectedOption: '',
                showMenu: false,
                placeholderText: 'Group Size',
            }
        },
        props: {
            options: {
                type: [Array, Object]
            },
            selected: {},
            placeholder: [String],
            state:[Number],
            setgroupsize : {},
            online:[Number],
            audition:[Number],
            closeOnOutsideClick: {
              type: [Boolean],
              default: true,
            },
            disabled : {
              type: Boolean,
              default: false,
            }
        },  
        watch: {    
            setgroupsize: function() {            
                this.updateOption(this.setgroupsize);
            },  
        },
        async mounted() {         
          if(this.options != ""){
            this.selectedOption = this.selected;            
            // this.selectedOption = this.selectedOption.length > 0 ? this.selectedOption[0] : this.selectedOption;            
            this.$emit('setGroupSizeOption', this.selectedOption)
          }

            if (this.placeholder)
            {
                this.placeholderText = this.placeholder;
                this.$emit('setGroupSizeOption', this.selectedOption);
            }

            if (this.closeOnOutsideClick) {
              document.addEventListener('click', this.clickHandler);
            }
        },

        beforeDestroy() {
            document.removeEventListener('click', this.clickHandler);
        },

        methods: {          
            updateOption(option) {
                this.selectedOption = option;
                this.showMenu = false;
                this.$emit('updateOption', this.selectedOption);
            },

            toggleMenu() {
              if(this.disabled){
                return;
              }
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
.max-height-group {
  max-height: 250px;
}
</style>
