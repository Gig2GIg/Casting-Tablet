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
          v-model="form.first_name"
          v-validate="'required|max:255'"
          name="first_name"
          placeholder="Name"
          :message="errors.first('first_name')"
          data-vv-as="name"
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
            class="w-2/5"
            placeholder="State"
          >
            <option value="AL">
              Alabama
            </option>
            <option value="AK">
              Alaska
            </option>
            <option value="AZ">
              Arizona
            </option>
            <option value="AR">
              Arkansas
            </option>
            <option value="CA">
              California
            </option>
            <option value="CO">
              Colorado
            </option>
            <option value="CT">
              Connecticut
            </option>
            <option value="DE">
              Delaware
            </option>
            <option value="DC">
              District Of Columbia
            </option>
            <option value="FL">
              Florida
            </option>
            <option value="GA">
              Georgia
            </option>
            <option value="HI">
              Hawaii
            </option>
            <option value="ID">
              Idaho
            </option>
            <option value="IL">
              Illinois
            </option>
            <option value="IN">
              Indiana
            </option>
            <option value="IA">
              Iowa
            </option>
            <option value="KS">
              Kansas
            </option>
            <option value="KY">
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

        <base-input
          key="birth-input"
          v-model="form.birth"
          v-validate="'required|date_format:MM/dd/yyyy'"
          v-mask="'##/##/####'"
          name="birth"
          placeholder="Birth Date"
          :message="errors.first('birth')"
          data-vv-as="birth date"
        />
      </template>

      <template v-else>
        <div
          class="flex items-center rounded-full bg-white h-32 w-32 mx-auto mb-6 cursor-pointer"
          @click="$refs.inputFile.click()"
        >
          <img
            src="/images/icons/upload.png"
            alt="Upload"
            class="h-16 mx-auto ml-8 -mt-2"
          >
        </div>

        <input
          ref="inputFile"
          accept="application/pdf"
          type="file"
          hidden
          @change="form.image = $event.target.files[0]"
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
