export const formData = [
    {
        "id": 30,
        "tenantId": "1",
        "name": "表单1",
        "description": "333",
        "content": "{\"list\":[{\"type\":\"input\",\"typeName\":\"单行文字\",\"typeDesc\":\"单行文本输入框，需要填写者在输入框内根据标题填写相应的内容。\",\"icon\":\"icon-input\",\"options\":{\"title\":\"单行文字\",\"width\":\"100%\",\"defaultValue\":\"\",\"defaultValueType\":\"1\",\"required\":false,\"uniqued\":false,\"limitLength\":false,\"limitMin\":\"\",\"limitMax\":\"\",\"dataType\":\"string\",\"pattern\":\"\",\"tips\":\"\",\"disabled\":false,\"permissions\":\"WRITE_READ\",\"rules\":[]},\"key\":\"1642731387000_60819\",\"model\":\"input_1642731387000_60819\"}],\"config\":{\"labelWidth\":100,\"labelPosition\":\"right\",\"size\":\"small\"}}"
    },
    {
        "id": 28,
        "tenantId": "1",
        "name": "表单2",
        "description": "asdasd",
        "content": "{\"list\":[{\"type\":\"input\",\"typeName\":\"单行文字\",\"typeDesc\":\"单行文本输入框，需要填写者在输入框内根据标题填写相应的内容。\",\"icon\":\"icon-input\",\"options\":{\"title\":\"单行文字\",\"width\":\"100%\",\"defaultValue\":\"\",\"defaultValueType\":\"1\",\"required\":false,\"uniqued\":false,\"limitLength\":false,\"limitMin\":\"\",\"limitMax\":\"\",\"dataType\":\"string\",\"pattern\":\"\",\"tips\":\"\",\"disabled\":false,\"permissions\":\"WRITE_READ\",\"rules\":[]},\"key\":\"1642730031000_117\",\"model\":\"input_1642730031000_117\"}],\"config\":{\"labelWidth\":100,\"labelPosition\":\"right\",\"size\":\"small\"}}"
    },
    {
        "id": 27,
        "tenantId": "1",
        "name": "表单3",
        "description": "0120",
        "content": "{\"list\":[{\"type\":\"radio\",\"typeName\":\"单项选择\",\"typeDesc\":\"选择组件，可以自定义编辑和增删选项，填写者需要进行单项选择。\",\"icon\":\"icon-radio\",\"options\":{\"title\":\"单项选择\",\"layout\":\"inline\",\"showLabel\":false,\"tips\":\"\",\"options\":[{\"key\":\"key_1\",\"value\":\"未命名 1\"},{\"key\":\"key_2\",\"value\":\"未命名 2\"},{\"key\":\"key_3\",\"value\":\"未命名 3\"},{\"key\":\"key_91380\",\"value\":\"未命名 91380\"},{\"key\":\"key_10530\",\"value\":\"未命名 10530\"}],\"required\":false,\"width\":\"100%\",\"defaultValue\":\"key_2\",\"defaultValueType\":\"1\",\"remote\":false,\"remoteOptions\":[],\"props\":{\"value\":\"value\",\"label\":\"label\"},\"remoteFunc\":\"\",\"disabled\":false,\"permissions\":\"WRITE_READ\",\"rules\":[]},\"key\":\"1642666803000_44634\",\"model\":\"radio_1642666803000_44634\"},{\"type\":\"select\",\"typeName\":\"下拉选择\",\"typeDesc\":\"选择组件，可以自定义编辑和增删选项，填写者通过下拉框进行单项选择。\",\"icon\":\"icon-select\",\"options\":{\"title\":\"下拉选择\",\"width\":\"100%\",\"defaultValue\":\"key_56110\",\"defaultValueType\":\"1\",\"multiple\":false,\"disabled\":false,\"clearable\":false,\"placeholder\":\"\",\"required\":false,\"showLabel\":false,\"options\":[{\"key\":\"key_1\",\"value\":\"未命名 1\"},{\"key\":\"key_2\",\"value\":\"未命名 2\"},{\"key\":\"key_3\",\"value\":\"未命名 3\"},{\"key\":\"key_56110\",\"value\":\"未命名 56110\"},{\"key\":\"key_26879\",\"value\":\"未命名 26879\"}],\"remote\":false,\"filterable\":false,\"remoteOptions\":[],\"props\":{\"value\":\"value\",\"label\":\"label\"},\"remoteFunc\":\"\",\"tips\":\"\",\"permissions\":\"WRITE_READ\",\"rules\":[]},\"key\":\"1642666811000_50090\",\"model\":\"select_1642666811000_50090\"},{\"type\":\"checkbox\",\"typeName\":\"多项选择\",\"typeDesc\":\"选择组件，可以自定义编辑和增删选项，还可以设置填写者选择的数量规则（最多选几个、最少选几个）\",\"icon\":\"icon-check-box\",\"options\":{\"title\":\"多项选择\",\"width\":\"100%\",\"inline\":true,\"defaultValue\":[\"key_3\",\"key_2\",\"key_47143\"],\"defaultValueType\":\"1\",\"showLabel\":false,\"options\":[{\"key\":\"key_1\",\"value\":\"未命名 1\"},{\"key\":\"key_2\",\"value\":\"未命名 2\"},{\"key\":\"key_3\",\"value\":\"未命名 3\"},{\"key\":\"key_47126\",\"value\":\"未命名 47126\"},{\"key\":\"key_47143\",\"value\":\"未命名 47143\"}],\"required\":false,\"remote\":false,\"remoteOptions\":[],\"props\":{\"value\":\"value\",\"label\":\"label\"},\"remoteFunc\":\"\",\"disabled\":false,\"tips\":\"\",\"layout\":\"inline\",\"permissions\":\"WRITE_READ\",\"rules\":[]},\"key\":\"1642666814000_70572\",\"model\":\"checkbox_1642666814000_70572\"}],\"config\":{\"labelWidth\":100,\"labelPosition\":\"right\",\"size\":\"small\"}}"
    }
]

export const tenantList = [
    {
        "tenantId": "1",
        "tenantName": "test1系统"
    },
    {
        "tenantId": "2",
        "tenantName": "test2系统"
    },
    {
        "tenantId": "3",
        "tenantName": "test3系统"
    }
]

export const userInfo = [
    {
        tenantId: '1',
        list: [
            {
                "userId": "1",
                "userName": "张三"
            },
            {
                "userId": "2",
                "userName": "李四"
            },
        ]
    },
    {
        tenantId: '2',
        list: [
            {
                "userId": "1",
                "userName": "张三111"
            },
            {
                "userId": "2",
                "userName": "李四2222"
            },
        ]
    },
    {
        tenantId: '3',
        list: [
            {
                "userId": "1",
                "userName": "张三3333"
            },
            {
                "userId": "2",
                "userName": "李四44444"
            },
        ]
    }
]

export const userRole = [
    {
        tenantId: '1',
        list: [
            {
                "roleCode": "1",
                "roleName": "超级管理员"
            },
            {
                "roleCode": "2",
                "roleName": "管理员"
            }
        ]
    },
    {
        tenantId: '2',
        list: [
            {
                "roleCode": "1",
                "roleName": "超级管理员222"
            },
            {
                "roleCode": "2",
                "roleName": "管理员222"
            }
        ]
    },
    {
        tenantId: '3',
        list: [
            {
                "roleCode": "1",
                "roleName": "超级管理员333"
            },
            {
                "roleCode": "2",
                "roleName": "管理员333"
            }
        ]
    }
]