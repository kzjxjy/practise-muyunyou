// 轮播图特效
(function(){
    var carousel_list = document.getElementById('carousel_list');
    var left_btn = document.getElementById('left_btn');
    var right_btn = document.getElementById('right_btn');
    var circle_ol = document.getElementById('circle_ol');
    var circle_lis = circle_ol.getElementsByTagName('li');
    var banner = document.getElementById('banner');

    // 克隆第一张li
    var clone_li = carousel_list.firstElementChild.cloneNode(true);
    // 创建出来的是孤儿节点，需要上树
    carousel_list.appendChild(clone_li);

    // 当前正在显示的图片序号，从0开始
    var idx = 0;

    // 节流锁，目的不让快速点击，要加载完才
    var lock = true;


    // 右按钮添加监听
    right_btn.onclick = right_btn_handler;
    // 右按钮事件处理函数
    function right_btn_handler (){
        // 判断节流锁状态，如果是关闭的就什么都不做
        if(!lock) return;
        // 关锁，等动画结束之后才开锁
        lock = false;

        carousel_list.style.transition = 'transform 0.5s ease 0s';
        idx ++;
        carousel_list.style.transform = 'translateX(' + -16.66*idx +'%)';
        // 做判断，如果拉动到最后一张了就回到第一张
        if(idx>4){
            setTimeout(function(){
                // 去掉过渡
                carousel_list.style.transition = 'none';
                // 删除transform属性
                carousel_list.style.transform = 'none';
                // 全局图片序号变为0
                idx = 0;
            },500)
        }
        // 设置小圆点
        setCircles();
        // 开锁
        setTimeout(function(){
            lock = true;
        },500)
        
    }
    //左按钮监听
    left_btn.onclick = function(){
        if(!lock) return;
        // 关锁，等动画结束之后才开锁
        lock = false;
        // 先写if语句
        if(idx == 0){
            // 瞬间拉动到最后
            carousel_list.style.transition = 'none';
            // 拉到最后
            carousel_list.style.transform = 'translateX(' + -16.66*5 +'%)';
            // 改变idx值，因为第五张图序号为4，不能放在延时器中，因为执行先后顺序，如果放在延时器中，添加小圆点后，左按钮情况下无法改变状态
            idx=4;
            // 加上过渡，需要添加延时器，0毫秒，可以是刚刚添加瞬移后再加上过渡
            setTimeout(function(){
                carousel_list.style.transition = 'transform 0.5s ease 0s';
                carousel_list.style.transform = 'translateX(' + -16.66*4 +'%)';
            },0)
        }else{
            idx --;
            carousel_list.style.transform = 'translateX(' + -16.66*idx +'%)';
        }
        // 设置小圆点
        setCircles();
        
        // 开锁
        setTimeout(function(){
            lock = true;
        },500)
    }
    //设置小圆点
    function setCircles(){
        // 遍历
        for (i=0; i<=4; i++) {
            // idx % 5 因为右按钮的设置，idx有一瞬间是等于5，其实就是第零张，所以idx%5就是0/5或者是5/5，余数都是0
            if (i == idx % 5) {
                circle_lis[i].className = 'current';
            }else{
                circle_lis[i].className = '';
            }
        }
    }

    // 事件委托，小圆点监听
    circle_ol.onclick = function(e){
        if(e.target.tagName.toLowerCase() == 'li'){
            // 得到li身上的data-n属性
            var n = Number(e.target.getAttribute('data-n'));
            // 改变全局idx
            idx =n ;
            // 拉动
            carousel_list.style.transform = 'translateX(' + -16.66*idx +'%)';
            // 由于小圆点没有改变样式，还要调用函数
            setCircles();
        }
    }

    //定时器，自动轮播
    var timer = setInterval(right_btn_handler, 2000);

    // 鼠标进入，自动轮播暂停
    banner.onmouseenter = function () {
        clearInterval(timer);
    };
    banner.onmouseleave = function () {
        // 设表先关
        clearInterval(timer);
        // 设置定时器，不可以加var，就变成局部变量
        setInterval(right_btn_handler, 2500);
    }
})()