import {
    computed,
    ref
} from 'vue'


export default function useEditTodo(todosRef) {
    const editing = ref(null) //当前修改的是那个
    let origen = null //用来存取之前未改动的值
    const editTodo = (todo) => {
        //完成修改
        origen = todo.title
        editing.value = todo

    }
    const doneTodo = (todo) => {
        //设置状态修改完成
        editing.value = null
        if (!todo.title) {
            //如果为空删除
            todosRef.value.splice(todosRef.value.indexOf(todo), 1)
        }

    }
    const Escts = (todo) => {
        //取消修改
        editing.value = null
        todo.title = origen //还原之前未修改的值

    }

    const allDone = computed({
        get() {
            return todosRef.value.filter(e => !e.completed).length === 0
        },
    })

    function setAll(checked) {
        todosRef.value.forEach(element => {
            element.completed = checked
        });
    }
    return {
        editing,
        editTodo,
        doneTodo,
        Escts,
        allDone,
        setAll
    }
}