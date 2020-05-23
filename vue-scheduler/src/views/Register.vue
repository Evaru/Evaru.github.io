<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">
        {{'Home_accounting' | localize}}
      </span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email) }"
        >
        <label for="email">
            {{'Email' | localize}}
        </label>
        <small
          class="helper-text invalid"
          v-if="$v.email.$dirty && !$v.email.required"
        >
          {{'Email_notEmpty' | localize}}
        </small>
        <small
          class="helper-text invalid"
          v-else-if="$v.email.$dirty && !$v.email.email"
        >
          {{'Email_correct' | localize}}
        </small>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model.trim="password"
          :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength) }"
        >
        <label for="password">
          {{'Password' | localize}}
        </label>
        <small
          class="helper-text invalid"
          v-if="$v.password.$dirty && !$v.password.required"
        >
          {{'Password_enter' | localize}}
        </small>
        <small
          class="helper-text invalid"
          v-else-if="$v.password.$dirty && !$v.password.minLength"
        >
          {{'Password_mustHave' | localize}} {{$v.password.$params.minLength.min}} {{"Password_mustHave_two" | localize}} {{password.length}}!</small>
      </div>
      <div class="input-field">
        <input
          id="name"
          type="text"
          class="validate"
          v-model.trim="name"
          :class="{invalid: $v.name.$dirty && !$v.name.required}"
        >
        <label for="name">
          {{"Name" | localize}}
        </label>
        <small class="helper-text invalid" v-if="$v.name.$dirty && !$v.name.required">
          {{"Message_name" | localize}}
        </small>
      </div>
      <p>
        <label>
          <input type="checkbox" v-model.trim="agree">
          <span>{{'Agree' | localize}}</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          {{'Sign_up' | localize}}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{'Have_account' | localize}}
        <router-link to="/login">
        {{'Sign_in' | localize}}
        </router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { email, required, minLength } from "vuelidate/lib/validators";

export default {
  name: "register",
  metaInfo() {
    return {
      title: this.$title('Register')
    }
  },
  data: () => ({
    email: "",
    password: "",
    name: "",
    agree: false
  }),
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) },
    name: { required },
    agree: { checked: v => v }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const formData = {
        email: this.email,
        password: this.password,
        name: this.name
      };
      try {
        await this.$store.dispatch('register',formData)
        this.$router.push("/");
      } catch (error) {
        
      }
      
    }
  }
};
</script>
