<template>
  <div id="app">
    <todo-header></todo-header>
    <todo-input v-on:addTodoItem="addOneItem"></todo-input>
    <!-- todoItems를 propsdata로 받아서 todolist로 내림 -->
    <todo-list
      v-bind:propsdata="todoItems"
      v-on:removeItem="removeOneItem"
      v-on:toggleItem="toggleOneItem"
    ></todo-list>
    <todo-footer v-on:clearAll="clearAllItems"></todo-footer>
  </div>
</template>

<script>
import TodoHeader from "./components/TodoHeader.vue";
import TodoInput from "./components/TodoInput.vue";
import TodoList from "./components/TodoList.vue";
import TodoFooter from "./components/TodoFooter.vue";

export default {
  // 향상된 객체 리터럴 적용 (data: function()와 같은 :function() 수정)
  data() {
    return {
      // store로 감
      todoItems: [],
    };
  },
  methods: {
    addOneItem(todoItem) {
      const obj = { completed: false, item: todoItem };
      // 저장하는 로직
      /**
       * JSON.stringfy: 자바스크립트 객체를 스트링으로 변환.
       * 이런 api없이 그냥 넣으면 숫자일 경우 object로 value에 들어감. */
      localStorage.setItem(todoItem, JSON.stringify(obj));
      this.todoItems.push(obj);
    },
    removeOneItem(todoItem, index) {
      localStorage.removeItem(todoItem.item);
      this.todoItems.splice(index, 1);
    },
    toggleOneItem(todoItem, index) {
      // todoItem.completed = !todoItem.completed;
      // 밑에가 컴포넌트간의 경계를 더욱 명확하게 함.
      this.todoItems[index].completed = !this.todoItems[index].completed;
      // 로컬 스토리지의 데이터 갱신
      localStorage.removeItem(todoItem.item);
      localStorage.setItem(todoItem.item, JSON.stringify(todoItem));
    },
    clearAllItems() {
      localStorage.clear();
      this.todoItems = [];
    },
  },
  // created() { // store.js로 이동
  //   if (localStorage.length > 0) {
  //     for (let i = 0; i < localStorage.length; i++) {
  //       if (localStorage.key(i) !== "loglevel:webpack-dev-server") {
  //         // this.todoItems.push(localStorage.key(i));
  //         // TodoInput.vue에서 JSON.stringify로 object를 String으로 바꿈.
  //         // 이거를 다시 object로 받아와야됨.localstorage의 특성상 그렇게 해야된다고 함.
  //         // console.log(JSON.parse(localStorage.getItem(localStorage.key(i)))); // value값
  //         this.todoItems.push(
  //           JSON.parse(localStorage.getItem(localStorage.key(i)))
  //         );
  //       }
  //     }
  //   }
  // },
  components: {
    /**
     * 객체의 속성명과 값 명이 동일할 때 축약 가능
     * 'TodoHeader': TodoHeader -> 그냥 TodoHeader로 
     */
    TodoHeader,
    TodoInput,
    TodoList,
    TodoFooter
  },
};
</script>

<style>
body {
  text-align: center;
  background-color: #f6f6f6;
}

input {
  border-style: groove;
  width: 200px;
}

.shadow {
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
}
</style>