<template>
    <div>
        <p class="text-2xl">
            Reset Password
        </p>

        <form
                class="w-full max-w-xs"
                @submit.prevent="handleResetPassword"
        >
            <base-input
                    v-model="newPassword"
                    v-validate="'required'"
                    name="newPassword"
                    ref="newPassword"
                    type="password"
                    placeholder="New Password"
                    :message="errors.first('newPassword')"
                    data-vv-as="new password"
            />

            <base-input
                    v-model="confPassword"
                    v-validate="'required|confirmed:newPassword'"
                    name="confPassword"
                    type="password"
                    placeholder="Confirm Password"
                    :message="errors.first('confPassword')"
                    data-vv-as="confirm password"
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
                newPassword: '',
                confPassword:'',
                isLoading: false,
            };
        },
        methods: {
            async handleResetPassword() {
                try {
                    if (this.isLoading || !await this.$validator.validateAll()) {
                        return;
                    }
                    this.isLoading = true;
                    await AuthService.resetPassword({token:this.$route.params.token,password:this.newPassword, "password_confirmation":this.confPassword});
                    this.$toasted.show('Password reset successfully.');
                    this.$router.push({ name: 'login' });
                } catch (e) {
                    if (e.response.status === 404) {
                        this.$toasted.error('Email not found.');
                    }
                    this.$setErrorsFromLaravel(e.response.data);
                } finally {
                    this.isLoading = false;
                }
            },
        },
    };
</script>
