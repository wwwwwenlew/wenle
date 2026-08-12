document.addEventListener('DOMContentLoaded', function() {
    var path = window.location.pathname;
    
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
    }
});