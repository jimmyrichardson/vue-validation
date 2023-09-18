<template>
  <form id="contact-form" class="contact-form" novalidate @submit.prevent="submit()">
    <h1>Simple Contact Form</h1>

    <label for="form-name">
      Full Name<sup class="required">*</sup>
    </label>
    <input
      v-model="formData.fullName"
      @input="validateFullName()"
      :class="{
        'input--has-error': touched.fullName && !valid.fullName,
        'input--is-valid': touched.fullName && valid.fullName,
      }"
      id="form-name"
      name="full-name"
      type="text"
      placeholder="Full Name"
      required />
    <small
      v-if="touched.fullName && !valid.fullName"
      class="validation">
      Please provide your full name.
    </small>

    <label for="form-phone">
      Phone Number<sup class="required">*</sup>
    </label>
    <input
      v-model="formData.phoneNumber"
      @input="validatePhoneNumber()"
      :class="{
        'input--has-error': touched.phoneNumber && !valid.phoneNumber,
        'input--is-valid': touched.phoneNumber && valid.phoneNumber,
      }"
      id="form-phone"
      name="phone"
      type="tel"
      placeholder="XXXXXXXXXX"
      maxlength="10"
      required />
    <small
      v-if="touched.phoneNumber && !valid.phoneNumber"
      class="validation">
      Please provide a valid phone number.
    </small>

    <label for="form-interest">
      Please select an interest<sup class="required">*</sup>
    </label>
    <select
      v-model="formData.interest"
      @change="validateInterest()"
      :class="{
        'input--is-valid': touched.interest && valid.interest,
      }"
      id="form-interest"
      name="interest"
      required>
      <option selected disabled>Please select an interest...</option>

      <!-- These options were missing in the assessment doc, sorry ¯\_(ツ)_/¯ -->

      <option value="One">One</option>
      <option value="Two">Two</option>
      <option value="Three">Three</option>
    </select>

    <label for="form-description">
      Description<sup class="required">*</sup>
    </label>
    <textarea
      v-model="formData.description"
      @input="validateDescription()"
      :class="{
        'input--has-error': touched.description && !valid.description,
        'input--is-valid': touched.description && valid.description,
      }"
      id="form-description"
      name="description"
      maxlength="500">
    </textarea>
    <small class="validation">
      Characters remaining: {{ remainingCharacters }}
    </small>

    <label>
      Reference <sup class="required">*</sup>
    </label>

    <!-- <ContactFormInput
      type="checkbox"
      v-model="formData.reference"
      :class="{
        'input--has-error': touched.reference && !valid.reference,
        'input--is-valid': touched.reference && valid.reference,
      }"
      @change="validateReference()" /> -->
   
    <label class="label--checkbox" for="form-reference--online-ad">
      <input
        v-model="formData.reference"
        @change="validateReference()"
        :class="{
          'input--has-error': touched.reference && !valid.reference,
          'input--is-valid': touched.reference && valid.reference,
        }"
        id="form-reference--online-ad"
        type="checkbox" value="Online Ad" />
        Online Ad
    </label>

    <label class="label--checkbox" for="form-reference--recommendation">
      <input
        v-model="formData.reference"
        @change="validateReference()"
        :class="{
          'input--has-error': touched.reference && !valid.reference,
          'input--is-valid': touched.reference && valid.reference,
        }"
        id="form-reference--recommendation"
        type="checkbox" value="Recommendation" />
        Recommendation
    </label>

    <label class="label--checkbox" for="form-reference--referral">
      <input
        v-model="formData.reference"
        @change="validateReference()"
        :class="{
          'input--has-error': touched.reference && !valid.reference,
          'input--is-valid': touched.reference && valid.reference,
        }"
        id="form-reference--referral"
        type="checkbox" value="Referral" />
        Referral
    </label>

    <label class="label--checkbox" for="form-reference--other">
      <input
        v-model="formData.reference"
        @change="validateReference()"
        :class="{
          'input--has-error': touched.reference && !valid.reference,
          'input--is-valid': touched.reference && valid.reference,
        }"
        id="form-reference--other"
        type="checkbox" value="Other" />
        Other
    </label>

    <button
      v-if="formIsValid"
      type="submit">
      Submit
    </button>
    
  </form>
</template>

<script>
// import ContactFormInput from './ContactFormInput.vue';

