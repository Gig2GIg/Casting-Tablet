<template>
  <div>
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :on-cancel="onCancel"
      :is-full-page="fullPage"
    ></loading>
    <p class="text-2xl">
      Create Your Account
    </p>

    <form
      class="w-full max-w-xs mt-16"
      @submit.prevent="step === 3 ? handleRegister() : nextStep()"
    >
      <template v-if="step === 1">
        <base-input
          v-model="form.first_name"
          v-validate="'required|max:255'"
          name="first_name"
          placeholder="First Name"
          :message="errors.first('first_name')"
          data-vv-as="first name"
        />

        <base-input
          v-model="form.last_name"
          v-validate="'required|max:255'"
          name="last_name"
          placeholder="Last Name"
          :message="errors.first('last_name')"
          data-vv-as="last name"
        />

        <base-input
          v-model="form.email"
          v-validate="'required|email'"
          name="email"
          placeholder="Email"
          :message="errors.first('email')"
        />

        <base-input
          ref="password"
          v-model="form.password"
          v-validate="'required|min:8'"
          name="password"
          type="password"
          placeholder="Password"
          :message="errors.first('password')"
          autocomplete="false"
        />

        <base-input
          v-model="form.password_confirmation"
          v-validate="'required|confirmed:password'"
          name="password_confirmation"
          type="password"
          placeholder="Re-enter Password"
          :message="errors.first('password_confirmation')"
          data-vv-as="password"
          autocomplete="false"
        />
      </template>

      <template v-else-if="step === 2">
        <base-input
          key="address1-input"
          v-model="form.address1"
          v-validate="'required|max:255'"
          name="address1"
          placeholder="Address Line 1"
          :message="errors.first('address')"
        />
        <base-input
          key="address2-input"
          v-model="form.address2"
          v-validate="'required|max:255'"
          name="address2"
          placeholder="Address Line 2"
          :message="errors.first('address2')"
        />

        <base-input
          key="city-input"
          v-model="form.city"
          v-validate="'required|max:255'"
          name="city"
          placeholder="City"
          :message="errors.first('city')"
        />

        <div class="flex items-start w-full">
          <base-select
            key="state-input"
            v-model="form.state"
            v-validate="'required'"
            name="state"
            class="w-2/5"
            placeholder="State"
            :message="errors.first('state')"
          >
            <option
              v-for="state in states"
              :key="state.value"
              :value="state.value"
            >
              {{ state.label }}
            </option>
          </base-select>
          <base-input
            key="zip-input"
            v-model="form.zip"
            v-validate="'required|integer|max:5'"
            v-mask="'#####'"
            name="zip"
            class="w-3/5 ml-4"
            placeholder="Zip"
            :message="errors.first('zip')"
          />
        </div>

        <!-- <base-input
          key="birth-input"
          v-model="form.birth"
          v-validate="'required'"
          name="birth"
          type="date"
          placeholder="Birth Date"
          :message="errors.first('birth')"
          data-vv-as="birth date"
        /> -->
      </template>

      <template v-else>
        <div
          v-if="!preview"
          class="flex items-center rounded-full bg-white h-32 w-32 mx-auto mb-6 cursor-pointer"
          @click="$refs.inputFile.click()"
        >
          <img
            src="/images/icons/upload.png"
            alt="Upload"
            class="h-16 mx-auto ml-8 -mt-2"
          >
        </div>

        <img
          v-else
          :src="preview"
          alt="Image"
          class="rounded-full h-32 w-32 mx-auto mb-6 cursor-pointer"
          @click="$refs.inputFile.click()"
        >

        <input
          ref="inputFile"
          accept=".png, .jpg, .jpeg"
          type="file"
          hidden
          @change="handleImage"
        >

        <base-input
          v-model="form.agency_name"
          v-validate="'required|max:255'"
          name="agency_name"
          placeholder="Agency Name"
          :message="errors.first('agency_name')"
          data-vv-as="agency name"
        />

        <base-input
          v-model="form.profesion"
          v-validate="'required|max:255'"
          name="profesion"
          placeholder="Job Title"
          :message="errors.first('profesion')"
          data-vv-as="job title"
        />
        <base-select
            key="gender-input"
            v-model="form.gender"
            v-validate="'required'"
            name="gender"
            class="w-full"
            placeholder="Gender"
            :message="errors.first('gender')"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </base-select>
      </template>

      <base-button
        class="mt-16"
        type="submit"
        expanded
      >
        Next
      </base-button>
    </form>
    <modal class="flex flex-col w-full items-center my-info-mdel" :width="1000" name="modal_crop_image">
      <div class="content my-info-content" ng-if="imgSrc">
        <section class="cropper-area">
          <div class="img-cropper">
            <vue-cropper
              ref="cropper"
              :aspect-ratio="9/9"
              :initial-aspect-ratio="1/1"
              :src="imgSrc"
              preview=".preview"
              drag-mode="crop"
              :minCropBoxWidth="minHeight"
              :minCropBoxHeight="minWidth"
              :auto-crop-area="0.5"
              alt="Profile Picture"
              :img-style="{ 'width': '400px', 'height': '300px' }"
            />
          </div>
          <div class="actions">            
            <a
              href="#"
              role="button"
              @click.prevent="cropImage"
            >
              Crop
            </a>
            <a
              href="#"
              role="button"
              @click.prevent="reset"
            >
              Reset
            </a>            
            <a
              href="#"
              role="button"
              @click.prevent="showFileChooser"
            >
              Upload New Image
            </a>
            <a
              href="#"
              role="button"
              @click.prevent="cropImageDone"
            >
              Done
            </a>
            <a
              href="#"
              role="button"
              @click.prevent="cropImageCancel"
            >
              Cancel
            </a>
          </div>
          
        </section>
        <section class="preview-area">
          <p>Image Preview</p>
          <div class="preview" />
          <p>Cropped Image</p>
          <div class="cropped-image">
            <img
              v-if="cropImg"
              :src="cropImg"
              alt="Cropped Profile"
            />
            <div v-else class="crop-placeholder" />
          </div>
        </section>
      </div>
    </modal>
  </div>
