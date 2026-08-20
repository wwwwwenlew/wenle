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

(function() {
    var POST_TOC_OFFSET = 82;
    var ACTIVE_TOC_OFFSET = 190;
    var activeScrollTicking = false;

    function decodeHash(hash) {
        try {
            return decodeURIComponent(hash.replace(/^#/, ''));
        } catch (error) {
            return hash.replace(/^#/, '');
        }
    }

    function findHeadingByHash(hash) {
        var id = decodeHash(hash);
        if (!id) {
            return null;
        }

        return document.getElementById(id);
    }

    function setActiveTocLink(activeLink) {
        var toc = document.querySelector('#toc');
        if (!toc || !activeLink) {
            return;
        }

        toc.querySelectorAll('.tocbot-active-link').forEach(function(link) {
            link.classList.remove('tocbot-active-link');
        });
        toc.querySelectorAll('.is-active-li').forEach(function(item) {
            item.classList.remove('is-active-li');
        });

        activeLink.classList.add('tocbot-active-link');
        var currentItem = activeLink.closest('.toc-list-item');
        if (currentItem) {
            currentItem.classList.add('is-active-li');
        }
    }

    function findTocLinkByHeading(heading) {
        var toc = document.querySelector('#toc');
        if (!toc || !heading || !heading.id) {
            return null;
        }

        var links = toc.querySelectorAll('a[href^="#"]');
        for (var index = 0; index < links.length; index += 1) {
            if (decodeHash(links[index].getAttribute('href')) === heading.id) {
                return links[index];
            }
        }

        return null;
    }

    function updateActiveTocByScroll() {
        activeScrollTicking = false;

        if (!document.body.classList.contains('is-post-page')) {
            return;
        }

        var headings = Array.prototype.slice.call(
            document.querySelectorAll('.markdown-body > h1, .markdown-body > h2, .markdown-body > h3, .markdown-body > h4, .markdown-body > h5, .markdown-body > h6')
        ).filter(function(heading) {
            return heading.id;
        });

        if (headings.length === 0) {
            return;
        }

        var scrollLine = window.pageYOffset + ACTIVE_TOC_OFFSET;
        var pageBottom = window.pageYOffset + window.innerHeight;
        var documentBottom = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) - 2;
        var activeHeading = headings[0];

        if (pageBottom >= documentBottom) {
            activeHeading = headings[headings.length - 1];
        } else {
            headings.forEach(function(heading) {
                if (heading.offsetTop <= scrollLine) {
                    activeHeading = heading;
                }
            });
        }

        var activeLink = findTocLinkByHeading(activeHeading);
        if (activeLink) {
            setActiveTocLink(activeLink);
        }
    }

    function requestActiveTocUpdate() {
        if (activeScrollTicking) {
            return;
        }

        activeScrollTicking = true;
        window.requestAnimationFrame(updateActiveTocByScroll);
    }

    function bindAccurateTocScroll() {
        if (window.__postTocScrollBound) {
            updateActiveTocByScroll();
            return;
        }

        window.__postTocScrollBound = true;
        window.addEventListener('scroll', requestActiveTocUpdate, { passive: true });
        window.addEventListener('resize', requestActiveTocUpdate);
        updateActiveTocByScroll();
    }

    function bindAccurateTocClick() {
        var toc = document.querySelector('#toc');
        if (!toc || toc.dataset.accurateClickBound === 'true') {
            return;
        }

        toc.dataset.accurateClickBound = 'true';
        toc.addEventListener('click', function(event) {
            var link = event.target.closest('a[href^="#"]');
            if (!link) {
                return;
            }

            var target = findHeadingByHash(link.getAttribute('href'));
            if (!target) {
                return;
            }

            event.preventDefault();
            setActiveTocLink(link);

            var top = target.getBoundingClientRect().top + window.pageYOffset - POST_TOC_OFFSET;
            window.scrollTo({
                top: Math.max(0, top),
                behavior: 'auto'
            });

            history.replaceState(null, '', link.getAttribute('href'));
            window.setTimeout(function() {
                setActiveTocLink(link);
            }, 0);
        });
    }

    function tunePostToc() {
        if (!document.body.classList.contains('is-post-page') || !window.tocbot) {
            return;
        }

        var toc = document.querySelector('#toc');
        var tocBody = document.querySelector('#toc-body');
        var content = document.querySelector('.markdown-body');
        if (!toc || !tocBody || !content) {
            return;
        }

        window.tocbot.destroy();
        window.tocbot.init({
            tocSelector: '#toc-body',
            contentSelector: '.markdown-body',
            headingSelector: 'h1,h2,h3,h4,h5,h6',
            linkClass: 'tocbot-link',
            activeLinkClass: 'tocbot-active-link',
            listClass: 'tocbot-list',
            isCollapsedClass: 'tocbot-is-collapsed',
            collapsibleClass: 'tocbot-is-collapsible',
            includeTitleTags: true,
            collapseDepth: 6,
            scrollSmooth: false,
            headingsOffset: -POST_TOC_OFFSET,
            scrollSmoothOffset: -POST_TOC_OFFSET,
            throttleTimeout: 0
        });

        toc.style.visibility = 'visible';
        toc.querySelectorAll('.toc-toggle').forEach(function(toggle) {
            toggle.remove();
        });
        bindAccurateTocClick();
        bindAccurateTocScroll();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            window.setTimeout(tunePostToc, 120);
        });
    } else {
        window.setTimeout(tunePostToc, 120);
    }
})();
