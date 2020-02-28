<template>
  <div>
    <p class="text-2xl">
      Forgot Password
    </p>

    <form
      class="w-full max-w-xs"
      @submit.prevent="handleSendPasswordResetEmail"
    >
      <base-input
        v-model="email"
        v-validate="'required|email'"
        name="email"
        class="my-16"
        placeholder="Email"
        :message="errors.first('email')"
      />

      <base-button
        type="submit"
        expanded
      >
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
      email: '',
      isLoading: false,
    };
  },
  methods: {
    async handleSendPasswordResetEmail() {
      try {
        if (this.isLoading || !await this.$validator.validateAll()) {
          return;
        }

        this.isLoading = true;

        await AuthService.sendPasswordResetNotification(this.email);

        this.$toasted.show('Mail sent successfully.');
        this.$router.push({ name: 'login' });
      } catch (e) {
        if (e.response.status === 404) {
          this.$toasted.error('Email not found.');
        } else if (e.response.status === 403) {
          this.$toasted.error(e.response.data.data ? e.response.data.data : 'These credentials do not match our records.');
        }
        this.$setErrorsFromLaravel(e.response.data);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
