<template>
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
</template>

<script>

export default {
  name: 'contact-form-input',
  props: {
    type: String,
  }
}
</script>