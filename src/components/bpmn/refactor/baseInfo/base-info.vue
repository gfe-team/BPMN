<template>
    <div class="panel-tab__content">
       <a-form :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
            <a-form-item label="流程名称" >
                <a-input v-model:value="elementProcessBaseInfo.name" placeholder="请输入流程名称" @change="updateBaseInfo('name')" :maxLength='100' />
            </a-form-item>
            <a-form-item label="流程分类" >
                <a-input v-model:value="elementProcessBaseInfo.targetNamespace" @change="updateBpmnBaseInfo('targetNamespace')" placeholder="请输入流程分类" :maxLength='100' />
            </a-form-item>
            <a-form-item label="流程编码" >
                <a-input class="gd-input" disabled v-model:value="elementProcessBaseInfo.id" @change="updateBaseInfo('id')" placeholder="请输入流程编码" :maxLength='100' />
            </a-form-item>
            <a-form-item label="设置抄送处理人">
                <a-input class='gd-input gd-pointer' v-model:value='elementProcessBaseInfo.copyToUserNames' @click="settingCopy(1)"  placeholder="请选择处理人" :readOnly='true'  />
            </a-form-item>
            <a-form-item label="设置抄送角色">
                <a-input class='gd-input gd-pointer' v-model:value='elementProcessBaseInfo.copyToRoleNames' @click="settingCopy(2)"   placeholder="请选择角色" :readOnly='true'  />
            </a-form-item>
            <a-form-item label="表单" >
                <a-select show-search placeholder="选择表单" v-model:value="elementProcessBaseInfo.formId" @change="updateBaseInfo('formId')" :filter-option="filterOption">
                    <a-select-option v-for="(item,$index) in formList" :key='$index' :value="item.id">
                        {{item.name}}
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="流程说明" >
                <a-textarea v-model:value="elementProcessBaseInfo.documentation" @change="updateProcessDocumentation('documentation')" :maxLength='100' placeholder="请输入流程说明" :auto-size="{ minRows: 2, maxRows: 6 }" />
            </a-form-item>
        </a-form>
        <!-- :tenantId="elementProcessBaseInfo.tenantId" -->
        <user-role :single="true" :tenantList='tenantList' :selectUser="elementProcessBaseInfo.selectUsersList" :selectRole="elementProcessBaseInfo.selectRolesList" :isType="isType" :visible="isVisible" :title="title" :leftTitle="leftTitle" @cancel="onCancel" @save="onSave"></user-role>
    </div>