export default {
  name: 'submit-modal',
  data() {
    return {

      // Form data model: This will be sent to the VueX store when it's ready

      formData: {
        fullName: '',
        phoneNumber: '',
        interest: '',
        description: '',
        reference: [],
      },

      // "Touched" ensures validation messages are only shown when a user actively inputs something invalid, as opposed to yelling at a user before they've had the chance to touch anything

      touched: {
        fullName: false,
        phoneNumber: false,
        interest: false,
        description: false,
        reference: false,
      },

      // Submit button will not show unless all fields have been touched and flagged as valid

      valid: {
        fullName: false,
        phoneNumber: false,
        interest: false,
        description: false,
        reference: false,
      },
    }
  },
  computed: {

    // Calculate remaining characters for Description box

    remainingCharacters(){
      return 500 - this.formData.description.length;
    },

    // Form validation: Only show submit button if all fields deemed valid

    formIsValid() {
      return this.valid.fullName &&
        this.valid.phoneNumber &&
        this.valid.interest &&
        this.valid.description &&
        this.valid.reference;
    }
  },
  methods: {

    // Full name validation: character length 3+

    validateFullName() {
      this.touched.fullName = true;
      this.valid.fullName = this.formData.fullName.length >= 3 ? true : false;
    },

    // Phone number validation: Numbers-only, Regex, 10 digits

    validatePhoneNumber() {
      const reg = new RegExp('^[0-9]+$');
      this.touched.phoneNumber = true;
      this.valid.phoneNumber =
        reg.test(this.formData.phoneNumber) &&
        this.formData.phoneNumber.length == 10;
    },

    // Interest validation (select box): Make sure they've selected something

    validateInterest() {
      this.touched.interest = true;
      this.valid.interest = this.formData.interest !== '' ? true : false;
    },

    // Description validation (textarea): Just make sure they've typed something

    validateDescription() {
      this.touched.description = true;
      this.valid.description = this.formData.description.length > 0 ? true : false;
    },

    // Reference validation (checkboxes): Just make sure they've checked something

    validateReference() {
      this.touched.reference = true;
      this.valid.reference = this.formData.reference.length > 0 ? true : false;
    },

    // Submit handler: To the VueX store we go

    submit() {
      this.$store.dispatch('SUBMIT_FORM', this.formData );
    }
  },
  components: {
    //ContactFormInput,
  }
}
</script>

<style lang="scss">

// Layout
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.contact-form {
  max-width: 48rem;
  margin: 0 auto;
  padding: columns(1);
}

label {
  display: block;
  margin: 1rem 0 0.25rem 0;
}

// Global input styles
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

input,textarea,select {
  @extend %input-reset; // %input-reset is a placeholder selector from src/styles/main.scss
  background-color: transparent;
  border: 3px solid rgba( $white, 0.5 );
  display: block;
  color: $white;
  padding: 1rem;
  width: 100%;
  transition: border-color 0.2s ease-out;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: rgba( $white, 0.9 );
  }

  &::placeholder {
    color: inherit;
    opacity: 0.5;
  }
}

textarea {
  resize: vertical;
  min-height: 8rem;
}

// Label checkbox modifiers
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.label {

  &--checkbox {
    display: flex;
    align-items: center;
    gap: 1rem;
    cursor: pointer;

    input {
      flex: 0 0 1rem;
      cursor: pointer;
      transition: background-color 0.2s ease-out;

      &:checked {
        background-color: rgba( $white, 0.9 );
      }
    }
  }

}


// Submit button
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

button {
  @extend %input-reset;
  background-color: rgba( $green, 0.75 );
  color: $eigengrau;
  font-weight: bold;
  padding: 1rem 3rem;
  border: 0px;
  border-radius: 8px;
  margin: 1rem 0 0 auto;
  display: block;
  transition: background-color 0.2s ease-out;
  cursor: pointer;

  &:hover {
    background-color: rgba( $green, 0.9 );
  }
}

// Validation messages and *required asterisk
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.validation {
  display: block;
  text-align: right;
}

.required {
  color: $red;
  font-weight: bold;
}

// Input validation states
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.input {

  // Error states, red border
  &--has-error {
    &, &:focus {
      border-color: rgba( $red, 0.9 );
    }
  }

  // Valid states, green border
  &--is-valid {
    &, &:focus {
      border-color: rgba( $green, 0.75 );
    }
  }

}

</style>
