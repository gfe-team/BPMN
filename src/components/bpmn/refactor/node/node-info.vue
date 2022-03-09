<template>
    <div class="panel-tab__content">
        <a-form :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
            <a-form-item label="节点名称" v-if='bpmnElement.type!=="bpmn:Process"'>
                <a-input v-model:value="elementBaseInfo.name" placeholder="请输入节点名称" @change="updateBaseInfo('name')" :maxLength='100' />
            </a-form-item>
            <a-form-item label="租户" v-if='bpmnElement.type==="bpmn:UserTask"'>
                <a-select placeholder="请选择" v-model:value="elementBaseInfo.tenantId" @change="updateBaseInfo('tenantId')">
                    <a-select-option v-for="(item,$index) in tenantList" :key="$index" :value="item.tenantId">
                        {{item.tenantName}}
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="签收类型" v-if='bpmnElement.type==="bpmn:UserTask"'>
                    <a-radio-group v-model:value="elementBaseInfo.assigneeType" @change="resetInfo(),updateBaseInfo('assigneeType')">
                        <a-radio :value="1">指定人</a-radio>
                        <a-radio :value="2">指定角色</a-radio>
                        <a-radio :value="3">其他</a-radio>
                    </a-radio-group>
            </a-form-item>
            <a-form-item label="签收人或角色" v-if='bpmnElement.type==="bpmn:UserTask" && elementBaseInfo.assigneeType!=3'>
                <a-input class='gd-input gd-pointer' :value="getAssignees"  placeholder="请选择" :readOnly='true' @click="settings"  />
            </a-form-item>
            <a-form-item label="签收人" v-if='bpmnElement.type==="bpmn:UserTask" && elementBaseInfo.assigneeType==3'>
                <a-input class='gd-input gd-pointer' v-model:value="elementBaseInfo.otherAssignee"  placeholder="请选择" @change="updateBaseInfo('otherAssignee'),setAssignee()" />
            </a-form-item>
            <a-form-item label="处理时间" v-if='bpmnElement.type==="bpmn:UserTask"'>
                <a-input v-model:value="elementBaseInfo.dueDateHour" placeholder="请输入任务处理时间" @change="updateDueDate('dueDateHour')" addon-after="小时"/>
            </a-form-item>
            <a-form-item label="条件类型" v-if='bpmnElement.type==="bpmn:SequenceFlow"'>
                <a-select placeholder="选择条件类型" v-model:value="elementBaseInfo.expressionType" @change="updateBaseInfo('expressionType')">
                    <a-select-option v-for="(item,$index) in expressionList" :key='$index' :value="item.id">
                        {{item.name}}
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="表达式" v-if='bpmnElement.type==="bpmn:SequenceFlow"'>
                <a-input v-model:value="elementBaseInfo.expression" placeholder="请输入表达式" @change="updateExpression('expression')" :maxLength='100' />
            </a-form-item>
        </a-form>
        <user-role :selectUser="elementBaseInfo.assigneeNames" :tenantName='tenantName' :single="false" :selectRole="elementBaseInfo.candidateGroupsNames" :isType="elementBaseInfo.assigneeType" :visible="isVisible" :title="title" :leftTitle="leftTitle" :tenantId="elementBaseInfo.tenantId" @cancel="onCancel" @save="onSave"></user-role>
    </div>
</template>
<script>
/* eslint-disable vue/multi-word-component-names */
import { tenantList } from '@/components/bpmn/refactor/service'
import { message } from 'ant-design-vue'

import userRole from '@/components/bpmn/refactor/userOrRole'

