<template>
    <div class="panel-tab__content">
        <div v-if="bpmnElement.type==='bpmn:StartEvent' || bpmnElement.type==='bpmn:UserTask'">
            <div style="margin-bottom:10px;" v-if='formDetail'>表单名称：{{formDetail ?formDetail.name:""}}</div>
            <div style="margin-bottom:10px;">
                <a-button type="default" shape="round" @click="updateForm(0)">全部读写</a-button>
                <a-button type="default" shape="round" style="margin-left:10px;" @click="updateForm(1)">全部只读</a-button>
                <a-button type="default" shape="round" style="margin-left:10px;" @click="updateForm(2)">全部不可见</a-button>
                <a-button type="primary" shape="round" style="margin-left:10px;" @click="refresh">刷新</a-button>
            </div>
            <vxe-table class="gd-process-table" align="left"  header-row-class-name="table-header" cell-class-name="table-cell"  border="full"  round :autoResize="true" :data="content.list">
                <vxe-table-column field="name" title="字段名称">
                    <template #default="{ row }">
                        {{row.options.title}}
                    </template>
                </vxe-table-column>
                <vxe-table-column field="operation" title="操作" width="180">
                    <template #default="{ row }">
                        <a-radio-group :options="options" v-model:value="row.options.permissions" @change="updateJSONXml" :default-value="row.options.permissions" class="gd-process-radio" />
                    </template>
                </vxe-table-column>
            </vxe-table>
       </div>
    </div>
</template>
<script>
import { formData } from '@/components/bpmn/refactor/service'
export default {
    name: 'formInfo',
    props: {
        businessObject: Object,
        formId: [String, Number]
    },
    data () {
        return {
            bpmnElement: {},
            elementFormInfo: {
                jsonXml: []
            },
            formDetail: {},
            content: {},
            options: [
                { label: '读写', value: 'WRITE_READ' },
                { label: '只读', value: 'READ' },
                { label: '不可见', value: 'DISABLED' }
            ]
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
        formId () {
            this.$nextTick(async () =>
                await this.getFormById()
            );
        }
    },
    async mounted () {
        this.resetBaseInfo()
        await this.getFormById()
    },
    methods: {
        // 根据表单id 获取详情
        async getFormById () {
            const data = formData.find(f => f.id === this.formId)
            this.formDetail = data
            this.content = data.content && JSON.parse(data.content)
            this.setData()
        },
        setData (permissions) {
            this.content.list && (this.content.list.map(item => {
                if (permissions) item.options.permissions = permissions
                else {
                    const dItem = this.elementFormInfo.jsonXml.filter(x => x.key === item.key)[0]
                    item.options.permissions = dItem ? dItem.options.permissions : 'DISABLED'
                }
            }))
            permissions && this.refresh()
        },
        updateForm (type) {
            this.setData(type === 0 ? 'WRITE_READ' : type === 1 ? 'READ' : type === 2 ? 'DISABLED' : 'DISABLED')
        },
        // 刷新表单
        refresh () {
            this.updateJSONXml()
        },
        // 初始化节点信息
        resetBaseInfo () {
            this.bpmnElement = this.bpmnInstances.bpmnElement
            if (this.bpmnInstances.bpmnElement.type !== 'bpmn:Process') {
                const businessObject = JSON.parse(JSON.stringify(this.bpmnInstances.bpmnElement.businessObject));
                Object.keys(this.elementFormInfo).forEach(key => {
                    if (key === 'jsonXml') {
                        this.elementFormInfo[key] = businessObject[key] ? JSON.parse(businessObject[key]) : []
                        this.setData()
                    }
                });
            } else {
                Object.keys(this.elementFormInfo).forEach(key => (this.elementFormInfo[key] = ""));
            }
        },
        updateJSONXml () {
            this.elementFormInfo.jsonXml = this.content.list
            this.updateBaseInfo('jsonXml')
        },
        // 更新相应字段
        updateBaseInfo (key) {
            if (this.bpmnElement.type === 'bpmn:Process') return
            const attrObj = Object.create(null);
            if (key === "id") {
                this.updateProperties({
                    id: this.elementFormInfo[key],
                    di: { id: `${this.elementFormInfo[key]}_di` }
                });
            } else if (key === 'jsonXml') {
                attrObj[key] = JSON.stringify(this.elementFormInfo[key]);
                this.updateProperties(attrObj);
            } else {
                attrObj[key] = this.elementFormInfo[key];
                this.updateProperties(attrObj);
            }
        },
        updateProperties (attrObj) {
            this.bpmnInstances.modeling.updateProperties(this.bpmnInstances.bpmnElement, attrObj);
        }
    },
    beforeUnmount () {
        this.bpmnElement = {};
    }
}
</script>
<style lang="less">
.gd-process-radio {
  span.ant-radio + * {
    padding-right: 0px;
    padding-left: 3px;
  }
  .ant-radio-wrapper {
    margin-right: 4px;
    font-size: 12px;
  }
}
.gd-process-table {
  .ant-table-thead > tr > th,
  .ant-table-tbody > tr > td {
    padding: 10px 0px;
  }
}
</style>