</template>

<script>
import Vue from "vue";
import AuthService from '@/services/AuthService';
import states from '@/utils/states';
import DEFINE from '../../utils/const.js';
import { mapActions } from 'vuex';
// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
Vue.use(Loading);


import firebase from 'firebase/app';
import 'firebase/messaging';
import axios from "axios";

import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';

export default {
  components: {
    Loading,
    VueCropper
  },
  data() {
    return {
      form: {},
      step: 1,
      isLoading: false,
      fullPage: true,
      preview: null,
      states,
      imgSrc : null,
      updatedImageFile : null,
      updatedImageBlob : null,
      cropImg: '',
      data: null,
      minHeight : Number(200),
      minWidth : Number(200),
    };
  },
  methods: {
    ...mapActions('auth', ['login']),
    async nextStep() {
      if (await this.$validator.validateAll()) {
        this.step += 1;
      }
    },

    handlePlace(place) {
      this.form.location = `${place.geometry.location.lat()}, ${place.geometry.location.lng()}`;
    },

    handleImage(e) {
      const file = e.target.files[0];
      if (file.type.indexOf('image/') === -1) {
        this.$toasted.error("Please select an image file");
        return;
      }
      if (typeof FileReader === 'function') {
        this.cropImg = null;
        this.updatedImageBlob = null;
        this.updatedImageFile = file;
        const reader = new FileReader();
        reader.onload = (event) => {
          this.imgSrc = event.target.result;
          // rebuild cropperjs with the updated source
          if(this.$refs.cropper){           
            this.$refs.cropper.replace(event.target.result);
            this.reset();
          }       
          this.$modal.show('modal_crop_image');
          
        };
        reader.readAsDataURL(file);
      } else {
        this.$toasted.error("Something went to wrong, please try again!");
      }

    },

    async handleRegister() {
      try {
        if (this.isLoading || !await this.$validator.validateAll()) {
          return;
        }

        if(this.updatedImageBlob && this.updatedImageFile){
          this.updatedImageBlob.name = this.updatedImageFile.name;
          this.form.image = this.updatedImageBlob;
        } else {
          this.form.image = null;
        }
        // Validate image
        if (!this.form.image) {
          this.$toasted.error('The image field is required.');
          return;
        }

        // Validate location
        // if (!this.form.location) {
        //   this.$toasted.error('The location selected is invalid.');
        //   return;
        // }

        this.isLoading = true;
        this.form.address = `${this.form.address1} ${this.form.address2}`
        delete this.form.address1;
        delete this.form.address2;
        await AuthService.register(this.form);
        await this.login({
          email: this.form.email,
          password: this.form.password,
          type: DEFINE.caster_type,
        });

        if (firebase.messaging.isSupported()) {
          await this.askForPermissionToReceiveNotifications();
        }

        // Redirect the user to the page he first tried to visit or to the home view
        // this.$router.replace(
        //   this.$route.query.redirect || { name: 'auditions' },
        // );

        this.$toasted.show('Account created successfully.');
        this.onRegisterSuccessRedirect();
      } catch (e) {
        console.log("TCL: handleLogin -> e.FirebaseError",e);
          if(e.code && e.code == DEFINE.firebase_permission_error.code){
              this.updateDeviceToken("");
              this.onRegisterSuccessRedirect();
          } else if(e.name && e.name == DEFINE.firebase_permission_error.name){
            this.updateDeviceToken("");
            this.onRegisterSuccessRedirect();
          } else {
            let errorMsg = this.$options.filters.getErrorMsg(e.response.data.errors);
            this.$toasted.error(errorMsg ? errorMsg : e.response.data.message);            
          }
      } finally {
        this.isLoading = false;
      }
    },
    async askForPermissionToReceiveNotifications() {
      const messaging = firebase.messaging();

      // Request permission
      await messaging.requestPermission();

      // Update token
      const token = await messaging.getToken();
      await this.updateDeviceToken(token);

      // Listen token changes
      messaging.onTokenRefresh(async () => {
        const token = await messaging.getToken();
        await this.updateDeviceToken(token);
      });
    },
    async updateDeviceToken(device_token) {
      let userAgentId = window.navigator.userAgent.replace(/\D+/g, '');
      await axios.put(`/t/notification-send-pushkey?pushkey=${device_token}&device_id=${userAgentId}&device_type=web`);
    },
    onRegisterSuccessRedirect() {
      // Redirect the user to the page he first tried to visit or to the home view
      this.$router.push({ name: 'tour' });
    },
    onCancel() {
      console.log('User cancelled the loader.');
    },
    cropImage() {
      // get image data for post processing, e.g. upload or setting image src
      this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
      this.$refs.cropper.getCroppedCanvas().toBlob((blob) => {
        this.updatedImageBlob = blob;
      }); 
    },    
    reset() {
      this.$refs.cropper.reset();
      this.cropImg = null;
    },    
    showFileChooser() {
      this.$refs.inputFile.click()
    },
    cropImageDone(){
      if(this.cropImg){
        this.preview = this.cropImg;
      }
      this.imgSrc = null;
      this.$refs.inputFile.value = '';
      this.$modal.hide('modal_crop_image');
    },
    cropImageCancel(){
      this.imgSrc = null
      this.cropImg = null;
      this.updatedImageBlob = null;
      this.updatedImageFile = null;
      this.$refs.inputFile.value = '';
      this.$modal.hide('modal_crop_image');
    },
    cancelUpdateProfile(){      
      this.hideMenuInfo = false;
      this.tabSelected = '';
      this.imgSrc = null
      this.cropImg = null;
      this.updatedImageBlob = null;
      this.updatedImageFile = null;
      this.$refs.inputFile.value = '';
      this.setUserData();
    }
  },
};
</script>
<style>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0 5px 0;
}
.header h2 {
  margin: 0;
}
.header a {
  text-decoration: none;
  color: black;
}
.content {
  display: flex;
  justify-content: space-between;
}
.cropper-area {
  width: 614px;
}
.actions {
  margin-top: 1rem;
}
.actions a {
  display: inline-block;
  padding: 5px 15px;
  background: #782541;
  color: white;
  text-decoration: none;
  border-radius: 3px;
  margin-right: 1rem;
  margin-bottom: 1rem;
}
textarea {
  width: 100%;
  height: 100px;
}
.preview-area {
  width: 307px;
}
.preview-area p {
  font-size: 1.25rem;
  margin: 0;
  margin-bottom: 1rem;
  color: #782541;
}
.preview-area p:last-of-type {
  margin-top: 1rem;
}
.preview {
  width: 100%;
  height: calc(372px * (9 / 16));
  overflow: hidden;
}
.crop-placeholder {
  width: 100%;
  height: 200px;
  background: #ccc;
}
.cropped-image img {
  max-width: 100%;
}
.v--modal-box.v--modal {
    overflow: auto !important;
}
.cropper-area>textarea{
  display: none;
}
</style>