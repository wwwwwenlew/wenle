document.addEventListener('DOMContentLoaded', function() {
    var path = window.location.pathname;
    var normalizedPath = path.replace(/\/index\.html$/, '/');
    
    // 把你可能的首页路径都加入白名单（兼容绝对根目录和你的 wenle 子目录）
    var isHomePage = (
        path === '/' || 
        path === '/index.html' || 
        path === '/wenle/' || 
        path === '/wenle/index.html'
    );
    
    // 如果当前路径不在上面的白名单里，才添加 is-subpage（隐藏大图）
    if (!isHomePage) {
        document.body.classList.add('is-subpage');
    } else {
        document.body.classList.add('is-home-page');
    }

    // 作品页使用独立的作品集布局，避免继承文章页的大面积 Banner 和正文样式。
    if (normalizedPath === '/projects/' || normalizedPath === '/wenle/projects/') {
        document.body.classList.add('is-projects-page');
    }

    if (normalizedPath === '/about/' || normalizedPath === '/wenle/about/') {
        document.body.classList.add('is-about-page');
    }

    if (
        normalizedPath === '/archives/' ||
        normalizedPath === '/wenle/archives/' ||
        normalizedPath.indexOf('/tags/') !== -1 ||
        normalizedPath.indexOf('/categories/') !== -1
    ) {
        document.body.classList.add('is-article-list-page');
    }

    if (document.querySelector('.post-content')) {
        document.body.classList.add('is-post-page');
    }
});
