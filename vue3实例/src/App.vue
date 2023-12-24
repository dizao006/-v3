<template>
  <div id="app">
    <section class="todoapp">
      <header class="header">
        <h1>todos</h1>
        <input
          class="new-todo"
          autofocus=""
          autocomplete="off"
          placeholder="What needs to be done?"
          v-model="newTodoRef"
          @keyup.enter="addTodo"
        />
      </header>
      <section class="main">
        <input
          id="toggle-all"
          class="toggle-all"
          :checked="allDone"
          @input="setAll($event.target.checked)"
          type="checkbox"
        />
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
          <li
            class="todo"
            v-for="item in filteredRef"
            :key="item.id"
            :class="{ completed: item.completed, editing: item === editing }"
          >
            <!-- 这里是用来判断是否完成的，如果完成的话加上内样式，横线消除 -->
            <div class="view">
              <input class="toggle" type="checkbox" v-model="item.completed" />
              <label @dblclick="editTodo(item)">{{ item.title }}</label>
              <button class="destroy" @click="remove(item)"></button>
            </div>
            <input
              class="edit"
              type="text"
              @blur="doneTodo(item)"
              @keydown.enter="doneTodo"
              @keyup.escape="Escts(item)"
              v-model="item.title"
            />
          </li>
        </ul>
      </section>
      <footer class="footer">
        <span class="todo-count">
          <strong>{{ filteredRef.length }}</strong>
          <span>items left</span>
        </span>
        <ul class="filters">
          <li>
            <!-- 这里用来判断哈希是否为对应值，并且添加上内样式 -->
            <a href="#/all" :class="{ selected: visiableRef === 'all' }">All</a>
          </li>
          <li>
            <a href="#/active" :class="{ selected: visiableRef === 'active' }"
              >Active</a
            >
          </li>
          <li>
            <a
              href="#/completed"
              :class="{ selected: visiableRef === 'completed' }"
              >Completed</a
            >
          </li>
        </ul>
        <button class="clear-completed" @click="removeAll" v-show="filteredRef.length">
          Clear completed
        </button>
      </footer>
    </section>
  </div>
</template>

<script>
import useTodoList from "./composition/useTodoList";
import useNewTodo from "./composition/useNewTodo";
import useFilter from "./composition/useFilter";
import useEditTodo from "./composition/useEditTodo";
import useRemove from "./composition/useRemove";
export default {
  setup() {
    const { todosRef } = useTodoList();
    return {
      //通过这样的方法，将组合方法里面的东西全部返回
      ...useNewTodo(todosRef), //将初始化的列表传递给新增组件，用以新增
      ...useFilter(todosRef),
      ...useEditTodo(todosRef),
      ...useRemove(todosRef),
    };
  },
};
</script>

<style>
</style>