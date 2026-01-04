(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/context/ThemeContext.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "THEMES",
    ()=>THEMES,
    "ThemeProvider",
    ()=>ThemeProvider,
    "useTheme",
    ()=>useTheme
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
const ThemeContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])();
const THEMES = {
    default: {
        name: 'Midnight',
        colors: {
            bg: 'bg-indigo-950',
            text: 'text-indigo-50',
            primary: 'indigo',
            sidebar: 'bg-indigo-950/50',
            card: 'bg-indigo-900'
        }
    },
    forest: {
        name: 'Forest',
        colors: {
            bg: 'bg-green-950',
            text: 'text-green-50',
            primary: 'emerald',
            sidebar: 'bg-green-950/50',
            card: 'bg-green-900'
        }
    },
    sunset: {
        name: 'Sunset',
        colors: {
            bg: 'bg-orange-950',
            text: 'text-orange-50',
            primary: 'orange',
            sidebar: 'bg-orange-950/50',
            card: 'bg-orange-900'
        }
    },
    ocean: {
        name: 'Ocean',
        colors: {
            bg: 'bg-cyan-950',
            text: 'text-cyan-50',
            primary: 'cyan',
            sidebar: 'bg-cyan-950/50',
            card: 'bg-cyan-900'
        }
    }
};
function ThemeProvider({ children }) {
    _s();
    const [theme, setTheme] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "ThemeProvider.useState": ()=>{
            if ("TURBOPACK compile-time truthy", 1) {
                return localStorage.getItem('focus-theme') || 'default';
            }
            //TURBOPACK unreachable
            ;
        }
    }["ThemeProvider.useState"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThemeProvider.useEffect": ()=>{
            localStorage.setItem('focus-theme', theme);
            // Update body class for global background
            const themeConfig = THEMES[theme];
            // Remove old theme classes from body
            Object.values(THEMES).forEach({
                "ThemeProvider.useEffect": (t)=>{
                    document.body.classList.remove(t.colors.bg);
                    document.body.classList.remove(t.colors.text);
                }
            }["ThemeProvider.useEffect"]);
            // Add new theme classes
            document.body.classList.add(themeConfig.colors.bg);
            document.body.classList.add(themeConfig.colors.text);
        }
    }["ThemeProvider.useEffect"], [
        theme
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ThemeContext.Provider, {
        value: {
            theme,
            setTheme,
            currentTheme: THEMES[theme]
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/context/ThemeContext.jsx",
        lineNumber: 77,
        columnNumber: 5
    }, this);
}
_s(ThemeProvider, "2nVXnYIH3qa52B2fn6WVFdLbYpg=");
_c = ThemeProvider;
function useTheme() {
    _s1();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(ThemeContext);
}
_s1(useTheme, "gDsCjeeItUuvgOWf1v4qoK9RF6k=");
var _c;
__turbopack_context__.k.register(_c, "ThemeProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/context/LanguageContext.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LanguageProvider",
    ()=>LanguageProvider,
    "useLanguage",
    ()=>useLanguage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
const translations = {
    zh: {
        // 导航
        'Focus.': '专注.',
        'Stay Productive': '保持高效',
        // 番茄钟
        'Timer': '番茄钟',
        'Focus': '专注',
        'Short Break': '短休',
        'Long Break': '长休',
        'Custom': '自定义',
        'Start': '开始',
        'Pause': '暂停',
        'Reset': '重置',
        // 白噪音
        'Ambience': '白噪音',
        'Rain': '雨声',
        'Fire': '篝火',
        'Cafe': '咖啡厅',
        'Ocean': '海浪',
        'Wind': '风声',
        'White Noise': '白噪音',
        // 任务清单
        'Tasks': '任务清单',
        'Add a new task...': '添加新任务...',
        'No tasks yet. Stay focused!': '暂无任务，保持专注！',
        'Task Statistics': '任务统计',
        'Total': '总任务',
        'Completed': '已完成',
        'Pending': '待完成',
        'Completion Rate': '完成率',
        'Today Completed': '今日完成',
        'Week Completed': '本周完成',
        'Progress': '完成进度',
        'Clear Completed': '清理已完成任务',
        'Time Statistics': '时间统计',
        'View Statistics': '查看统计',
        // 成就系统
        'Achievement Unlocked!': '成就解锁！',
        'Level Up!': '升级了！',
        'Share Your Focus': '分享你的专注',
        'Generate Card': '生成卡片',
        'Download': '下载',
        'Share': '分享',
        // 统计
        'Statistics': '统计数据',
        'Focus Sessions': '专注次数',
        'Total Time': '总时长',
        'Average Time': '平均时长',
        'Longest Session': '最长时长',
        'Current Streak': '当前连胜',
        'Longest Streak': '最长连胜',
        'Level': '等级',
        'XP': '经验值',
        'Achievements': '成就',
        'Achievement Progress': '成就进度',
        // 键盘音效
        'Keyboard Sound': '键盘音效',
        'Enable Keyboard Sound': '开启键盘音效',
        'Disable Keyboard Sound': '关闭键盘音效',
        // 主题
        'Themes (Free)': '主题 (免费)',
        'Current': '当前',
        // 通用
        'Loading...': '加载中...',
        'Error': '错误',
        'Success': '成功',
        'Cancel': '取消',
        'Confirm': '确认',
        'Save': '保存',
        'Delete': '删除',
        'Edit': '编辑',
        'Close': '关闭',
        'Awesome!': '太棒了！'
    },
    en: {
        // Navigation
        'Focus.': 'Focus.',
        'Stay Productive': 'Stay Productive',
        // Timer
        'Timer': 'Timer',
        'Focus': 'Focus',
        'Short Break': 'Short Break',
        'Long Break': 'Long Break',
        'Custom': 'Custom',
        'Start': 'Start',
        'Pause': 'Pause',
        'Reset': 'Reset',
        // Sound Player
        'Ambience': 'Ambience',
        'Rain': 'Rain',
        'Fire': 'Fire',
        'Cafe': 'Cafe',
        'Ocean': 'Ocean',
        'Wind': 'Wind',
        'White Noise': 'White Noise',
        // Todo List
        'Tasks': 'Tasks',
        'Add a new task...': 'Add a new task...',
        'No tasks yet. Stay focused!': 'No tasks yet. Stay focused!',
        'Task Statistics': 'Task Statistics',
        'Total': 'Total',
        'Completed': 'Completed',
        'Pending': 'Pending',
        'Completion Rate': 'Completion Rate',
        'Today Completed': 'Today Completed',
        'Week Completed': 'Week Completed',
        'Progress': 'Progress',
        'Clear Completed': 'Clear Completed',
        'Time Statistics': 'Time Statistics',
        'View Statistics': 'View Statistics',
        // Achievements
        'Achievement Unlocked!': 'Achievement Unlocked!',
        'Level Up!': 'Level Up!',
        'Share Your Focus': 'Share Your Focus',
        'Generate Card': 'Generate Card',
        'Download': 'Download',
        'Share': 'Share',
        // Statistics
        'Statistics': 'Statistics',
        'Focus Sessions': 'Focus Sessions',
        'Total Time': 'Total Time',
        'Average Time': 'Average Time',
        'Longest Session': 'Longest Session',
        'Current Streak': 'Current Streak',
        'Longest Streak': 'Longest Streak',
        'Level': 'Level',
        'XP': 'XP',
        'Achievements': 'Achievements',
        'Achievement Progress': 'Achievement Progress',
        // Keyboard Sound
        'Keyboard Sound': 'Keyboard Sound',
        'Enable Keyboard Sound': 'Enable Keyboard Sound',
        'Disable Keyboard Sound': 'Disable Keyboard Sound',
        // Themes
        'Themes (Free)': 'Themes (Free)',
        'Current': 'Current',
        // Common
        'Loading...': 'Loading...',
        'Error': 'Error',
        'Success': 'Success',
        'Cancel': 'Cancel',
        'Confirm': 'Confirm',
        'Save': 'Save',
        'Delete': 'Delete',
        'Edit': 'Edit',
        'Close': 'Close',
        'Awesome!': 'Awesome!'
    }
};
const LanguageContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])();
function LanguageProvider({ children }) {
    _s();
    const [language, setLanguage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "LanguageProvider.useState": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            return localStorage.getItem('focus-language') || 'zh';
        }
    }["LanguageProvider.useState"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LanguageProvider.useEffect": ()=>{
            localStorage.setItem('focus-language', language);
        }
    }["LanguageProvider.useEffect"], [
        language
    ]);
    const t = (key)=>{
        return translations[language][key] || key;
    };
    const switchLanguage = ()=>{
        setLanguage((prev)=>prev === 'zh' ? 'en' : 'zh');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LanguageContext.Provider, {
        value: {
            language,
            setLanguage,
            t,
            switchLanguage
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/context/LanguageContext.jsx",
        lineNumber: 194,
        columnNumber: 5
    }, this);
}
_s(LanguageProvider, "FMWhq/gbKOjMfUkwZNblxkLh8O8=");
_c = LanguageProvider;
function useLanguage() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
_s1(useLanguage, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "LanguageProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/layout.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RootLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$ThemeContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/ThemeContext.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$LanguageContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/LanguageContext.jsx [app-client] (ecmascript)");
'use client';
;
;
;
;
function RootLayout({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("html", {
        lang: "zh",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("head", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("title", {
                        children: "Focus - 番茄工作法"
                    }, void 0, false, {
                        fileName: "[project]/src/app/layout.js",
                        lineNumber: 11,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "description",
                        content: "一个美观、功能丰富的番茄工作法专注应用"
                    }, void 0, false, {
                        fileName: "[project]/src/app/layout.js",
                        lineNumber: 12,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/layout.js",
                lineNumber: 10,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("body", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$ThemeContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThemeProvider"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$LanguageContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LanguageProvider"], {
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/src/app/layout.js",
                        lineNumber: 16,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/layout.js",
                    lineNumber: 15,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/layout.js",
                lineNumber: 14,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/layout.js",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
_c = RootLayout;
var _c;
__turbopack_context__.k.register(_c, "RootLayout");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_d259786d._.js.map