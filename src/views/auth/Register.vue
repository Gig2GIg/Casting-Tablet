<template>
  <div>
    <p class="text-2xl">
      Create Your Account
    </p>

    <form
      class="w-full max-w-xs mt-16"
      @submit.prevent="step === 3 ? handleRegister() : nextStep()"
    >
      <template v-if="step === 1">
        <base-input
          v-model="form.name"
          v-validate="'required|max:255'"
          name="name"
          placeholder="Name"
          :message="errors.first('name')"
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
        />

        <base-input
          v-model="form.password_confirmation"
          v-validate="'required|confirmed:password'"
          name="password_confirmation"
          type="password"
          placeholder="Re-enter Password"
          :message="errors.first('password_confirmation')"
          data-vv-as="password"
        />
      </template>

      <template v-else-if="step === 2">
        <base-input
          key="address-input"
          v-model="form.address"
          v-validate="'required|max:255'"
          name="address"
          placeholder="Address"
          :message="errors.first('address')"
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
            <option :value="1">
              Alabama
            </option>
            <option :value="2">
              Alaska
            </option>
            <option :value="3">
              Arizona
            </option>
            <option :value="4">
              Arkansas
            </option>
            <option :value="5">
              California
            </option>
            <option :value="6">
              Colorado
            </option>
            <option :value="6">
              Connecticut
            </option>
            <option :value="7">
              Delaware
            </option>
            <option :value="8">
              District Of Columbia
            </option>
            <option :value="8">
              Florida
            </option>
            <option :value="10">
              Georgia
            </option>
            <option :value="11">
              Hawaii
            </option>
            <option :value="12">
              Idaho
            </option>
            <option :value="13">
              Illinois
            </option>
            <option :value="14">
              Indiana
            </option>
            <option :value="15">
              Iowa
            </option>
            <option :value="16">
              Kansas
            </option>
            <!-- <option value="KY">
              Kentucky
            </option>
            <option value="LA">
              Louisiana
            </option>
            <option value="ME">
              Maine
            </option>
            <option value="MD">
              Maryland
            </option>
            <option value="MA">
              Massachusetts
            </option>
            <option value="MI">
              Michigan
            </option>
            <option value="MN">
              Minnesota
            </option>
            <option value="MS">
              Mississippi
            </option>
            <option value="MO">
              Missouri
            </option>
            <option value="MT">
              Montana
            </option>
            <option value="NE">
              Nebraska
            </option>
            <option value="NV">
              Nevada
            </option>
            <option value="NH">
              New Hampshire
            </option>
            <option value="NJ">
              New Jersey
            </option>
            <option value="NM">
              New Mexico
            </option>
            <option value="NY">
              New York
            </option>
            <option value="NC">
              North Carolina
            </option>
            <option value="ND">
              North Dakota
            </option>
            <option value="OH">
              Ohio
            </option>
            <option value="OK">
              Oklahoma
            </option>
            <option value="OR">
              Oregon
            </option>
            <option value="PA">
              Pennsylvania
            </option>
            <option value="RI">
              Rhode Island
            </option>
            <option value="SC">
              South Carolina
            </option>
            <option value="SD">
              South Dakota
            </option>
            <option value="TN">
              Tennessee
            </option>
            <option value="TX">
              Texas
            </option>
            <option value="UT">
              Utah
            </option>
            <option value="VT">
              Vermont
            </option>
            <option value="VA">
              Virginia
            </option>
            <option value="WA">
              Washington
            </option>
            <option value="WV">
              West Virginia
            </option>
            <option value="WI">
              Wisconsin
            </option>
            <option value="WY">
              Wyoming
            </option> -->
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

        <base-input
          key="birth-input"
          v-model="form.birth"
          v-validate="'required'"
          name="birth"
          type="date"
          placeholder="Birth Date"
          :message="errors.first('birth')"
          data-vv-as="birth date"
        />
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

        <base-input
          v-model="form.location_formatted"
          v-validate="'required'"
          name="location_formatted"
          type="location"
          placeholder="Location"
          :message="errors.first('location_formatted')"
          data-vv-as="location"
          @place="handlePlace"
        />
      </template>

      <base-button
        class="mt-16"
        type="submit"
        expanded
      >
        Next
      </base-button>
    </form>
  </div>
</template>

<script>
import AuthService from '@/services/AuthService';

export default {
  data() {
    return {
      form: {},
      step: 1,
      isLoading: false,
      preview: null,
    };
  },
  methods: {
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

      this.form.image = file;
      this.preview = URL.createObjectURL(file);
    },

    async handleRegister() {
      try {
        if (this.isLoading || !await this.$validator.validateAll()) {
          return;
        }

        // Validate image
        if (!this.form.image) {
          this.$toasted.error('The image field is required.');
          return;
        }

        // Validate location
        if (!this.form.location) {
          this.$toasted.error('The location selected is invalid.');
          return;
        }

        this.isLoading = true;

        await AuthService.register(this.form);

        this.$router.push({ name: 'login' });
      } catch (e) {
        this.$toasted.error(e.response.data.message);
        this.$setErrorsFromLaravel(e.response.data);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
