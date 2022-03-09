<template>
    <div class="process-panel__container" :style="{ width: `${this.width}px` }">
       <div class="process-content">
           <a-tabs type="card" default-active-key="1" :tab-position="tabPosition">
                <a-tab-pane key="1" tab="基础信息">
                    <base-info ref='baseInfo' :business-object="elementBusinessObject" @updataFormId='updataFormId' :isEdit='isEdit' :tenantId='tenantId'></base-info>
                </a-tab-pane>
                 <a-tab-pane key="2" tab="节点信息">
                    <node-info :business-object="elementBusinessObject" :tenantId='tenantId'></node-info>
                </a-tab-pane>
                <a-tab-pane key="3" tab="表单属性设置">
                    <form-info :business-object="elementBusinessObject" :form-id="formId" :tenantId='tenantId'></form-info>
                </a-tab-pane>
            </a-tabs>
       </div>
    </div>
</template>
<script>
import nodeInfo from './refactor/node/node-info.vue'
import baseInfo from './refactor/baseInfo/base-info.vue'
import formInfo from './refactor/form/form.vue'

export default {
    name: 'panel',
    componentName: "MyPropertiesPanel",
    props: {
        businessObject: Object,
        width: {
            type: Number,
            default: 480
        },
        isEdit: {
            type: Boolean,
            default: true
        },
        tenantId: {
            type: String,
            default: ''
        }
    },
    provide () {
        return {
            width: this.width
        };
    },
    components: {
        nodeInfo,
        baseInfo,
        formInfo
    },
    computed: {
    },
    watch: {
        businessObject: {
            immediate: false,
            handler: function (val) {
                if (val) {
                    this.elementBusinessObject = val
                }
            }
        }
    },
    data () {
        return {
            elementBusinessObject: null,
            tabPosition: 'top',
            formId: ''
        }
    },
    mounted () {
        // this.initModels()
    },
    methods: {
        updataFormId (id) {
            this.formId = id
        }
    },
}
</script>
<style lang="less">
@import './theme/process-panel.less';
.btn {
  height: 40px;
  line-height: 40px;
  text-align: right;
  button {
    &:first-child {
      margin-right: 10px;
    }
  }
}
</style>


