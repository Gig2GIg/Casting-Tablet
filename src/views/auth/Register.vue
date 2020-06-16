<template>
  <div>
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :on-cancel="onCancel"
      :is-full-page="fullPage"
    ></loading>
    <p class="text-2xl" v-if="selectedPlan && step !== 3">Create Your Account</p>
    <p class="text-2xl" v-if="step === 3">Payment Details</p>
    <PlanDetails
      v-if="!selectedPlan"
      :from="'signup'"
      @select_plan="handleSelectPlan"
      @child_loder="handleChildLoader"
    />
    <form
      v-else
      class="w-full max-w-xs mt-16"
      @submit.prevent="step === 4 ? handleRegister() : nextStep()"
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
        <div
          v-if="!preview"
          class="flex items-center rounded-full bg-white h-32 w-32 mx-auto mb-6 cursor-pointer"
          @click="$refs.inputFile.click()"
        >
          <img src="/images/icons/upload.png" alt="Upload" class="h-16 mx-auto ml-8 -mt-2" />
        </div>

        <img
          v-else
          :src="preview"
          alt="Image"
          class="rounded-full h-32 w-32 mx-auto mb-6 cursor-pointer"
          @click="$refs.inputFile.click()"
        />

        <input ref="inputFile" accept=".png, .jpg, .jpeg" type="file" hidden @change="handleImage" />

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
      <template v-else-if="step === 3">
        <base-input
          key="name_on_card-input"
          v-model="form.name_on_card"
          v-validate="'required|max:255'"
          name="name_on_card"
          placeholder="Name on Card"
          :message="errors.first('name_on_card')"
          data-vv-as="name on card"
        />
        <base-input
          key="card_number-input"
          v-model="form.card_number"
          v-validate="'required'"
          name="card_number"
          placeholder="Card Number"
          :type="'stripe_element'"
          :stripe_cardformat="'formatCardNumber'"
          :message="errors.first('card_number')"
          data-vv-as="card number"
        />
        <base-input
          key="card_expiry-input"
          v-model="form.card_expiry"
          v-validate="'required'"
          name="card_expiry"
          class="month-picker"
          placeholder="Card Expiry"
          type="month"
          :stripe_cardformat="'formatCardExpiry'"
          :message="errors.first('card_expiry')"
          data-vv-as="card expiry"
        />
        <base-input
          key="card_cvc-input"
          v-model="form.card_cvc"
          v-validate="'required'"
          name="card_cvc"
          placeholder="CVC"
          :type="'stripe_element'"
          :stripe_cardformat="'formatCardCVC'"
          :message="errors.first('card_cvc')"
          data-vv-as="cvc"
        />
      </template>
      <template v-else>
        <!-- <base-input
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
        />-->

        <!-- <div class="flex items-start w-full">
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
            >{{ state.label }}</option>
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
        </div>-->
        <base-select
          key="country-input"
          v-model="form.country"
          v-validate="'required'"
          name="country"
          placeholder="Country"
          :message="errors.first('country')"
        >
          <option
            v-for="country in countries"
            :key="country.id"
            :value="country.id"
          >{{ country.name }}</option>
        </base-select>

        <base-input
          key="birth-input"
          v-model="form.birth"
          name="birth"
          type="date"
          :max-date="new Date(new Date().getFullYear() - 18, new Date().getMonth(), new Date().getDate())"
          placeholder="Birth Date"
          :message="errors.first('birth')"
          data-vv-as="birth date"
        />
      </template>

      <base-button class="mt-16" type="submit" expanded>{{ step === 4 ? 'Get Started' : 'Next' }}</base-button>
    </form>
    <modal
      class="flex flex-col w-full items-center my-info-mdel"
      :width="600"
      :height="480"
      name="modal_crop_image"
    >
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
            <a href="#" role="button" @click.prevent="cropSaveImage">Crop & Save</a>
            <a href="#" role="button" @click.prevent="cropImageCancel">Cancel</a>
          </div>
          <base-input
            v-model="profileFileName"
            :custom-classes="['border border-b border-gray-300']"
            name="cover_file_name"
            placeholder="Cover Name"
            data-vv-as="cover name"
            class="w-8/12"
          />
        </section>
      </div>
    </modal>
  </div>
</template>

<script>
import Vue from "vue";
import AuthService from "@/services/AuthService";
// import states from "@/utils/states";
import countries from "@/utils/countries";
import DEFINE from "../../utils/const.js";
import { mapActions } from "vuex";
// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
Vue.use(Loading);

import firebase from "firebase/app";
import "firebase/messaging";
import axios from "axios";

import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";
import ThumbService from "@/services/ThumbService";
import PlanDetails from "../../components/shared/PlanDetails";
import moment from "moment";
import TokenService from "../../services/core/TokenService";
import { eventBus } from "../../main";
import payment from "@/utils/jquery.payment.js";