</template>
<script>
import userRole from '@/components/bpmn/refactor/userOrRole'
import { formData, tenantList } from '@/components/bpmn/refactor/service'
export default {
    name: 'baseInfo',
    props: {
        businessObject: Object
    },
    components: {
        userRole
    },
    data () {
        return {
            activeKey: 1,
            elementProcessBaseInfo: {
                targetNamespace: '',// 流程名称
                id: '',
                name: '',
                documentation: '',
                formId: null, // 表单id
                copyToRoles: '', // 角色
                copyToRoleNames: '',
                copyToUsers: '', // 人员
                copyToUserNames: '',
                tenantId: null,  // 租户id
                selectRolesList: [],
                selectUsersList: []
            },
            tenantList: [],
            formList: [],
            isVisible: false,
            title: '选择人员',
            leftTitle: '',
            isType: 1
        }
    },
    computed: {
    },
    watch: {
        businessObject: {
            immediate: false,
            handler: function (val) {
                if (val) {
                    this.$nextTick(() => this.resetBaseInfo());
                }
            }
        },
        'elementProcessBaseInfo.formId' (val) {
            this.$emit('updataFormId', val)
        }
    },
    mounted () {
        this.resetBaseInfo()
        this.getProcessKey()
        this.getFormList()
        this.getQuerySubTenants()
    },
    methods: {
        // 获取表单
        getFormList () {
            this.formList = formData
        },
        filterOption (input, option) {
            return (
                option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
            );
        },
        // 获取流程定义key
        getProcessKey () {
            this.elementProcessBaseInfo.id = 'PC_2022030817090731'
            this.updateBaseInfo('id')
        },
        resetBaseInfo () {
            if (!this.bpmnInstances) return
            this.bpmnElement = this.bpmnInstances.elementRegistry.find(el => el.type === "bpmn:Process");// this.bpmnInstances.bpmnElement
            let info = Object.assign(this.elementProcessBaseInfo, JSON.parse(JSON.stringify(this.bpmnElement.businessObject)));
            info.formId && (info.formId = Number(info.formId))
            info.targetNamespace = this.bpmnInstances.modeler._definitions.targetNamespace // 流程名称
            const documentations = this.bpmnElement.businessObject.documentation // 流程说明
            info.documentation = documentations && documentations.length ? documentations[0].text : "";
            if (typeof info.selectRolesList === "string") {
                info.selectRolesList = JSON.parse(info.selectRolesList)
            }
            if (typeof info.selectUsersList === "string") {
                info.selectUsersList = JSON.parse(info.selectUsersList)
            }
            this.elementProcessBaseInfo = info
        },
        updateBaseInfo (key) {
            const attrObj = Object.create(null);
            attrObj[key] = this.elementProcessBaseInfo[key];
            if (key === "id") {
                this.updateProperties({
                    id: this.elementProcessBaseInfo[key],
                    di: { id: `${this.elementProcessBaseInfo[key]}_di` }
                });
            } else if (key === 'selectRolesList' || key === 'selectUsersList') {
                attrObj[key] = JSON.stringify(this.elementProcessBaseInfo[key])
                this.updateProperties(attrObj);
            } else {
                this.updateProperties(attrObj);
            }
        },
        updateProperties (attrObj) {
            this.bpmnInstances.modeling.updateProperties(this.bpmnElement, attrObj);
        },
        updateBpmnBaseInfo (key) {
            this.bpmnInstances.modeler._definitions[key] = this.elementProcessBaseInfo[key]
        },
        updateProcessDocumentation (key) {
            const documentation = this.bpmnInstances.bpmnFactory.create("bpmn:Documentation", { text: this.elementProcessBaseInfo[key] });
            this.updateProperties({
                documentation: [documentation]
            });
        },
        // 获取子租户
        async getQuerySubTenants () {
            this.tenantList = tenantList
        },
        // 选择 人员或角色
        settingCopy (type) {
            this.isType = type
            this.isVisible = true
            if (type === 1) {
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
        onSave (arr) {
            const info = this.elementProcessBaseInfo
            if (this.isType === 1) {
                info.selectUsersList = arr
                info.copyToUserNames = info.selectUsersList.map(item => {
                    return `${item.tenantName ? item.tenantName + '-' : ''}${item.userName}`
                }).join(';')
                info.copyToUsers = info.selectUsersList.map(item => {
                    return `${item.tenantId}#${item.userId}`
                }).join(',')
                this.updateBaseInfo('selectUsersList')
                this.updateBaseInfo('copyToUserNames')
                this.updateBaseInfo('copyToUsers')
            } else if (this.isType === 2) {
                info.selectRolesList = arr
                info.copyToRoleNames = info.selectRolesList.map(item => {
                    return `${item.tenantName ? item.tenantName + '-' : ''}${item.roleName}`
                }).join(';')
                info.copyToRoles = info.selectRolesList.map(item => {
                    return `${item.tenantId}#${item.roleCode}`
                }).join(',')
                this.updateBaseInfo('selectRolesList')
                this.updateBaseInfo('copyToRoleNames')
                this.updateBaseInfo('copyToRoles')
            }
        }
    },
    beforeUnmount () {
        this.bpmnElement = null;
    }
}
</script>
<style lang="less">
</style>


