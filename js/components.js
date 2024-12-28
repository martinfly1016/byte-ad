const COMPONENTS = {
    // 导航栏组件
    header: (config) => `
        <nav>
            <div class="container">
                <h1>${config.site.name}</h1>
                <button class="menu-toggle" aria-label="Toggle menu">
                    ☰
                </button>
                <ul>
                    <li><a href="index.html" class="home" data-i18n="nav.home">首页</a></li>
                    <li><a href="about.html" class="about" data-i18n="nav.about">关于我们</a></li>
                    <li><a href="services.html" class="services" data-i18n="nav.services">产品与服务</a></li>
                    <li><a href="#cases" class="cases" data-i18n="nav.cases">成功案例</a></li>
                    <li><a href="#contact" class="contact" data-i18n="nav.contact">联系我们</a></li>
                </ul>
                <select id="language-selector">
                    <option value="zh">中文</option>
                    <option value="en">English</option>
                    <option value="ja">日本語</option>
                </select>
            </div>
        </nav>
    `,

    // 页脚组件
    footer: (config) => `
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3 class="sitemap">网站地图</h3>
                    <ul>
                        ${config.navigation.map(item => `
                            <li><a href="${item.url}" class="${item.class}">${item.text}</a></li>
                        `).join('')}
                    </ul>
                </div>
                <div class="footer-section">
                    <h3 class="contact_info">联系方式</h3>
                    <p class="email">邮箱: ${config.contact.email}</p>
                    <p class="phone">电话: ${config.contact.phone}</p>
                    <p class="address">地址: ${config.contact.address}</p>
                </div>
                <div class="footer-section">
                    <h3 class="follow_us">关注我们</h3>
                    <div class="social-icons">
                        <a href="${config.social.weibo}" class="social-icon">微博</a>
                        <a href="${config.social.wechat}" class="social-icon">微信</a>
                        <a href="${config.social.linkedin}" class="social-icon">领英</a>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <p class="copyright">&copy; ${config.site.copyright}</p>
            </div>
        </div>
    `,

    // 页面 Hero 区域组件
    pageHero: (title, subtitle) => `
        <section class="page-hero">
            <div class="container">
                <h1>${title}</h1>
                <p>${subtitle}</p>
            </div>
        </section>
    `,

    // CTA 区域组件
    ctaSection: (title, subtitle, buttonText = '立即咨询') => `
        <section class="cta-section">
            <div class="container">
                <h2>${title}</h2>
                <p>${subtitle}</p>
                <a href="mailto:${CONFIG.contact.email}" class="cta-button">${buttonText}</a>
            </div>
        </section>
    `
}; 