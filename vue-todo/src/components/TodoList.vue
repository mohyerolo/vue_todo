<template>
  <div>
    <ul>
      <li
        v-for="(todoItem, index) in todoItems"
        v-bind:key="todoItem.item"
        class="shadow"
      >
      <!-- completed가 false면 적용되지 않음-->
        <i class="fa-solid fa-check checkBtn" v-bind:class="{checkBtnCompleted: todoItem.completed}" 
            v-on:click="toggleComplete(todoItem, index)"></i>
        <span v-bind:class="{textCompleted: todoItem.completed}"> {{ todoItem.item }}</span>
        <span class="removeBtn" v-on:click="removeTodo(todoItem, index)">
          <i class="fa-solid fa-trash"></i>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      todoItems: [],
    };
  },
  methods: {
    removeTodo: function (todoItem, index) {
      console.log(todoItem, index);
      localStorage.removeItem(todoItem);
      this.todoItems.splice(index, 1);
    },
    toggleComplete: function (todoItem) {
        // console.log(todoItem, index);
        todoItem.completed = !todoItem.completed;
        // 로컬 스토리지의 데이터 갱신
        localStorage.removeItem(todoItem.item);
        localStorage.setItem(todoItem.item, JSON.stringify(todoItem));
    },
  },
  created: function () {
    if (localStorage.length > 0) {
      for (var i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i) !== "loglevel:webpack-dev-server") {
          // this.todoItems.push(localStorage.key(i));
          // TodoInput.vue에서 JSON.stringify로 object를 String으로 바꿈.
          // 이거를 다시 object로 받아와야됨.localstorage의 특성상 그렇게 해야된다고 함.
          console.log(JSON.parse(localStorage.getItem(localStorage.key(i)))); // value값
          this.todoItems.push(
            JSON.parse(localStorage.getItem(localStorage.key(i)))
          );
        }
      }
    }
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
</style>