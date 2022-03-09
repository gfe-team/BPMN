import { defineComponent, onMounted, watch, ref } from "vue";
import _ from 'lodash'
import { userInfo, userRole } from '@/components/bpmn/refactor/service'
import { message } from 'ant-design-vue'

export default defineComponent({
    name: "bpmn",
    props: {
        visible: Boolean,
        title: String,
        leftTitle: String,
        isType: Number,
        selectUser: Array,
        selectRole: Array,
        tenantId: String,
        single: Boolean,
        tenantList: Array,
        tenantName: String
    },
    setup(prop, context) {
        const isVisible = ref(prop.visible)
        const tit = ref(prop.title)
        const leftTit = ref(prop.leftTitle)
        const searchName = ref('')
        const type = ref(prop.isType)
        const userList = ref([])
        const roleList = ref([])
        const selectUsersList = ref(prop.selectUser || [])
        const selectRolesList = ref(prop.selectRole || [])
        const allUsersList = ref([])
        const allRolesList = ref([])

        const tenantLists = ref(prop.tenantList || [])
        const tenantIds = ref(prop.tenantId || null)
        const tenantName = ref(prop.tenantName || '')

        watch(() => prop.visible, (newVal, oldVal) => {
            isVisible.value = newVal;
            (newVal && tenantIds.value) && getData()
        })
        watch(() => prop.tenantId, (newVal, oldVal) => {
            tenantIds.value = newVal;
            (isVisible.value) && getData()
        })

        watch(() => prop.tenantList, (newVal, oldVal) => {
            tenantLists.value = newVal
        })
        watch(() => prop.isType, (newVal, oldVal) => {
            tenantIds.value = prop.tenantId
            type.value = newVal
            getData()
        })
        watch(() => prop.title, (newVal, oldVal) => {
            tit.value = newVal
        })
        watch(() => prop.leftTitle, (newVal, oldVal) => {
            leftTit.value = newVal
        })
        watch(() => prop.selectUser, (newVal, oldVal) => {
            selectUsersList.value = newVal
        })
        watch(() => prop.selectRole, (newVal, oldVal) => {
            selectRolesList.value = newVal
        })
        watch(() => isVisible.value, (newVal, oldVal) => {
            if (newVal) {
                selectUsersList.value = prop.selectUser
                selectRolesList.value = prop.selectRole
            }
        })

        onMounted(() => {
        })
        const getData = () => {
            if (!tenantIds.value) return
            const dItem = tenantLists.value.filter((item: any) => item.tenantId === tenantIds.value)[0] as any
            dItem && (tenantName.value = dItem.tenantName)
            if (type.value === 1) {
                const data = userInfo.find(u => u.tenantId === tenantIds.value)
                userList.value = data.list
                allUsersList.value = data.list
            } else if (type.value === 2) {
                const data = userRole.find(u => u.tenantId === tenantIds.value)
                roleList.value = data.list
                allRolesList.value = data.list
            }
        }
        const onCancel = () => {
            isVisible.value = false
            tenantLists.value.length > 0 && (tenantIds.value = null)
            userList.value = []
            roleList.value = []
            selectUsersList.value = []
            selectRolesList.value = []
            allUsersList.value = []
            allRolesList.value = []
            searchName.value = ''
            context.emit('cancel')
        }
        const onOk = () => {
            context.emit('save', type.value === 1 ? selectUsersList.value : selectRolesList.value, tenantIds.value)
            onCancel()
        }
        const onSearch = () => {
            if (type.value === 1) {
                userList.value = searchName.value ? allUsersList.value.filter(item => item.userName.includes(searchName.value)) : allUsersList.value
            } else if (type.value === 2) {
                roleList.value = searchName.value ? allRolesList.value.filter(item => item.roleName.includes(searchName.value)) : allRolesList.value
            }
        }
        const settings = (item) => {
            const dItem = {
                tenantId: tenantIds.value,
                tenantName: tenantName.value,
                ...item
            }
            if (type.value === 1 && !_.find(selectUsersList.value, { userId: item.userId, tenantId: tenantIds.value })) {
                if (!prop.single) {
                    selectUsersList.value = [dItem]
                } else {
                    selectUsersList.value = [...selectUsersList.value, dItem]
                }
            } else if (type.value === 2 && !_.find(selectRolesList.value, { roleCode: item.roleCode, tenantId: tenantIds.value })) {
                selectRolesList.value = [...selectRolesList.value, dItem]
            }
        }
        const delEl = (item) => {
            if (type.value === 1) {
                selectUsersList.value = selectUsersList.value.filter((a: any) => a.userId !== item.userId && a.tenantId === item.tenantId)
            } else if (type.value === 2) {
                selectRolesList.value = selectRolesList.value.filter((a: any) => a.roleCode !== item.roleCode && a.tenantId === item.tenantId)
            }
        }
        const tenantChange = () => {
            getData()
        }

        return {
            isVisible,
            tit,
            leftTit,
            searchName,
            type,
            userList,
            roleList,
            selectUsersList,
            selectRolesList,
            tenantLists,
            tenantIds,
            onCancel,
            onOk,
            settings,
            onSearch,
            delEl,
            tenantChange
        }
    },
    render() {
        return (
            <>
                <a-modal class='gd-bpmn-user-role' visible={this.isVisible} title={this.tit} width='650px' onCancel={this.onCancel} onOk={this.onOk}>
                    {
                        this.tenantLists.length > 0 && (
                            <div>
                                <span>租户：</span>
                                {/* @change="updateBaseInfo('tenantId')" */}
                                <a-select placeholder="选择租户" onChange={this.tenantChange} v-model:value={this.tenantIds} style="width:250px;">
                                    {
                                        this.tenantLists.map(item => {
                                            return <a-select-option key={item.tenantId} value={item.tenantId}>
                                                {item.tenantName}
                                            </a-select-option>
                                        })
                                    }
                                </a-select>
                            </div>
                        )
                    }
                    <div class="assignee-content">
                        <div class="left">
                            <a-card class="gd-card" size="small" title={this.leftTit}>
                                <div class="gd-left-content-search">
                                    <a-input-search placeholder="请输入名称" enter-button="查询" size="default" onSearch={this.onSearch} v-model:value={this.searchName} class="assignee-search" />
                                </div>
                                <div class="left-content">
                                    {
                                        this.type === 1 && (
                                            this.userList.map(item => {
                                                return <p key={item.userId} onClick={() => { this.settings(item) }}>{item.userName}</p>
                                            })
                                        )
                                    }
                                    {
                                        this.type === 2 && (
                                            this.roleList.map(item => {
                                                return <p key={item.roleCode} onClick={() => { this.settings(item) }}>{item.roleName}</p>
                                            })
                                        )
                                    }
                                </div>
                            </a-card>
                        </div >
                        <div class="right">
                            <a-card class="gd-card" size="small" title="已选择">
                                <div class="right-content">
                                    {
                                        this.type === 1 && (
                                            this.selectUsersList.map(item => {
                                                return <p key={item.userId} class={this.tenantLists.length > 0 ? 'special-p' : ''}>
                                                    <span>{`${this.tenantLists.length > 0 && item.tenantName ? item.tenantName + '-' : ""} ${item.userName}`}</span>
                                                    <i class="gd-close iconfont icon-guanbi" style='font-style: inherit;margin-right: 10px;' onClick={() => { this.delEl(item) }} >X</i>
                                                </p>
                                            })
                                        )
                                    }
                                    {
                                        this.type === 2 && (
                                            this.selectRolesList.map(item => {
                                                return <p class={this.tenantLists.length > 0 ? 'special-p' : ''} key={item.roleCode}>
                                                    <span style="width: 95%;display: block;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
                                                        {`${this.tenantLists.length > 0 && item.tenantName ? item.tenantName + '-' : ""} ${item.roleName}`}
                                                    </span>
                                                    <i class="gd-close iconfont icon-guanbi" style='font-style: inherit;margin-right: 10px;' onClick={() => { this.delEl(item) }} >X</i>
                                                </p >
                                            })
                                        )
                                    }
                                </div >
                            </a-card >
                        </div >
                    </div>
                </a-modal>
            </>
        )
    }
})
