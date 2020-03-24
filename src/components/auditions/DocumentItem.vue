<!-- eslint-disable max-len -->
<template>
  <div class="relative rounded-lg shadow flex items-center mx-3 my-1 overflow-hidden">
    <div class="selbutton flex flex-col flex-none items-center justify-center text-white h-16 w-16">
      <svg
        v-if="icon_src == ''"
        id="noun_File_1126699"
        xmlns="http://www.w3.org/2000/svg"
        width="18.873"
        height="24.577"
        viewBox="0 0 18.873 24.577"
      >
        <path
          id="Path_12"
          data-name="Path 12"
          d="M54.537,24.4a12.939,12.939,0,0,0-1.614-1.381A1.615,1.615,0,0,0,52.4,22.9h0v3.494h3.751a.821.821,0,0,0-.131-.487C55.845,25.7,55.453,25.3,54.537,24.4Z"
          transform="translate(-39.142 -21.113)"
          fill="none"
        />
        <g
          id="Group_20"
          data-name="Group 20"
          transform="translate(0 0)"
        >
          <path
            id="Path_13"
            data-name="Path 13"
            d="M54.537,24.4a12.939,12.939,0,0,0-1.614-1.381A1.615,1.615,0,0,0,52.4,22.9h0v2.6a.937.937,0,0,0,.959.894h2.791a.821.821,0,0,0-.131-.487C55.845,25.7,55.453,25.3,54.537,24.4Z"
            transform="translate(-39.142 -21.113)"
            fill="none"
          />
          <path
            id="Path_14"
            data-name="Path 14"
            d="M40.9,24.512a3.727,3.727,0,0,0-.349-1.991,8.406,8.406,0,0,0-1.832-1.991,8.894,8.894,0,0,0-2.137-1.706,5.115,5.115,0,0,0-2.137-.325H28.685c-1.4,0-2.486,0-3.358.081a3.656,3.656,0,0,0-2.224.812,3.151,3.151,0,0,0-.872,2.072c-.087.812-.087,1.828-.087,3.128v.366h1.875v-.366a26.07,26.07,0,0,1,.087-2.925,1.824,1.824,0,0,1,.349-1.056,2.148,2.148,0,0,1,1.134-.325c.7-.081,1.744-.081,3.14-.081h3.751a.937.937,0,0,1,.959.894V23.74a1.8,1.8,0,0,0,1.875,1.747h2.835a.937.937,0,0,1,.959.894V36.9a26.07,26.07,0,0,1-.087,2.925,1.825,1.825,0,0,1-.349,1.056,2.148,2.148,0,0,1-1.134.325c-.7.081-1.7.081-3.1.081H28.685c-1.4,0-2.442,0-3.14-.081a2.148,2.148,0,0,1-1.134-.325,1.825,1.825,0,0,1-.349-1.056,26.07,26.07,0,0,1-.087-2.925V30.078H22.1v6.865c0,1.3,0,2.316.087,3.128a3.151,3.151,0,0,0,.872,2.072,3.656,3.656,0,0,0,2.224.812q1.308.122,3.4.122h5.669c1.4,0,2.486,0,3.358-.081a3.656,3.656,0,0,0,2.224-.812,3.151,3.151,0,0,0,.872-2.072c.087-.812.087-1.828.087-3.128V24.837A.42.42,0,0,0,40.9,24.512Zm-4.666-.691a.937.937,0,0,1-.959-.894v-2.6h0a.983.983,0,0,1,.523.122,8.218,8.218,0,0,1,1.614,1.381,9.38,9.38,0,0,1,1.483,1.544,1.343,1.343,0,0,1,.131.487H36.23Z"
            transform="translate(-22.056 -18.5)"
            fill="#fff"
          />
          <path
            id="Path_15"
            data-name="Path 15"
            d="M23.919,44.494a.962.962,0,0,0-1.919,0v2.275h1.875V44.494Z"
            transform="translate(-22 -33.404)"
            fill="#fff"
          />
          <path
            id="Path_16"
            data-name="Path 16"
            d="M22.2,31.975a.962.962,0,0,0,1.919,0V29.7H22.244v2.275Z"
            transform="translate(-22.113 -25.15)"
            fill="#fff"
          />
        </g>
      </svg>
      <img
        v-if="icon_src != ''"
        :src="icon_src"
        alt="Icon"
        :class="[(isImageIcon ? 'h-full w-full' : 'h-8')]"
      />
     
      <span class="mt-1" v-if="!isImageIcon">{{mediaType}}</span>
    </div>
    <span class="file-name text-purple truncate text-sm mx-4 flex-1 w-16">
      
      <li
        class="cursor-pointer py-2 px-4 hover:bg-gray-200"
        @click="$emit('renamedoc', media)"
        title="Rename Ducument"
      >
        {{ media.name }}
      </li>
    </span>

    <i
      class="material-icons absolute right-0 bottom-0 mr-1 text-purple cursor-pointer"
      @click="menuActive = !menuActive"
    >
      more_horiz
    </i>

    <ul
      v-if="menuActive"
      ref="menu"
      class="absolute right-0 bottom-0 mr-1 mb-5 shadow rounded-lg border bg-gray-100"
    >
      <li
        class="cursor-pointer py-2 px-4 hover:bg-gray-200"
        @click="$emit('destroy', media)"
      >
        Delete
      </li>
    </ul>
    

  </div>
</template>

<script>
export default {
  props: {
    media: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      icon_src: "",
      menuActive: false,
      isImageIcon : false,
    };
  },
  computed: {
    mediaType() {
      if (
        this.media.type == 1 ||
        this.media.type === "mp3" ||
        this.media.type === "audio"
      ) {
        this.icon_src = "/images/icons/music@2x.png";
        return "MP3";
      } else if (
        this.media.type == 2 ||
        this.media.type === "mp4" ||
        this.media.type === "video"
      ) {
        this.icon_src = this.media.preview ? this.media.preview : (this.media.thumbnail ? this.media.thumbnail :  "/images/icons/video@2x.png") ;
        this.isImageIcon = (this.media.preview || this.media.thumbnail) ? true : false;
        return "MP4";
      } else if (
        this.media.type == 3 ||
        this.media.type === "pdf" ||
        this.media.type === "doc"
      ) {
        this.icon_src = "/images/icons/doc-icon3x.png";
        return "PDF";
      } else if (
        this.media.type == 4 ||
        this.media.type === "image" ||
        this.media.type === "jpeg" ||
        this.media.type === "jpg" ||
        this.media.type === "png" ||
        this.media.type === "gif"
      ) {
        this.icon_src = this.media.preview ? this.media.preview : (this.media.thumbnail ? this.media.thumbnail :  "/images/icons/pic-icon@2x.png") ;
        this.isImageIcon = (this.media.preview || this.media.thumbnail) ? true : false;
        return "IMAGE";
      } else if (this.media.type == 5 || this.media.type === "sheet") {
        this.icon_src = "/images/icons/link@2x.png";
        return "URL";
      } else {
        return this.media.type;
      }
    }
  }
};
</script>

<style scoped>
.selbutton {
  background-image: linear-gradient(#4d2545, #782541);
}
</style>