export default {
  components: {
    Loading,
    VueCropper,
    PlanDetails
  },
  data() {
    return {
      form: {},
      step: 0,
      isLoading: false,
      fullPage: true,
      preview: null,
      // states,
      countries,
      imgSrc: null,
      updatedImageFile: null,
      updatedImageBlob: null,
      cropImg: "",
      data: null,
      minHeight: Number(200),
      minWidth: Number(200),
      profileFileName: null,
      profileNameObject: {},
      profileThumbnail: {},
      selectedPlan: null,
      minmonthdate: moment(),
      isSignUpDone: false,
      logingResult: null
    };
  },
  created() {
    eventBus.$emit("signupNext", this.step);
    eventBus.$on("signupBack", value => {
      if (value === 0) {
        this.selectedPlan = null;
        this.step = value;
      } else {
        this.step = value;
      }
    });
  },
  methods: {
    ...mapActions("auth", ["login"]),
    ...mapActions("profile", ["fetch"]),
    async nextStep() {      
      if (await this.$validator.validateAll()) {
        if(this.step == 3) {
          this.$toasted.clear();
          if(!payment.validateCardNumber(this.form.card_number)){
            this.$toasted.error("Please enter valid card number!");
            return;
          }
          if(!payment.validateCardCVC(this.form.card_cvc)){
            this.$toasted.error("Please enter valid CVC!");
            return;
          }
        }
        this.step += 1;
        eventBus.$emit("signupNext", this.step);
      }
    },

    handlePlace(place) {
      this.form.location = `${place.geometry.location.lat()}, ${place.geometry.location.lng()}`;
    },

    handleImage(e) {
      const file = e.target.files[0];
      if (file.type.indexOf("image/") === -1) {
        this.$toasted.error("Please select an image file");
        return;
      }
      if (typeof FileReader === "function") {
        this.cropImg = null;
        this.updatedImageBlob = null;
        this.profileFileName = null;
        this.updatedImageFile = file;
        this.profileNameObject.name = file.name;
        this.profileNameObject.org_name = file.name;
        this.profileFileName = JSON.parse(
          JSON.stringify(this.updatedImageFile.name)
        );
        const reader = new FileReader();
        reader.onload = event => {
          this.imgSrc = event.target.result;
          // rebuild cropperjs with the updated source
          if (this.$refs.cropper) {
            this.$refs.cropper.replace(event.target.result);
            this.reset();
          }
          this.$modal.show("modal_crop_image");
        };
        reader.readAsDataURL(file);
      } else {
        this.$toasted.error("Something went to wrong, please try again!");
      }
    },

    async handleRegister() {
      this.$toasted.clear();

      try {
        if (this.isLoading || !(await this.$validator.validateAll())) {
          return;
        }
   
        
        let data = JSON.parse(JSON.stringify(this.form));
        if (!this.isSignUpDone) {
          if (this.updatedImageBlob && this.updatedImageFile) {
            this.updatedImageBlob.name = this.updatedImageFile.name;
            this.form.image = this.updatedImageBlob;
            this.form.profileThumbnail = this.profileThumbnail;
            this.form.profileNameObject = this.profileNameObject;
          } else {
            this.form.image = null;
          }
          // Validate image
          if (!this.form.image) {
            this.$toasted.error("The image field is required.");
            return;
          }

          // Validate location
          // if (!this.form.location) {
          //   this.$toasted.error('The location selected is invalid.');
          //   return;
          // }

          this.isLoading = true;
          // this.form.address = `${this.form.address1} ${this.form.address2}`;
          console.log("handleRegister -> this.form", this.form);
          // delete this.form.address1;
          // delete this.form.address2;
          await AuthService.register(this.form);
          this.isSignUpDone = true;
        }
        this.logingResult = await this.login({
          email: this.form.email,
          password: this.form.password,
          type: DEFINE.caster_type
        });

        // start : create subscription plan
        const Request = {
          name_on_card: data.name_on_card,
          exp_year: moment(data.card_expiry).format("YYYY"),
          exp_month: moment(data.card_expiry).format("MM"),
          number: data.card_number.replace(/\s/g, ""),
          cvc: data.card_cvc,
          user_id: TokenService.getUserId(),
          stripe_plan_id: this.selectedPlan.stripe_plan,
          stripe_plan_name: this.selectedPlan.name,
          plan_id: this.selectedPlan.id
        };

        await axios.post(`/t/users/subscribe`, Request);
        // end : create subscription plan
        await this.fetch();

        if (firebase.messaging.isSupported()) {
          await this.askForPermissionToReceiveNotifications();
        }

        // Redirect the user to the page he first tried to visit or to the home view
        // this.$router.replace(
        //   this.$route.query.redirect || { name: 'auditions' },
        // );

        this.$toasted.show("Account created successfully.");
        this.onRegisterSuccessRedirect();
      } catch (e) {
        console.log("handleRegister -> e", e);
        console.log("TCL: handleRegister -> e.response", e.response);
        if (e.code && e.code == DEFINE.firebase_permission_error.code) {
          this.updateDeviceToken("");
          this.onRegisterSuccessRedirect();
        } else if (e.name && e.name == DEFINE.firebase_permission_error.name) {
          this.updateDeviceToken("");
          this.onRegisterSuccessRedirect();
        } else {
          let errorMsg = this.$options.filters.getErrorMsg(
            e.response.data.errors
          );
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
      let userAgentId = window.navigator.userAgent.replace(/\D+/g, "");
      await axios.put(
        `/t/notification-send-pushkey?pushkey=${device_token}&device_id=${userAgentId}&device_type=web`
      );
    },
    onRegisterSuccessRedirect() {
      // Redirect the user to the page he first tried to visit or to the home view
      // this.$router.push({ name: "tour" });
      this.$router.push({
        name: "invite_user",
        params: { type: btoa("signup") }
      });
    },
    onCancel() {
      console.log("User cancelled the loader.");
    },
    async cropSaveImage() {
      this.$toasted.clear();
      if (
        !this.profileFileName ||
        this.profileFileName == "" ||
        this.profileFileName.trim() == ""
      ) {
        this.$toasted.error("Please enter filename!");
        return;
      } else if (this.profileFileName && this.profileFileName.length > 150) {
        this.$toasted.error(
          "Filename is too long, it should not be more than 150 characters!"
        );
        return;
      }
      // get image data for post processing, e.g. upload or setting image src
      this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
      await this.$refs.cropper.getCroppedCanvas().toBlob(async blob => {
        this.updatedImageBlob = blob;
        await ThumbService.imageThumbnail(
          this.updatedImageBlob,
          DEFINE.thumbSize.imageThumbWidth
        ).then(thumb_data => {
          Vue.set(this.profileThumbnail, "preview", thumb_data.preview);
          Vue.set(this.profileThumbnail, "file", thumb_data.file);
        });
      });

      if (this.cropImg) {
        this.preview = this.cropImg;
      }
      this.profileNameObject.name = this.profileFileName;
      this.imgSrc = null;
      this.$refs.inputFile.value = "";
      this.$modal.hide("modal_crop_image");
    },
    async cropImage() {
      // get image data for post processing, e.g. upload or setting image src
      this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
      this.$refs.cropper.getCroppedCanvas().toBlob(async blob => {
        this.updatedImageBlob = blob;
        await ThumbService.imageThumbnail(
          this.updatedImageBlob,
          DEFINE.thumbSize.imageThumbWidth
        ).then(thumb_data => {
          Vue.set(this.profileThumbnail, "preview", thumb_data.preview);
          Vue.set(this.profileThumbnail, "file", thumb_data.file);
        });
      });
    },
    reset() {
      this.$refs.cropper.reset();
      this.cropImg = null;
      this.profileFileName = null;
      this.profileFileName = JSON.parse(
        JSON.stringify(this.profileNameObject.name)
      );
    },
    showFileChooser() {
      this.$refs.inputFile.click();
    },
    cropImageDone() {
      this.$toasted.clear();
      if (
        !this.profileFileName ||
        this.profileFileName == "" ||
        this.profileFileName.trim() == ""
      ) {
        this.$toasted.error("Please enter filename!");
        return;
      } else if (this.profileFileName && this.profileFileName.length > 150) {
        this.$toasted.error(
          "Filename is too long, it should not be more than 150 characters!"
        );
        return;
      }

      if (this.cropImg) {
        this.preview = this.cropImg;
      }
      this.profileNameObject.name = this.profileFileName;
      this.imgSrc = null;
      this.$refs.inputFile.value = "";
      this.$modal.hide("modal_crop_image");
    },
    cropImageCancel() {
      this.imgSrc = null;
      this.cropImg = null;
      this.updatedImageBlob = null;
      this.updatedImageFile = null;
      this.profileNameObject = {};
      this.profileFileName = null;
      this.$refs.inputFile.value = "";
      this.$modal.hide("modal_crop_image");
    },
    cancelUpdateProfile() {
      this.hideMenuInfo = false;
      this.tabSelected = "";
      this.imgSrc = null;
      this.cropImg = null;
      this.updatedImageBlob = null;
      this.updatedImageFile = null;
      this.$refs.inputFile.value = "";
      this.setUserData();
    },
    handleSelectPlan(selectedPlan) {
      if (selectedPlan) {
        this.step += 1;
        this.selectedPlan = selectedPlan;
        eventBus.$emit("signupNext", this.step);
      } else {
        this.selectedPlan = null;
      }
    },
    handleChildLoader(value) {
      this.isLoading = value;
    }
  }
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
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
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
.cropper-area > textarea {
  display: none;
}
.credit-card-inputs.complete {
  border: 2px solid green;
}

/*start: Month picker css */
.month-picker .month-year-display {
  background-color: #ffffff;
}
.month-picker .month-year-display .picker .flexbox div {
  color: #ffffff;
}
.vue-monthly-picker .picker .flexbox div {
  color: #000000;
  font-weight: 600;
}
.vue-monthly-picker .date-popover {
  border-radius: 15px !important;
}
.vue-monthly-picker .picker .monthItem .item.active:hover {
  background-color: transparent !important;
  background-image: linear-gradient(#4d2545, #782541) !important;
  color: #ffffff !important;
}
.vue-monthly-picker .picker .monthItem .item.deactive {
  color: #999 !important;
}
/*end: Month picker css */
</style>