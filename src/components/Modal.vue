<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="modal-wrapper">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">
            <slot name="title">Delete Todo</slot>
        </h5>
        <button type="button" class="close" @click="onClose">
          <span>&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p><slot name="content">정말로 삭제하시겠습니까?</slot></p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" @click="onClose">Close</button>
        <button
            type="button"
            class="btn"
            :class="buttonColorType"
            @click="onDelete">
            <slot name="buttonText">Delete</slot>
        </button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: 'Delete Todo'
        },
        content: {
            type: String,
            default: '정말로 삭제하시겠습니까?'
        },
        buttonText: {
            type: String,
            default: 'Delete'
        },
        buttonColorType: {
            type: String,
            default: 'btn-danger'
        }
    },
    setup(props, { emit }) {
        const onClose = () => {
            emit('close')
        }
        const onDelete = () => {
            emit('delete')
        }
        return {
            onClose,
            onDelete
        }
    }
}
</script>

<style scoped>
.modal-wrapper {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}
</style>