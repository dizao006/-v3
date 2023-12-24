
//移除相关操作
export default function useRemove(todosRef) {
    const remove = (todo) => {
        todosRef.value.splice(todosRef.value.indexOf(todo), 1)
    }

    const removeAll = () => {
        todosRef.value = todosRef.value.filter((e) => {
            return !e.completed
        })
    }
    return {
        remove,
        removeAll
    }
}