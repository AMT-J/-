// ==UserScript==
// @name         问卷星百朗听力定制
// @namespace    http://tampermonkey.net/
// @version      3.3.1
// @description  在洋洋大魔王_的基础上针对个人需求额二次开发
// @author       AMT
// @match        *://*.wjx.cn/*
// @match        *://*.wjx.top/*
// ==/UserScript==

(function() {
    'use strict';

    //===========================开始==============================
    clearCookie();


    //=================================填写刷问卷的网址======================================
    var url=["","https://ks.wjx.top/vj/OaMAByP.aspx","https://ks.wjx.top/vj/hXkKrpH.aspx","https://ks.wjx.top/vj/rvcfyy4.aspx","https://ks.wjx.top/vj/rSVcfZa.aspx",
             "https://ks.wjx.top/vj/PX6JKrr.aspx","https://ks.wjx.top/vj/Pmr6uNu.aspx","https://ks.wjx.top/vj/t0R9tQ5.aspx","https://ks.wjx.top/vj/wR0SAYU.aspx","https://ks.wjx.top/vj/wsSII10.aspx",
             "https://ks.wjx.top/vj/wR0SOO3.aspx","https://ks.wjx.top/vj/Q054tAF.aspx","https://ks.wjx.top/vj/YNxg6d4.aspx","https://ks.wjx.top/vj /recfVuL.aspx","https://ks.wjx.top/vj/Q0F5Dj5.aspx",
             "https://ks.wjx.top/vj/wtSAOL0.aspx","https://ks.wjx.top/vj/Pk62uVr.aspx","https://ks.wjx.top/vj/h4G8kKr.aspx","https://ks.wjx.top/vj/hyPUAkK.aspx","https://ks.wjx.top/vj/YQ4rg6d.aspx",
             "https://ks.wjx.top/vj/h4KYcGk.aspx"]

    var wenjuan_url = url[2];//=============================修改听力网址=============================

    //------------------------------下边的网址不要改！！！！！！！！！！！！！！！！！！！！
    if(window.location.href.indexOf('https://www.wjx.cn/wjx/join/complete.aspx')!=-1){
        window.location.href=wenjuan_url;
    }else if(window.location.href==wenjuan_url){
    }else{
        return
    }

    //滚动到末尾

    //获取题块列表
    var lists = document.querySelectorAll('.ulradiocheck')
    var ccc=0;
    var liangbiao_index=0;
    var xiala_index=0;
    var ops;
    var bili;
    var temp_flag;
    var tiankong_list;
    var liangbiao_lists;
    var min_options;

    //========================================答案填写===================================
    var Ans=""
    //========================================信息填写===================================
    var classify=["Steven's Robot","6A"]
    //信息填写
    var objs=document.getElementsByTagName("textarea");
    for(let i=0;i<objs.length;i++){
        objs[i].focus();
        objs[i].value=classify[i];
        objs[i].blur();
    }

    ccc=0
    for(let i =0;i<20;i++){
        ops = lists[ccc].querySelectorAll('li')
        ccc+=1
        define(ccc)
        ops[danxuan(bili)].click()
    }
    //自定义答案函数
    function define(ccc){
        if(Ans[ccc-1]=='A'){
            bili=[100,0,0]
        }
        else if(Ans[ccc-1]=='B'){
            bili=[0,100,0]
        }
        else{
            bili=[0,0,100]
        }
    }
    //滚到末尾
    window.scrollTo(0,document.body.scrollHeight)

    let count = 0
    setTimeout( function(){
        document.querySelector('#submit_button').click()
        setTimeout( function(){
            document.querySelector('#SM_BTN_1').click()
            setInterval( function(){
                try{
                    yanzhen();
                    count+=1;
                }
                catch(err){
                    if(count>=6){
                        location.reload()
                    }
                }
            }, 500 );
        }, 0.1 * 1000 );
    }, 0.1 * 1000 );

    function yanzhen(){
        var event = document.createEvent('MouseEvents');
        event.initEvent('mousedown', true, false);
        document.querySelector("#nc_1_n1z").dispatchEvent(event);
        event = document.createEvent('MouseEvents');
        event.initEvent('mousemove', true, false);
        Object.defineProperty(event,'clientX',{get(){return 260;}})
        document.querySelector("#nc_1_n1z").dispatchEvent(event);
    }

    //累加list前num数的和
    function leijia(list,num){
        var sum = 0
        for(var i=0;i<num;i++){
            sum+=list[i];
        }
        return sum;
    }

    //生成从minNum到maxNum的随机数
    function randomNum(minNum,maxNum){
        switch(arguments.length){
            case 1:
                return parseInt(Math.random()*minNum+1,10);
                break;
            case 2:
                return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10);
                break;
            default:
                return 0;
                break;
        }
    }
    //判断num是否在指定区间内
    function isInRange(num,start,end){
        if(num>=start && num<=end){
            return true;
        }else{
            return false;
        }
    }
    //单选题执行函数
    function danxuan(bili){
        var pp = randomNum(1,100)
        for(var i=1;i<=bili.length;i++){
            var start = 0;
            if(i!=1){
                start = leijia(bili,i-1)
            }
            var end = leijia(bili,i);
            if(isInRange(pp,start,end)){
                return i-1;
                break;
            }
        }
    }

    //清除cookie
    function clearCookie() {
        var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
        if (keys) {
            for (var i = keys.length; i--;) {
                document.cookie = keys[i] + '=0;path=/;expires=' + new Date(0).toUTCString();//清除当前域名下的,例如：m.kevis.com
                document.cookie = keys[i] + '=0;path=/;domain=' + document.domain + ';expires=' + new Date(0).toUTCString();//清除当前域名下的，例如 .m.kevis.com
                document.cookie = keys[i] + '=0;path=/;domain=kevis.com;expires=' + new Date(0).toUTCString();//清除一级域名下的或指定的，例如 .kevis.com
            }
        }
    }

    //滚到末尾函数
    function scrollToBottom(){
        (function () {
            var y = document.body.scrollTop;
            var step = 500;
            window.scroll(0, y);
            function f() {
                if (y < document.body.scrollHeight) {
                    y += step;
                    window.scroll(0, y);
                    setTimeout(f, 50);
                }
                else {
                    window.scroll(0, y);
                    document.title += "scroll-done";
                }
            }
            setTimeout(f, 1000);
        })();
    }

})();