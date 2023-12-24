//这里用于做筛选的显示
import {
    ref,
    onMounted,
    onUnmounted,
    computed
} from "vue"
import {
    filters
} from "../util/index"
const validHash = ["all", 'active', "completed"]
export default function useFillter(todosRef) {
    const visiableRef = ref('all')
    const onHashChange = () => {
        const hash = location.hash.replace(/#\/?/, '') //
        console.log(hash)
        if (validHash.includes(hash)) {
            //判断写入的hash是否在数组中，如果存在在数组中
            visiableRef.value = hash
        } else { //如果不在数组
            location.hash = '' //制为空,并且展示全部的
            visiableRef.value = "all"
        }
    }
    //组件挂载完成时创建哈希
    onMounted(() => {
        window.addEventListener("hashchange", onHashChange)
    })

    //销毁
    onUnmounted(() => {
        window.removeEventListener("hashchange", onHashChange)
    })

    const filteredRef = computed(() => {
        return filters(todosRef.value, visiableRef.value)
        //根据哈希值，返回不同的任务列表
    })
    return {
        visiableRef, //根据这个的值展示所需要的展示的内容，交出去
        filteredRef //返回最新的任务列表
    }
}