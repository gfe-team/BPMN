import type { App } from 'vue';
import 'xe-utils';
import {
    // 核心
    VXETable,

    // 表格功能
    Header,
    // Footer,
    // Icon,
    // Filter,
    // Edit,
    // Menu,
    // Export,
    // Keyboard,
    // Validator,

    // 可选组件
    Column,
    // Colgroup,
    // Grid,
    // Tooltip,
    // Toolbar,
    Pager,
    // Form,
    // FormItem,
    // FormGather,
    // Checkbox,
    // CheckboxGroup,
    // Radio,
    // RadioGroup,
    // RadioButton,
    // Switch,
    // Input,
    // Select,
    // Optgroup,
    // Option,
    // Textarea,
    // Button,
    // Modal,
    // List,
    // Pulldown,

    // 表格
    Table
} from 'vxe-table';
import 'vxe-table/lib/style.css';


// vxe-table组件全局参数
VXETable.setup({
    size: "mini",
    zIndex: 999,
    // i18n: (key, args) => i18n.global.t(key, args),
    icon: {
        PAGER_JUMP_PREV: 'iconfont icon-page-first',
        PAGER_JUMP_NEXT: 'iconfont icon-page-last',
        PAGER_PREV_PAGE: 'iconfont icon-icon_paging_left',
        PAGER_NEXT_PAGE: 'iconfont icon-icon_paging_right',
        PAGER_JUMP_MORE: 'iconfont icon-page-down',
    },
    // 版本号，对于某些带数据缓存的功能有用到，上升版本号可以用于重置数据
    // version: 0, 
    table: {
        showHeader: true,
        keepSource: false,
        animat: true,
        delayHover: 250,
        showOverflow: true,
        showHeaderOverflow: null,
        showFooterOverflow: null,
        size: null,
        resizable: true,
        autoResize: true,
        stripe: false,
        border: false,
        round: false,
        emptyText: '暂无数据',
        radioConfig: {
            trigger: 'default'
        },
        checkboxConfig: {
            strict: false,
            highlight: false,
            range: false,
            trigger: 'default'
        },
        sortConfig: {
            remote: false,
            trigger: 'default',
            orders: ['asc', 'desc', null],
        },
        filterConfig: {
            remote: false,
        },
        expandConfig: {
            trigger: 'default',
            showIcon: true
        },
        treeConfig: {
            children: 'children',
            hasChild: 'hasChild',
            indent: 20,
            showIcon: true
        },
        tooltipConfig: {
            theme: 'dark',
            enterable: false
        },
        // rowId: '_XID', // 行数据的唯一主键字段名
        editConfig: {
            mode: 'cell',
            showAsterisk: true
        },
        importConfig: {
            modes: ['insert', 'covering']
        },
        exportConfig: {
            modes: ['current', 'selected']
        },
        customConfig: {
            storage: false
        },
        scrollX: {
            gt: 60
        },
        scrollY: {
            gt: 100
        }
    },
    grid: {
        size: null,
        zoomConfig: {
            escRestore: true
        },
        pagerConfig: {
            perfect: false
        },
        toolbarConfig: {
            perfect: false
        },
        proxyConfig: {
            autoLoad: true,
            message: true,
            props: {
                list: null, // 用于列表，读取响应数据
                result: 'result', // 用于分页，读取响应数据
                total: 'page.total' // 用于分页，读取总条数
            },
            beforeItem: null,
            beforeColumn: null,
            beforeQuery: null,
            afterQuery: null,
            beforeDelete: null,
            afterDelete: null,
            beforeSave: null,
            afterSave: null
        }
    },
    pager: {
        size: null,
        autoHidden: false,
        perfect: false,
        pageSize: 10,
        pagerCount: 7,
        pageSizes: [10, 15, 20, 50, 100],
        layouts: ['PrevJump', 'PrevPage', 'Jump', 'PageCount', 'NextPage', 'NextJump', 'Sizes', 'Total']
    },
    // form: {
    //   preventSubmit: false
    //   validConfig: {
    //     autoPos: true
    //   },
    //   size: null,
    //   colon: false,
    //   titleAsterisk: true
    // },
    // input: {
    //   size: null,
    //   transfer: false
    //   parseFormat: 'yyyy-MM-dd HH:mm:ss.SSS',
    //   labelFormat: '',
    //   valueFormat: '',
    //   startWeek: 1,
    //   digits: 2,
    //   controls: true
    // },
    // textarea: {
    //   size: null
    //   autosize: {
    //     minRows: 1,
    //     maxRows: 10
    //   }
    // },
    // select: {
    //   size: null,
    //   transfer: false,
    //   multiCharOverflow: 8
    // },
    // toolbar: {
    //   size: null,
    //   import: {
    //     mode: 'covering'
    //   },
    //   export: {
    //     types: ['csv', 'html', 'xml', 'txt']
    //   },
    //   custom: {
    //     isFooter: true
    //   },
    //   buttons: [],
    //   tools: []
    // },
    // button: {
    //   size: null,
    //   transfer: false
    // },
    // radio: {
    //   size: null
    // },
    // checkbox: {
    //   size: null
    // },
    // switch: {
    //   size: null
    // },
    // modal: {
    //   // size: null,
    //   minWidth: 340,
    //   minHeight: 200,
    //   lockView: true,
    //   mask: true,
    //   duration: 3000,
    //   marginSize: 0,
    //   dblclickZoom: true,
    //   showTitleOverflow: true
    //   storage: false
    // },
    // list: {
    //   scrollY: {
    //     gt: 100
    //   }
    // }
})



VXETable.formats.add('emptyholder', ({ cellValue }) => {
    if (cellValue === undefined
        || cellValue === null
        || cellValue === ''
        || (toString.call(cellValue) === `[object String]` && cellValue.trim() === ''))

        return '--';

    return cellValue;
})



export function setupVxe(app: App<Element>) {

    // 表格功能
    app.use(Header)
        // .use(Footer)
        // .use(Icon)
        // .use(Filter)
        // .use(Edit)
        // .use(Menu)
        // .use(Export)
        // .use(Keyboard)
        // .use(Validator)

        // 可选组件
        .use(Column)
        // .use(Colgroup)
        // .use(Grid)
        // .use(Tooltip)
        // .use(Toolbar)
        .use(Pager)
        // .use(Form)
        // .use(FormItem)
        // .use(FormGather)
        // .use(Checkbox)
        // .use(CheckboxGroup)
        // .use(Radio)
        // .use(RadioGroup)
        // .use(RadioButton)
        // .use(Switch)
        // .use(Input)
        // .use(Select)
        // .use(Optgroup)
        // .use(Option)
        // .use(Textarea)
        // .use(Button)
        // .use(Modal)
        // .use(List)
        // .use(Pulldown)

        // 安装表格
        .use(Table)
}
