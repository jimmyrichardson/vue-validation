<template>
  <dialog
    id="modal"
    class="modal"
    :open="$store.state.formSubmitted">
    <pre class="modal__inner">{{ $store.state.formData }}</pre>
  </dialog>
</template>

<script>
export default {
  name: 'submit-modal',
}
</script>

<style lang="scss" scoped>

.modal {
  background-color: rgba( $eigengrau, 0.75 );
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  &__inner {
    background-color: $white;
    width: calc( 100% - columns(2) );
    max-width: 48rem;
    margin: 0 auto;
    padding: columns(1);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate( -50%, -50% );
  }
}

</style>
