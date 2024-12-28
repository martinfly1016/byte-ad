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
    initMobileMenu();
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

// 菜单处理函数
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    const body = document.body;
    let isMenuOpen = false;

    if (menuToggle && navMenu) {
        // 菜单切换事件
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            isMenuOpen = !isMenuOpen;
            
            if (isMenuOpen) {
                navMenu.classList.add('active');
                body.style.overflow = 'hidden';
                menuToggle.innerHTML = '✕'; // 切换为关闭图标
            } else {
                navMenu.classList.remove('active');
                body.style.overflow = '';
                menuToggle.innerHTML = '☰'; // 切换回汉堡图标
            }
        });

        // 点击菜单项关闭菜单
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function(e) {
                navMenu.classList.remove('active');
                body.style.overflow = '';
                menuToggle.innerHTML = '☰';
                isMenuOpen = false;
            });
        });

        // 点击页面其他区域关闭菜单
        document.addEventListener('click', function(e) {
            if (isMenuOpen && !e.target.closest('nav')) {
                navMenu.classList.remove('active');
                body.style.overflow = '';
                menuToggle.innerHTML = '☰';
                isMenuOpen = false;
            }
        });

        // 监听窗口大小变化
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                navMenu.classList.remove('active');
                body.style.overflow = '';
                menuToggle.innerHTML = '☰';
                isMenuOpen = false;
            }
        });
    }
}

// 确保在 DOM 加载完成后初始化菜单
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
}); 