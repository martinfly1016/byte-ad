// 渲染组件的通用函数
function renderComponent(selector, component, ...args) {
    const element = document.querySelector(selector);
    if (element) {
        element.innerHTML = component(...args);
    }
}

// 当前语言
let currentLang = 'zh';

// 获取翻译内容
function getTranslation(key) {
    const translations = {
        'zh': TRANSLATIONS_ZH,
        'en': TRANSLATIONS_EN,
        'ja': TRANSLATIONS_JA
    };
    
    // 通过点号分割的路径获取翻译值
    return key.split('.').reduce((obj, k) => obj && obj[k], translations[currentLang]) || key;
}

// 更新页面内容
function updatePageContent() {
    // 更新导航菜单
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.textContent = getTranslation(key);
    });

    // 更新页面标题
    document.title = getTranslation('site.title') + ' - ByteAd';
}

// 初始化语言选择器
function initLanguageSelector() {
    const selector = document.getElementById('language-selector');
    if (selector) {
        // 设置初始值
        selector.value = currentLang;
        
        // 添加切换事件
        selector.addEventListener('change', function(e) {
            currentLang = e.target.value;
            updatePageContent();
            // 保存语言选择到 localStorage
            localStorage.setItem('preferred-language', currentLang);
        });
    }
}

// 在页面加载时初始化语言
function initializeLanguage() {
    // 从 localStorage 获取已保存的语言选择
    const savedLang = localStorage.getItem('preferred-language');
    if (savedLang) {
        currentLang = savedLang;
    }
    
    // 初始化语言选择器
    initLanguageSelector();
    // 更新页面内容
    updatePageContent();
}

// 更新初始化组件函数
function initializeComponents() {
    renderComponent('header', COMPONENTS.header, CONFIG);
    renderComponent('footer', COMPONENTS.footer, CONFIG);
    initializeLanguage();
}

// 设置当前页面的活动导航项
function setActiveNavItem() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const activeLink = document.querySelector(`nav a[href="${currentPage}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// 当 DOM 加载完成后执行
document.addEventListener('DOMContentLoaded', initializeComponents); 