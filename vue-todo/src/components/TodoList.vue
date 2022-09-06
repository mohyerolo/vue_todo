<template>
  <div>
    <transition-group name="list" tag="ul">
      <li
        v-for="(todoItem, index) in this.storedTodoItems"
        v-bind:key="todoItem.item"
        class="shadow"
      >
        <i
          class="fa-solid fa-check checkBtn"
          v-bind:class="{ checkBtnCompleted: todoItem.completed }"
          v-on:click="toggleComplete({ todoItem, index })"
        ></i>
        <span v-bind:class="{ textCompleted: todoItem.completed }">
          {{ todoItem.item }}</span
        >
        <span class="removeBtn" v-on:click="removeTodo({ todoItem, index })">
          <i class="fa-solid fa-trash"></i>
        </span>
      </li>
    </transition-group>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  methods: {
    ...mapMutations({
      // 인자를 선언하지 않아도 호출할 때 인자가 있으면 암묵적으로 넘기고 있음.
      // 인자는 하나의 형태로만 넘어가므로 호출할 때 인자를 객체로 묶어줘야됨
      removeTodo: "removeOneItem",
      toggleComplete: "toggleOneItem",
    }),
  },
  computed: {
    // todoItems() {
    //   return this.$store.getters.storedTodoItems;
    // }
    ...mapGetters(["storedTodoItems"]),

    // // 서로 다른 이름으로 쓸 때는 {} 객체로 사용
    // Vuex에 선언한 속성을 컴포넌트의 특정 메서드에다가 연결하는 문법
    // ...mapGetters({
    //   todoItems: 'storedTodoItems'
    // })
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding-left: 0px;
  margin-top: 0;
  text-align: left;
}
li {
  display: flex;
  min-height: 50px;
  height: 50px;
  line-height: 50px;
  margin: 0.5rem 0;
  padding: 0 0.9rem;
  background: white;
  border-radius: 5px;
}
.removeBtn {
  margin-left: auto;
  color: #de4343;
}
.checkBtn {
  line-height: 45px;
  color: #62acde;
  margin-right: 5px;
}
.checkBtnCompleted {
  color: #b3adad;
}
.textCompleted {
  text-decoration: line-through;
  color: #b3adad;
}
/* list item transition effect https://v2.vuejs.org/v2/guide/transitions.html#List-Transitions*/
.list-enter-active,
.list-leave-active {
  /* 1초정도 지속 */
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>