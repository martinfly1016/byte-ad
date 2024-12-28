document.addEventListener('DOMContentLoaded', function() {
    // 获取所有筛选按钮和案例卡片
    const filterButtons = document.querySelectorAll('.filter-btn');
    const caseCards = document.querySelectorAll('.case-card');

    // 添加筛选功能
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 移除所有按钮的活动状态
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // 添加当前按钮的活动状态
            button.classList.add('active');

            // 获取筛选类别
            const filterValue = button.getAttribute('data-filter');

            // 筛选案例卡片
            caseCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}); 