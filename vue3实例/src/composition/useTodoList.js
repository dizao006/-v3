import {
    ref,
    watchEffect
} from "vue";
import * as todoStorage from "../util/index";
//在这里抽离出来方法，简化app组件里的内容，只需要在app里导入并且使用本js
export default function useTodoList() {
    const todosRef = ref(todoStorage.fetch()); //调取util里的方法，一开始的时候获取本地的任务列表
    watchEffect(() => {
        //监控        
        todoStorage.save(todosRef.value);
    });
    return {
        todosRef
    }
}