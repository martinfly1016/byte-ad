// 渲染组件的通用函数
function renderComponent(selector, component, ...args) {
    const element = document.querySelector(selector);
    if (element) {
        element.innerHTML = component(...args);
    }
}

// 初始化页面组件
function initializeComponents() {
    // 渲染导航栏
    renderComponent('header', COMPONENTS.header, CONFIG);
    
    // 渲染页脚
    renderComponent('footer', COMPONENTS.footer, CONFIG);

    // 根据当前页面设置活动导航项
    setActiveNavItem();

    // 初始化语言选择器
    initLanguageSelector();
}

// 设置当前页面的活动导航项
function setActiveNavItem() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const activeLink = document.querySelector(`nav a[href="${currentPage}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// 初始化语言选择器
function initLanguageSelector() {
    const selector = document.getElementById('language-selector');
    if (selector) {
        selector.addEventListener('change', function(e) {
            // 这里可以添加语言切换的逻辑
            console.log('Language changed to:', e.target.value);
        });
    }
}

// 当 DOM 加载完成后执行
document.addEventListener('DOMContentLoaded', initializeComponents); 