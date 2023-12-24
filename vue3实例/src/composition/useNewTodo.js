//新增相关
import {
    ref
} from "vue";
export default function useNewTodo(todosRef) {
    const newTodoRef = ref('')
    const addTodo = function () {
        if (!newTodoRef.value) {
            return
        }
        //如果有内容
        const todo = {
            title: newTodoRef.value,
            completed: false, //任务是否完成
            id: Date.now() //利用时间戳当id
        }
        todosRef.value.push(todo)
        newTodoRef.value = ''
    }
    return {
        addTodo,
        newTodoRef
    }
}