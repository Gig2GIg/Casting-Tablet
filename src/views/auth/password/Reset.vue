<template>
  <div>
    <p class="text-2xl">
      Reset Password
    </p>

    <form
      class="w-full max-w-xs mt-16"
      @submit.prevent="handleResetPassword"
    >
      <base-input
        ref="password"
        v-model="password"
        v-validate="'required|min:8'"
        name="password"
        type="password"
        placeholder="Password"
        :message="errors.first('password')"
      />

      <base-input
        v-model="password_confirmation"
        v-validate="'required|confirmed:password'"
        name="password_confirmation"
        class="mb-16"
        type="password"
        placeholder="Re-enter Password"
        :message="errors.first('password_confirmation')"
        data-vv-as="password"
      />

      <base-button type="submit">
        Submit
      </base-button>
    </form>
  </div>
</template>

<script>
import AuthService from '@/services/AuthService';

export default {
  data() {
    return {
      email: null,
      token: null,
      password: '',
      password_confirmation: '',
      isLoading: false,
    };
  },
  created() {
    this.email = this.$route.query.email;
    this.token = this.$route.params.token;
  },
  methods: {
    async handleResetPassword() {
      try {
        if (this.isLoading || !await this.$validator.validateAll()) {
          return;
        }

        this.isLoading = true;

        await AuthService.updatePassword({
          email: this.email,
          token: this.token,
          password: this.password,
          password_confirmation: this.password_confirmation,
        });

        this.$router.replace({ name: 'login' });
      } catch (e) {
        this.$toasted.error(e.response.data.message);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