export default {
    name: 'nodeinfo',
    props: {
        businessObject: Object,
        tenantId: {
            type: String,
            default: ''
        }
    },
    components: {
        userRole
    },
    data () {
        return {
            treeData: [],// 部门列表
            bpmnElement: {},
            elementBaseInfo: {
                name: '',
                assignee: '', // 签收人
                assigneeNames: [],// 签收人 自定义
                candidateUsers: '', // 候选人
                candidateUsersNames: [],//  自定义
                candidateGroups: '', // 候选组
                candidateGroupsNames: [],// 候选组 自定义
                dueDate: '', // 到期时间 PT1H (PT固定格式)
                dueDateHour: '', // 小时  自定义
                tenantId: null, // 租户id
                tenantName: '', // 租户名称
                expression: '', // 表达式
                expressionType: '1', // 条件类型
                assigneeType: 1, // 签收类型
                otherAssignee: ''
            },
            isLoopCharacteristics: true, // 任务类型 是 并行多实例 或 顺序多实例 可以选择多个签收人 默认是只能选择一个
            tenantList: [], // 租户
            expressionList: [
                {
                    id: '1',
                    name: '表达式'
                }
            ], // 条件类型
            isVisible: false,
            title: '选择人员',
            leftTitle: '',
            isType: 1
        }
    },
    computed: {
        getAssignees () {
            if (this.elementBaseInfo.assigneeType === 1 && this.elementBaseInfo.assigneeNames.length > 0) {
                return this.elementBaseInfo.assigneeNames.map(item => {
                    return item.userName
                }).join(';')
            } else if (this.elementBaseInfo.assigneeType === 2 && this.elementBaseInfo.candidateGroupsNames.length > 0) {
                return this.elementBaseInfo.candidateGroupsNames.map(item => {
                    return item.roleName
                }).join(';')
            }
            return ''
        }
    },
    watch: {
        businessObject: {
            immediate: false,
            handler: function (val) {
                if (val) {
                    this.$nextTick(() => this.resetBaseInfo());
                }
            }
        }
    },
    mounted () {
        this.resetBaseInfo()
        this.getQuerySubTenants()
    },
    methods: {
        // 初始化节点信息
        resetBaseInfo () {
            const bpmnElement = this.bpmnInstances.bpmnElement
            this.bpmnElement = bpmnElement
            if (this.bpmnInstances.bpmnElement.type !== 'bpmn:Process') {
                const businessObject = JSON.parse(JSON.stringify(this.bpmnInstances.bpmnElement.businessObject));
                const info = this.elementBaseInfo
                Object.keys(info).forEach(key => {
                    if (['assigneeNames', 'candidateGroupsNames', 'candidateUsersNames'].includes(key)) {
                        info[key] = businessObject[key] ? JSON.parse(businessObject[key]) : []
                    } else if (key === 'expression' && businessObject.conditionExpression) {
                        info[key] = businessObject.conditionExpression.body || ''
                    } else if (key === 'assigneeType') {
                        info[key] = businessObject[key] ? Number(businessObject[key]) : 1
                    } else if (key === 'tenantId') {
                        info[key] = businessObject[key] || null
                    } else {
                        info[key] = businessObject[key] || ''
                    }
                });
            } else {
                Object.keys(this.elementBaseInfo).forEach(key => (this.elementBaseInfo[key] = ""));
            }
            this.setIsLoopCharacteristics()
        },
        setIsLoopCharacteristics () {
            const businessObject = JSON.parse(JSON.stringify(this.bpmnInstances.bpmnElement.businessObject));
            this.isLoopCharacteristics = !businessObject.loopCharacteristics
        },
        // 更新相应字段
        updateBaseInfo (key) {
            if (this.bpmnInstances.bpmnElement.type === 'bpmn:Process') return
            const attrObj = Object.create(null);
            attrObj[key] = this.elementBaseInfo[key];
            if (key === "id") {
                this.updateProperties({
                    id: this.elementBaseInfo[key],
                    di: { id: `${this.elementBaseInfo[key]}_di` }
                });
            } else if (['assigneeNames', 'candidateGroupsNames', 'candidateUsersNames'].includes(key)) {
                attrObj[key] = JSON.stringify(this.elementBaseInfo[key])
                this.updateProperties(attrObj);
            } else {
                this.updateProperties(attrObj);
            }
            // 获取租户名称
            if (key === 'tenantId') {
                const dItem = this.tenantList.filter(item => item.tenantId === this.elementBaseInfo[key])[0]
                this.elementBaseInfo.tenantName = dItem && (dItem.tenantName)
            }
        },
        // 任务处理时间
        updateDueDate (key) {
            if (this.bpmnInstances.bpmnElement.type === 'bpmn:Process') return
            this.elementBaseInfo[key] = this.elementBaseInfo[key].replace(/\D/g, '')
            const attrObj = Object.create(null);
            attrObj[key] = this.elementBaseInfo[key];
            this.updateProperties(attrObj);
            this.updateProperties({
                'dueDate': `PT${this.elementBaseInfo[key]}H`
            });
        },
        updateProperties (attrObj) {
            this.bpmnInstances.modeling.updateProperties(this.bpmnInstances.bpmnElement, attrObj);
        },
        // 获取子租户
        getQuerySubTenants () {
            this.tenantList = tenantList
        },
        setDefaultTenantId () {
            this.tenantList.length > 0 && !this.elementBaseInfo.tenantId && (this.elementBaseInfo.tenantId = this.tenantList[0].tenantId, this.updateBaseInfo('tenantId'))
        },
        // 更新表达式
        updateExpression () {
            var conditionExpression = this.bpmnInstances.moddle.create('bpmn:FormalExpression', { body: this.elementBaseInfo.expression });
            this.updateProperties({ conditionExpression: conditionExpression });
        },
        settings () {
            if (!this.elementBaseInfo.tenantId) {
                message.warning('请先选择租户');
                return
            }
            this.setIsLoopCharacteristics()
            this.isVisible = true
            if (this.elementBaseInfo.assigneeType === 1) {
                this.leftTitle = `选择指定人员`
                this.title = '选择人员'
            } else {
                this.leftTitle = `选择指定角色`
                this.title = '选择角色'
            }
        },
        onCancel () {
            this.isVisible = false
        },
        resetInfo () {
            this.resetGroups()
            this.resetAssignee()
        },
        resetGroups () {
            const info = this.elementBaseInfo
            const businessObject = this.bpmnInstances.bpmnElement.businessObject
            info.candidateGroupsNames = []
            info.candidateGroups = ''
            info.otherAssignee = ''
            delete businessObject.candidateGroups
            delete businessObject.candidateGroupsNames
            delete businessObject.otherAssignee
        },
        resetAssignee () {
            const info = this.elementBaseInfo
            const businessObject = this.bpmnInstances.bpmnElement.businessObject
            info.assignee = ''
            info.assigneeNames = []
            info.otherAssignee = ''
            delete businessObject.assignee
            delete businessObject.assigneeNames
            delete businessObject.otherAssignee
        },
        onSave (arr) {
            const info = this.elementBaseInfo
            if (arr.length <= 0) {
                this.resetGroups()
                this.resetAssignee()
                return
            }
            if (info.assigneeType === 1) { // 签收人
                info.assigneeNames = arr
                if (this.isLoopCharacteristics) { // 普通 用户任务
                    info.assignee = info.assigneeNames.map(item => {
                        return `${info.tenantId}#${item.userId}`
                    }).join(',')
                    this.updateBaseInfo('assignee')
                } else { // 并行多实例或者顺序多实例用户任务
                    const attrObj = Object.create(null);
                    info.assignee = info.assigneeNames.map(item => {
                        return `'${info.tenantId}#${item.userId}'`
                    }).join(',')
                    attrObj["assignee"] = '${assignee}';
                    this.updateProperties(attrObj);
                    const multiLoopInstance = this.bpmnInstances.bpmnElement.businessObject.loopCharacteristics;
                    this.bpmnInstances.modeling.updateModdleProperties(this.bpmnInstances.bpmnElement, multiLoopInstance, {
                        collection: `\${myService.listUser(${info.assignee})}`,
                        elementVariable: 'assignee'
                    });
                }
                this.updateBaseInfo('assigneeNames')
            } else if (info.assigneeType === 2) { // 角色
                info.candidateGroupsNames = arr
                info.candidateGroups = info.candidateGroupsNames.map(item => {
                    return `${info.tenantId}#${item.roleCode}`
                }).join(',')
                this.updateBaseInfo('candidateGroups')
                this.updateBaseInfo('candidateGroupsNames')
            }
        },
        setAssignee () {
            const attrObj = Object.create(null);
            attrObj["assignee"] = this.elementBaseInfo.otherAssignee;
            this.updateProperties(attrObj);
        }
    },
    beforeUnmount () {
        this.bpmnElement = null;
    }
}
</script>
<style scoped lang="less">
.assignee-header {
  .title {
    height: 34px;
    line-height: 34px;
  }
  .assignee-item {
    min-height: 40px;
    max-height: 75px;
    overflow: hidden;
    overflow-y: auto;
    span {
      position: relative;
      display: inline-block;
      padding: 6px 30px;
      border: 1px solid transparent;
      background-color: #fff;
      border-color: #d9d9d9;
      border-radius: 40px;
      margin-right: 8px;
      margin-bottom: 5px;
      .gd-close {
        position: absolute;
        right: 9px;
        top: 6px;
        font-size: 12px;
        cursor: pointer;
      }
    }
  }
}
.assignee-content {
  display: flex;
  height: 420px;
  margin-top: 5px;
  .left,
  .right {
    flex: 1;
    height: 100%;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
  }
  .left {
    margin-right: 5px;
    overflow: hidden;
    overflow-y: auto;
  }
  .right {
    margin-left: 5px;
    overflow: hidden;
    overflow-y: auto;
    padding: 10px;
    span {
      display: inline-block;
      padding: 4px 12px;
      border: 1px solid transparent;
      background-color: #fff;
      border-color: #d9d9d9;
      border-radius: 40px;
      margin-right: 8px;
      margin-bottom: 5px;
      cursor: pointer;
      &.active {
        color: #fff;
        background-color: #2ccfa4;
        border-color: #2ccfa4;
      }
    }
  }
}
</style>
