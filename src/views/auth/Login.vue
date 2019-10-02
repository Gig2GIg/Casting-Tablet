<template>
  <div>
    <img
      src="/images/logo.png"
      class="mt-auto max-w-xs"
      alt="Logo"
    >

    <p class="text-4xl">
      CASTING
    </p>

    <form
      class="w-full max-w-xs mt-8"
      @submit.prevent="handleLogin"
    >
      <base-input
        v-model="email"
        v-validate="'required|email'"
        name="user"
        placeholder="User"
        :message="errors.first('user')"
      />

      <base-input
        v-model="password"
        v-validate="'required'"
        name="password"
        type="password"
        placeholder="Password"
        :message="errors.first('password')"
      />

      <base-button
        type="submit"
        expanded
      >
        Log In
      </base-button>
    </form>

    <router-link
      :to="{ name: 'password.email' }"
      class="mt-2 text-sm"
    >
      Forgot Password?
    </router-link>

    <router-link
      :to="{ name: 'register' }"
      class="mt-16"
    >
      Create Account
    </router-link>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      email: '',
      password: '',
      isLoading: false,
    };
  },
  methods: {
    ...mapActions('auth', ['login']),

    async handleLogin() {
      try {
        if (this.isLoading) {
          return;
        }

        this.isLoading = true;

        await this.login({
          email: this.email,
          password: this.password,
        });

        // Redirect the user to the page he first tried to visit or to the home view
        this.$router.replace(
          this.$route.query.redirect || { name: 'auditions' },
        );
      } catch (e) {
        if (e.response.status === 401) {
          this.$toasted.error('These credentials do not match our records.');
        }
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
