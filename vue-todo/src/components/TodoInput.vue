<template>
  <div class="inputBox shadow">
    <input type="text" v-model="newTodoItem" v-on:keyup.enter="addTodo" />
    <!-- <button v-on:click="addTodo">add</button> -->
    <span class="addContainer" v-on:click="addTodo">
      <i class="fa-solid fa-plus addBtn"></i>
    </span>
    <Modal v-if="showModal" @close="showModal = false">
      <!--
      you can use custom content here to overwrite
      default content
    -->
      <!-- slot은 특정 컴포넌트의  일부 UI들을 재사용할 수 있는 기능-->
      <h3 slot="header">
        경고! 
        <i class="closeModalBtn fa-solid fa-circle-xmark" @click="showModal = false"></i>
      </h3>
      <div slot="body">아무것도 입력하지 않으셨습니다.</div>
    </Modal>
  </div>
</template>

<script>
import Modal from "./common/ModalVue.vue";

export default {
  data: function () {
    return {
      newTodoItem: "",
      showModal: false,
    };
  },
  methods: {
    addTodo: function () {
      if (this.newTodoItem !== "") {
        /**
         * this에서 $emti하면 addTotoItem이벤트 발생
         * 하위에서 발생한게 App.vue로 올라가서 매핑됨.
         * 그리고 App.vue에서 설정한 메서드가 실행됨
         */
        this.$emit("addTodoItem", this.newTodoItem);
        this.clearInput();
      } else {
        this.showModal = !this.showModal;
      }
    },
    clearInput: function () {
      this.newTodoItem = "";
    },
  },
  components: {
    Modal: Modal,
  },
};
</script>

<style scoped>
input:focus {
  outline: none;
}
.inputBox {
  background: white;
  height: 50px;
  line-height: 50px;
  border-radius: 5px;
}
.inputBox input {
  border-style: none;
  font-size: 0.9rem;
}
.addContainer {
  float: right;
  background: linear-gradient(to right, #6478f8, #8763fb);
  display: block;
  width: 3rem;
  border-radius: 0 5px 5px 0;
}
.addBtn {
  color: white;
  vertical-align: middle;
}
.closeModalBtn {
  color: #42b983;
}
</style>