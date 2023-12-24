//再次获取和保存内容
const project = "test"
export function fetch() {
    const result = localStorage.getItem(project)
    if (result) {
        return JSON.parse(result)
    }
    return []
}


export function save(todos) {
    localStorage.setItem(project, JSON.stringify(todos))
}

    

export function filters(todos, visiableRef) {
    //在这里针对数据进行处理，根据哈希值，返回任务列表
    if (visiableRef === "all") {
        return todos
    }
    if (visiableRef === "active") {
        return todos.filter((e) => {
            return !e.completed
        })
    }
    if (visiableRef === "completed") {
        return todos.filter((e) => {
            return e.completed
        })
    }

}