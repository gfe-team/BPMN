/**
 * 汉化包
 */
interface Translations {
	[key: string]: string
}
export const translations: Translations = {
	'Activate the hand tool': '激活手形工具',
	'Activate the lasso tool': '激活套索工具',
	'Activate the create/remove space tool': '激活“创建/删除空间”工具',
	'Activate the global connect tool': '激活全局连接工具',
	'Create StartEvent': '创建开始事件',
	'Create Intermediate/Boundary Event': '创建中间/边界事件',
	'Create EndEvent': '创建结束事件',
	'Create Gateway': '创建网关',
	'Create Task': '创建任务',
	'Create User Task': '创建用户任务',
	'Create expanded SubProcess': '创建扩展的子流程',
	'Create DataObjectReference': '创建数据对象引用',
	'Create DataStoreReference': '创建数据存储引用',
	'Create Pool/Participant': '创建池/参与者',
	'Create Group': '创建组',
	'Exclusive Gateway': '排斥网关',
	'Parallel Gateway': '并行网关',
	'Inclusive Gateway': '包含网关',
	'Complex Gateway': '复杂网关',
	'Event based Gateway': '基于事件网关',
	'Message Start Event': '消息启动事件',
	'Timer Start Event': '定时启动事件',
	'Conditional Start Event': '条件启动事件',
	'Signal Start Event': '信号启动事件',
	'Error Start Event': '错误启动事件',
	'Escalation Start Event': '升级启动事件',
	'Compensation Start Event': '补偿启动事件',
	'Message Start Event (non-interrupting)': '消息启动事件 (非中断)',
	'Timer Start Event (non-interrupting)': '定时启动事件 (非中断)',
	'Conditional Start Event (non-interrupting)': '条件启动事件 (非中断)',
	'Signal Start Event (non-interrupting)': '信号启动事件 (非中断)',
	'Escalation Start Event (non-interrupting)': '升级启动事件 (非中断)',
	'Start Event': '开始事件',
	'End Event': '开始事件',
	'Intermediate Throw Event': '中间异常事件',
	'Message End Event': '消息结束事件',
	'Escalation End Event': '升级结束事件',
	'Error End Event': '错误结束事件',
	'Compensation End Event': '恢复结束事件',
	'Signal End Event': '信号结束事件',
	'Terminate End Event': '终止结束事件',
	"User Task": "用户任务",
	'Append User Task': '添加用户任务',
	'Task': '任务',
	'Send Task': '发送任务',
	'Receive Task': '接收任务',
	'Manual Task': '手动任务',
	'Business Rule Task': '业务规则任务',
	'Service Task': '服务任务',
	'Script Task': '脚本任务',
	'Call Activity': '调用活动',
	'Sub Process (collapsed)': '子流程（折叠）',
	'Sub Process (expanded)': '子流程（展开）',
	'Append EndEvent': '添加结束事件',
	'Append Intermediate/Boundary Event': '添加中间/边界事件',
	'Change type': '更改类型',
	'Connect using Sequence/MessageFlow or Association': '使用Sequence/MessageFlow或Association进行连接',
	'Append Gateway': '添加网关',
	'Append TextAnnotation': '添加文本注释',
	'Remove': '删除',
	'Append Task': '添加任务',
	'Parallel Multi Instance': '并行多实例',
	'Sequential Multi Instance': '顺序多实例',
	'Loop': '循环',
	'Collapsed Pool': '折叠池',
	'Expanded Pool': '展开池',
	'Add Lane above': '上方添加一道',
	'Divide into two Lanes': '分成两道',
	'Divide into three Lanes': '分成三道',
	'Add Lane below': '下方添加一道',
	'Connect using DataInputAssociation': '使用DataInputAssociation进行连接',

	'General': '通用',
	'Forms': '表单',
	'Listeners': '监听器',
	'Extensions': '扩展',
	'Id': 'ID',
	'This maps to the process definition key.': '此值会映射为流程定义KEY值。',
	'Name': '名称',
	'Version Tag': '版本标签',
	'Executable': '可执行',
	'External Task Configuration': '外部任务配置',
	'Task Priority': '任务优先级',
	'Job Configuration': '作业配置',
	'Job Priority': '作业优先级',
	'Candidate Starter Configuration': '流程启动候选配置',
	'Candidate Starter Groups': '候选组',
	'Specify more than one group as a comma separated list.': '多个候选组之间用逗号隔开。',
	'Candidate Starter Users': '候选用户',
	'Specify more than one user as a comma separated list.': '多个候选用户之间用逗号隔开',
	'History Configuration': '历史数据配置',
	'History Time To Live': '历史数据存活时间',
	'Tasklist Configuration': '任务清单配置',
	'Startable': '可启动',
	'Documentation': '文档',
	'Element Documentation': '元素文档',
	'Execution Listener': '执行监听器',
	'Event Type': '事件类型',
	'start': '开始',
	'end': '结束',
	'Listener Type': '监听器类型',
	'Java Class': 'Java 类',
	'Expression': '表达式',
	'Delegate Expression': '代理表达式',
	'Script': '脚本',
	'Script Format': '脚本格式',
	'Script Type': '脚本类型',
	'Must provide a value': '必须提供一个值',
	'Field Injection': '字段注入',
	'Fields': '字段',
	'Inline Script': '内联脚本',
	'External Resource': '外部资源',
	'Resource': '资源',
	'Properties': '属性',
	'Add Property': '增加属性',
	'Value': '值',
	'Details': '详细',
	'Initiator': '发起人',
	'Asynchronous Continuations': '异步连续',
	'Asynchronous Before': '异步之前',
	'Asynchronous After': '异步之后',
	'Form Key': '表单标识（KEY）',
	'Form Fields': '表单字段',
	'Business Key': '业务标识（KEY）',
	'Form Field': '表单字段',
	'ID (process variable name)': 'ID（流程变量名称）',
	'Type': '类型',
	'string': '字符串',
	'long': '整型',
	'boolean': '布尔',
	'date': '日期',
	'enum': '枚举',
	'custom type': '自定义类型',
	'Label': '标签（Label）',
	'Default Value': '默认值',
	'Validation': '约束',
	'Add Constraint': '添加约束',
	'Config': '配置',
	'Task Listener': '任务监听器',
	'Listener Id': '监听器ID',
	'create': '创建',
	'assignment': '分配',
	'complete': '完成',
	'delete': '删除',
	'update': '更新',
	'timeout': '超时',
	'take': '经过',
	'Must provide a value for timeout task listener': '必须为超时任务监听器配置一个值',
	'Input/Output': '输入/输出',
	'Parameters': '参数',
	'Input Parameters': '输入参数',
	'Input Parameter': '输入参数',
	'String': '字符串',
	'Text': '文本（Text）',
	'List': '列表（List）',
	'Map': '映射（Map）',
	'Output Parameters': '输出参数',
	'Add Entry': '添加Entry',
	'Add Value': '添加值',
	'Key': '键（Key）',
	'Condition Type': '条件类型',
	'Parameter must have a name': '参数必须有一个名称',
	'Exclusive': '排除',
	'Retry Time Cycle': '重试时间周期',
	'Assignee': '签收人',
	'Candidate Users': '候选人',
	'Candidate Groups': '候选组',
	'Due Date': '到期时间',
	'The due date as an EL expression (e.g. ${someDate} or an ISO date (e.g. 2015-06-26T09:54:00)': '到期时间可以是一个EL表达式 (例如： ${someDate} 或者是一个ISO日期 (例如： 2015-06-26T09:54:00)',
	'Follow Up Date': '更新日期',
	'The follow up date as an EL expression (e.g. ${someDate} or an ISO date (e.g. 2015-06-26T09:54:00)': '更新日期可以是一个EL表达式 (例如 ${someDate} 或者是一个 ISO日期 (例如： 2015-06-26T09:54:00)',
	'Priority': '优先级',
	'Append ReceiveTask': '追加接收任务',
	'Append MessageIntermediateCatchEvent': '附加消息中间捕获事件',
	'Append TimerIntermediateCatchEvent': '附加计时器中间捕获事件',
	'Append ConditionIntermediateCatchEvent': '附加条件中间捕获事件',
	'Append SignalIntermediateCatchEvent': '附加信号中间匹配事件',
	"Message Intermediate Catch Event": "消息中间捕获事件",
	"Message Intermediate Throw Event": "消息中间抛出事件",
	"Timer Intermediate Catch Event": "定时中间捕获事件",
	"Escalation Intermediate Throw Event": "升级中间抛出事件",
	"Conditional Intermediate Catch Event": "条件中间捕获事件",
	"Link Intermediate Catch Event": "链接中间捕获事件",
	"Link Intermediate Throw Event": "链接中间抛出事件",
	"Compensation Intermediate Throw Event": "补偿中间抛出事件",
	"Signal Intermediate Catch Event": "信号中间捕获事件",
	"Signal Intermediate Throw Event": "信号中间抛出事件",
}