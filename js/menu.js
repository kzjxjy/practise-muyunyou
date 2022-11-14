(function(){
    var bannerNavUl = document.getElementById('banner-nav-ul');
    var bannerNav = document.getElementById('banner-nav');

    // 寻找所有menu
    var menus = document.querySelectorAll('.menus-box .menu');
    var bannerLis = document.querySelectorAll('#banner-nav-ul li');
    // 事件委托
    // 不实用onmouseenter，因为不冒泡
    bannerNavUl.onmouseover = function(e){
        if(e.target.tagName.toLowerCase() == 'li'){
            var t = e.target.getAttribute('data-t');
            // 排他操作，所有li去掉current
            for(i=0; i < bannerLis.length; i++){
                bannerLis[i].className = bannerLis[i].getAttribute('data-t');
            }
            // 当前触碰的menu类，高亮
            e.target.className += ' current';
            // 寻找匹配menu
            var themenu = document.querySelector('.menus-box .menu[data-t=' + t + ']');
            
            
            // 排他操作，让所有盒子去除current
            for (var i=0 ;i < menus.length;i++){
                menus[i].className = 'menu';
            }
            // 添加current
            themenu.className = 'menu current'; 
        }
    }
    // 当鼠标离开menu父元素大盒子，菜单关闭
    bannerNav.onmouseleave = function(){
        for(i=0; i < bannerLis.length; i++){
            bannerLis[i].className = bannerLis[i].getAttribute('data-t');
            menus[i].className = 'menu';
        }
    }
})();