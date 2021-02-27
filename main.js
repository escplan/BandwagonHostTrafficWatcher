const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="description" content="a simple site for BandwagonHost Data useage monitor base on cloudflare worker.">
    <title>BandwagonHost VPS Data used counter</title>
    <link rel="icon" type="image/png" sizes="16x16" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAExSURBVHgB7ZihbsNADIZzfaChgcFKo9PY0LSBPUDB0FjOQ0MDfYBJmzRUVpW2Kq6K+kC5XlRy51h3oI1sqf/Hzl8ukqXYctw0AAAAzsClh/Xivw0h+OwB5/z90zNZ8BKT9MAv85i2l+AJkPACsuIBGAFXkr9fvo1foU9jk3h++fgkC/50LjLsAF3jvB1fSaALbtgBQkdWPAAXIOtC37O3NrAicbGQ3uc/ZMFL5KMEu8xj2l4iSyC2qEGmaUzbAzACxVlo9jAVuoLz89WGLPie4ighd4XkD0rZ91QSEP6Qkq6g7QG4AFkXep3etbxI+lnkb7sjC16CzULCXiabVXS9BB/mhKpP9jbKHoARKM5Cj7c3cS/TeBb2y/2BLPieyl5ocJnHtH01AarEtD0AAIAr5wj1T7LZ4aPqwgAAAABJRU5ErkJggg==" />
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@700&display=swap" rel="stylesheet">
    <script type="text/javascript">
        /*! js-cookie v3.0.0-rc.1 | MIT */
        !function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self,function(){var n=e.Cookies,r=e.Cookies=t();r.noConflict=function(){return e.Cookies=n,r}}())}(this,function(){"use strict";function e(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)e[r]=n[r]}return e}var t={read:function(e){return e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent)},write:function(e){return encodeURIComponent(e).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,decodeURIComponent)}};return function n(r,o){function i(t,n,i){if("undefined"!=typeof document){"number"==typeof(i=e({},o,i)).expires&&(i.expires=new Date(Date.now()+864e5*i.expires)),i.expires&&(i.expires=i.expires.toUTCString()),t=encodeURIComponent(t).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),n=r.write(n,t);var c="";for(var u in i)i[u]&&(c+="; "+u,!0!==i[u]&&(c+="="+i[u].split(";")[0]));return document.cookie=t+"="+n+c}}return Object.create({set:i,get:function(e){if("undefined"!=typeof document&&(!arguments.length||e)){for(var n=document.cookie?document.cookie.split("; "):[],o={},i=0;i<n.length;i++){var c=n[i].split("="),u=c.slice(1).join("=");'"'===u[0]&&(u=u.slice(1,-1));try{var f=t.read(c[0]);if(o[f]=r.read(u,f),e===f)break}catch(e){}}return e?o[e]:o}},remove:function(t,n){i(t,"",e({},n,{expires:-1}))},withAttributes:function(t){return n(this.converter,e({},this.attributes,t))},withConverter:function(t){return n(e({},this.converter,t),this.attributes)}},{attributes:{value:Object.freeze(o)},converter:{value:Object.freeze(r)}})}(t,{path:"/"})});
    </script>
    <style type="text/css">
        :root {
            --blue: #4E89E3;
            --yellow: #E49C47;
            --yellow-bg: #F4ECCF;
            --red: #FF4444;
            --white: #FFFFFF;
            --bar-bg: #C4C4C4;
            --cancel: #A4A4A4;
            
            font-size:16px;
            --f-l:20px;
            --f-m:16px;
            --f-s:14px;
            --f-xs:12px;
        }
        * { box-sizing: border-box; color: #838383; border:0; outline:none; text-size-adjust: 100%;}
        body { width: 100%; background-color:#F5F5F5; font-family: 'Roboto', sans-serif; margin:0; padding: 0; font-size:16px;}
        button:active { opacity: 0.8; }
        ul { margin:0 0 0 1rem; padding:0;}
        .content{ display: block; max-width: 50rem; margin:0 auto; padding:1rem 2rem;}
        #header { background: #DBDBDB; overflow: hidden; margin:0;}
        #icon { background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAALXSURBVHgB7dy/TxNhHMfx77cujjIRfwzEAZhINAY6KQFx8kecWBQa/gBKY4yNg5XNLlaMoyZFcJFFQ5i05uIGakxwksUOauLWv+AenzMSht5zvT43dLj3KyFtcvdpL2l6D8/nnp4IAAAAAAAAAOSBJm1sbb2qGROu2N1OxO9hOmq0OTt/q0Lej/MDaG1tNoyRFUnBGLM6N3/7Ifn+FRJetCQpqWqZvJ+CYKASvgGyJmmFZp28n8RB+P3rjSf2YTFpEIoO1HX+y3seAAAALioZbDx6UAtFo+m649806ahKc+HeaoV8vGPi6WW91jCiVfv0eMJu0bbizdmL+qb1MSDfzbuKsBOQUuqdtVAmH48uaMC8P4DQaKauJO/5Q95jwNtWENy4fGlIRcfFfR7s2AOtl+6vVskDAADgSGIX9Hh5qWZ6dB2i2ryz9rxC3o9zHtAoL6XuOuamzum73a8B+f45Z8J2AlGS1C/SvS4m7/n0WQyU+xsgJnXXYUTWyftxjgHROe3K1HnbdRjbdajjPGg6oRTqd5++qJIHAABAepnWBS1fnbFdiUnsSgpGm2s7Hyrk43lfEy5fm7FdienZlRiV4uToWd07+BGQ75ZhVUQfv6ESUyYfjy5owPxXxvXTlYTdXUne84e8x4C9g3YwOTrSc12MPdD6s52gSh4AAABHErughelJ23VI4v1y7F9zI/hUIe/HOQ9YnJ76vy5GE7qOaJsWJ0ZO6377V0C+f0mrIkqSksatq8l5Pi26oAFz3y9ICpnWxeQ9n5ZzDNhv/wwmRs70XBdjD7S+GexWyQMAACC9TOuCrl+YqEl0e191rIsx9pKcmub2528V8vG8rwnbN2/Yh6p9c3dXYrfZaXpx7NSwfv/9JyDfLUsVUepj3zL5eHRBA5blA0jdlYQmtivJe/4f7zEgOqeNnRwesk/HnedBE/2QWerbX/ar5AEAAAAAAAAAQF79Bci59+blz1LQAAAAAElFTkSuQmCC'); display:block; float: left; width:48px; height: 48px; background-size:48px 48px; background-repeat:no-repeat; margin:0.2rem 1rem 0.5rem 0;}
        .header-title { font-weight: bold; font-size:var(--f-m); margin: 0.35rem 0 0 0; color:var(--blue)}
        .current_lable { font-size: var(--f-s); font-weight: 300;}
        .current { font-size: var(--f-s); font-weight: 400;}
        .flex-container { display: flex; flex-wrap: wrap;}
        .flex-item {  }
        .blured {filter: blur(4px);}
        .monitor {border-radius: 1rem; position: relative; width:10rem; height: 14rem; overflow: hidden; z-index: 0; margin:1rem 0.5rem 0.5rem 0; background:#DBDBDB;}
        .monitor .monitor-main, .monitor .monitor-option, .monitor .monitor-error {padding: 0.4rem 0.8rem; width: 100%; height:100%}
        .monitor .monitor-option-opener { position: absolute; width:1rem; height: 1rem; top: 1.8rem; right: 0.5rem; background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAlQTFRFw8PDxMTEAAAAZDZ4ZwAAAAN0Uk5T//8A18oNQQAAADBJREFUeNpiYMIBGJDZDIzYJBhBgAGXBCMpEgy4jALazcCA3VU4nTvqj4H3B0CAAQC+owQJaCi0lgAAAABJRU5ErkJggg==') no-repeat; background-size:75% 75%;}
        .monitor .status {font-size: var(--f-xs); font-weight:700; font-family: 'Roboto Slab', serif; margin:0 0.1rem;}
        .monitor .status-FULL { background: #DBDBDB; }
        .monitor .status-FULL .status { color: #5FB87D; }
        .monitor .status-LESS { background: var(--yellow-bg); }
        .monitor .status-LESS .status { color: var(--yellow); }
        .monitor .status-POOR, .monitor .status-ERROR { background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAMAAAC67D+PAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAxQTFRF/+Dg/9fX/9bW/+Hh92pFfgAAADFJREFUeNpEzEEOACAMAsEV/v9ni00rpwkJoIoTERGF3YUjMTpN6S/eC6viyKx8BRgANNEA94SM3s4AAAAASUVORK5CYII='), linear-gradient(0deg, #FFDBDB, #FFDBDB), #DBDBDB;}
        .monitor .status-POOR .status, .monitor .status-ERROR .status { color: #FF4444; }
        .monitor .hostname {font-size: var(--f-m); font-weight: 700; display: block; margin:0 0.1rem;}
        .monitor .ip, .monitor .location, .monitor .resetday {font-size: var(--f-xs); font-weight: 300; display: block; margin:0 0.1rem;}
        .monitor .label-1 {font-size: var(--f-xs); font-weight: 300; display: block; margin:0.8rem 0.1rem 0; line-height:0.5rem;}
        .monitor .label-2 {font-size: var(--f-xs); font-weight: 300; display: block; margin:0.4rem 0.1rem 0; line-height:0.5rem;}
        .monitor .useage-box{overflow: hidden; border-radius: 0.5rem; position: relative; width:100%; height:2rem; margin:0.2rem auto; z-index:0; text-align: center;}
        .monitor .reset-box{overflow: hidden; border-radius: 0.2rem; position: relative; width:100%; height:0.4rem; margin:0.2rem auto; z-index:0; text-align: center;}
        .monitor .bg{display: inline-block; position: absolute; background: var(--bar-bg); z-index: -2; height: 100%; width: 100%; left: 0; top:0;}
        .monitor .bar{display:block; position:absolute; z-index:-1; height:100%; width:0%; left:0; top:0;}
        .monitor .status-FULL .bar{background: var(--blue);}
        .monitor .status-LESS .bar{background: var(--yellow);}
        .monitor .status-POOR .bar{background: var(--red);}
        .monitor .useage-box .data_counter { font-family: 'Roboto Slab', serif; color:var(--white); font-size: var(--f-l); font-weight: 700; line-height: 2.1rem;}
        .monitor .useage-box .plan_monthly_data { color:var(--white); font-size: var(--f-s); font-weight: 300;}
        .monitor .usedPerDay {font-family: 'Roboto Slab', serif; font-size:var(--f-s); font-weight: 500; margin:0 0 0 0.1rem; line-height: 2rem;}
        .monitor .usedPerDay-label {font-size:var(--f-s); font-weight: 300;}
        .monitor .monitor-option{position: absolute; top:0; left:0; background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAMAAABFaP0WAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRF09PTAAAAy3nEsAAAAAJ0Uk5T/wDltzBKAAAAD0lEQVR42mJgYARCgAADAAAMAAMrbpwTAAAAAElFTkSuQmCC'), rgba(192, 192, 192, 0.3);}
        
        .add-item-board {width: 100%;}
        .add-item-board input { width: 35%; min-width: 10rem; background: var(--white); border-radius: 0.7rem;  overflow-x: hidden; overflow-y: hidden; margin:0.2rem 0.5rem 0.2rem 0; padding:0.7rem; font-weight: bold; font-size: var(--f-s);}
        .add-item-board button { background:var(--blue); width: 10rem; border-radius: 0.7rem; font-weight: bold; color: var(--white); margin:0.2rem 0.5rem 0.2rem 0; padding:0.7rem; font-size: var(--f-s);}
        .add-item-board .add-item-msg-box { width: 100% }
        .add-item-board .add-item-msg { width: 100%; height: 1rem; color:var(--yellow); padding:0 0.5rem; font-size: var(--f-s);}
        .monitor-option button {width: 100%; border-radius: 0.7rem; font-weight: bold; color: var(--white); margin:0.2rem 0.5rem 0.2rem 0; padding:0.7rem; font-size: var(--f-s);}
        .monitor-option button.monitor-delete-button { background:var(--red); margin-top:3rem;}
        .monitor-option button.monitor-delete-cancel { background:var(--cancel); }

        .lds-dual-ring {display: block; width:5rem; height: 5rem; margin:5rem auto 0;}
        .lds-dual-ring:after {content: " "; display: block; width: 4rem;height: 4rem; margin: 0.5rem; border-radius: 50%; border: 0.3rem dotted var(--blue); border-color: var(--blue) transparent var(--blue) transparent; animation: lds-dual-ring 1s linear infinite;}
        @keyframes lds-dual-ring {
            0% { transform: rotate(0deg);}
            100% { transform: rotate(360deg);}
        }
        .toknow .content {border-top:0.05rem dotted #C4C4C4; margin:3rem auto;}
        .toknow ul li {font-family: sans-serif;font-weight: 300;font-size: var(--f-s);}
    </style>
</head>
<body>
    <div class="app" id="app">
        <div class="" id="header">
            <div class="content">
                <span id="icon"></span>
                <h1 class="header-title" id="title">BandwagonHost Data Useage</h1>
                <span class="current_lable">Current: </span><span class="current" id="current">Current:</span>
            </div>
        </div>
        <div class="" id="main">
            <div class="content">
                <div class="add-item-board flex-container">
                    <input type="text" name="veid" id="veid" placeholder="veid" class="flex-item">
                    <input type="text" name="api_key" id="api_key" placeholder="api_key" class="flex-item">
                    <button onclick="newHost()" class="flex-item">+ add host </button>
                    <div class="add-item-msg-box">
                        <p class="add-item-msg" id="add-item-msg" hidden> opps, something wrong... </p>
                    </div>
                </div>
            </div>
            <div class="content">
                <div class="flex-container">
                    <div class="monitors flex-container flex-item" id="monitors"></div>
                </div>
            </div>
        </div>
        <div class="toknow" id="">
            <div class="content">
                <ul class="">
                    <li>本应用帮助你更方便的监控 BandwagonHost ( 搬瓦工 ) 主机流量使用情况；</li>
                    <li>使用 BandwagonHost 为你提供的 veid 和 api_key 获取主机的流量信息，方便你监控主机流量使用； 你的 veid 和 api_key 在 BandwagonHost 主机控制面板 - API 中获取。</li>
                    <li>本应用会将你的 veid 和 api_key 保存在 cookies 中 365 天，刷新页面时将获得主机流量使用信息；</li>
                    <li>本应用基于 <a href="https://workers.cloudflare.com/">Cloudflare Workers</a> 提供的免费 ( 100,000 个请求/天 ) 无服务器计算服务。你的信息不会经过我的服务器，但仍将经过 Cloudflare 的服务器；</li>
                    <li>你的 veid 和 api_key 仅以 cookies 形式保存在你的本地，我和 Cloudflare 都不保存你的信息；</li>
                    <li>Bandwagon API的请求地址为 <a href="https://api.64clouds.com/v1">api.64clouds.com/v1</a>，为解决跨站请求限制，该地址由 <a href="https://api.64clouds.com/v1">bwh.unwall.in/v1</a> 作转发。<a href="https://api.64clouds.com/v1">bwh.unwall.in/v1</a> 同样基于 <a href="https://workers.cloudflare.com/">Cloudflare Works</a>；</li>
                    <li>本应用由三个 workers 组成：1, <a href="http://bwh.unwall.in">http_to_https</a>; 2, <a href="https://bwh.unwall.in/v1">bwh.unwall.in/v1</a> 代理服务; 3, <a href="bwh.unwall.in">bwh.unwall.in</a> 服务主体；</li>
                    <li>为避免 api_key 泄露风险，本应用不引入任何外部 js。外部引入仅有以 css 形式引入的 <a href="https://fonts.google.com/">Google Font</a>;</li>
                    <li>你应该了解的风险：妥善保存你的 veid 和 api_key，泄露可能导致他人完全控制你的主机；</li>
                    <li>你不应该在本应用上监控重要的开发和生产主机。仅建议用于监控娱乐主机。</li>
                    <li>你不应该在不安全的机器上使用本应用，建议你仅在自己的手机和家用电脑上使用；</li>
                    <li>如果你担心自己的 api_key 泄露，请立即重置 ( Rest API Key )；</li>
                    <li>免责声明：本应用仅为网友提供使用方便，不承担任何责任；</li>
                    <li>感谢 <a href="https://github.com/js-cookie/js-cookie">js-cookie</a>, <a href="https://www.cloudflare.com/">Cloudflare</a>, <a href="https://www.figma.com">Figma</a>, <a href="https://fonts.google.com/">Google Font</a>;</li>
                    <li>by escplan, escplan#mail.unwall.in</li>
                </ul>
            </div>
        </div>
    </div>

    <div id="template-monitor" hidden>
        <!-- <div class="monitor flex-item" id="monitor-{{monitorid}}"> -->
            <div class="lds-dual-ring"></div>
        <!-- </div> -->
    </div>

    <div id="template-monitor-error" hidden>
        <div class="monitor-error status-ERROR" id="monitor-error-{{monitorid}}">
            <button class="monitor-option-opener" onclick="monitorOptionSwitch({{monitorid}})"></button>
            <span class="status">ERROR!</span>
            <span class="hostname">?</span>
        </div>
        <div class="monitor-option" id="monitor-option-{{monitorid}}" hidden>
            <button class="monitor-delete-button" onclick="monitorDelete({{monitorid}})">delete?</button>
            <button class="monitor-delete-cancel" onclick="monitorOptionSwitch({{monitorid}})">never mind.</button>
        </div>
    </div>

    <div id="template-monitor-main" hidden>
        <div class="monitor-main status-{{status}}" id="monitor-main-{{monitorid}}">
            <button class="monitor-option-opener" onclick="monitorOptionSwitch({{monitorid}})"></button>
            <span class="status">{{status}}</span>
            <span class="hostname">{{hostname}}</span>
            <span class="ip">{{ip}}</span>
            <span class="location">{{location}}</span>
            <span class="label-1">traffic:</span>
            <div class="useage-box">
                <span class="data_counter">{{data_counter}}</span>
                <span class="plan_monthly_data">G / {{plan_monthly_data}} {{G}}</span>
                <span class="bar" style="width:{{rate}}%;"></span>
                <span class="bg"></span>
            </div>
            <div class="label-2">reset:</div>
            <div class="reset-box">
                <span class="bar" style="width:{{dateRate}}%;"></span>
                <span class="bg"></span>
            </div>
            <span class="resetday">{{diffDays}} days, {{diffHours}} hours</span>
            <span class="resetday">{{reset_datetime}}</span>
            <span class="usedPerDay">{{usedPerDay}}</span>
            <span class="usedPerDay-label"> G / day</span>    
        </div>
        <div class="monitor-option" id="monitor-option-{{monitorid}}" hidden>
            <button class="monitor-delete-button" onclick="monitorDelete({{monitorid}})">delete?</button>
            <button class="monitor-delete-cancel" onclick="monitorOptionSwitch({{monitorid}})">never mind.</button>
        </div>
    </div>
    
    <script type="text/javascript">
        var split_sign = "||"
        var ids = Cookies.get("ids") || 0;
        ids = parseInt(ids);

        var doms = new Array();
        var templates = new Array();

        doms["monitors"] = document.querySelector("#monitors"); 
        doms["additem_msg"] = document.querySelector("#add-item-msg");
        doms["veid"] = document.querySelector("input#veid");
        doms["api_key"] = document.querySelector("input#api_key");
        doms["current"] = document.querySelector("#current");
        templates["monitor"] = document.querySelector("#template-monitor").innerHTML;
        templates["monitor-main"] = document.querySelector("#template-monitor-main").innerHTML;
        templates["monitor-error"] = document.querySelector("#template-monitor-error").innerHTML;

        if (ids > 0){
            for(let monitorid = 0; monitorid < ids; monitorid++){
                let id_content = Cookies.get("id_" + monitorid);
                if (id_content) {
                    let [veid, api_key, hostname] = id_content.split("||");
                    let monitor = document.createElement("div");
                    monitor.classList.add("monitor","flex-item");
                    monitor.id = "monitor-" + monitorid;
                    monitor.innerHTML = templates["monitor"] + "";
                    doms["monitors"].appendChild(monitor);
                    getData(veid, api_key, monitorid, hostname, false);     
                }
            }
        }

        function newHost(){
            let veid = doms["veid"].value;
            let api_key = doms["api_key"].value;
            
            let monitorid = ids + 0;
            ids += 1;
            
            doms["additem_msg"].hidden = true;
            
            getData(veid, api_key, monitorid, null, true);
        }

        function getData(veid, api_key, monitorid, hostname, isnew = false){
            let url = "/v1/getServiceInfo?veid=" + veid + "&api_key=" +api_key;

            fetch(url)
            .then(response => response.json())
            .then(data => {
                if ( data.error != 0){
                    console.log(monitorid, data);
                    if ( !isnew ){
                        let html = templates["monitor-error"].replace(new RegExp("{{monitorid}}", "g"), monitorid);
                        document.querySelector("#monitor-" + monitorid).innerHTML = html;
                    } else {
                        ids -= 1;
                        doms["additem_msg"].hidden = false;
                    }
                } else {
                    if ( isnew ) {
                        let monitor = document.createElement("div");
                        monitor.classList.add("monitor","flex-item");
                        monitor.id = "monitor-" + monitorid;
                        doms["monitors"].appendChild(monitor);
                        
                        Cookies.set( "ids", ids, { expires: 365 });
                        Cookies.set(("id_" + monitorid), (veid + split_sign + api_key),{ expires: 365 });
                        doms["veid"].value = "";
                        doms["api_key"].value = "";

                        doms["additem_msg"].hidden = true;
                    }
                    showData(data, monitorid);    
                    // if renew hostname
                    // if unsafe letters, change
                    let new_hostname = data.hostname.replace(new RegExp(split_sign, 'g'), "--");
                    if (new_hostname != hostname){
                        Cookies.set(
                            ( "id_" + monitorid ),
                            ( veid + split_sign + api_key + split_sign + new_hostname ),
                            { expires: 365 }
                        );    
                    }
                };
            })
            .catch(err => console.log(err))
        }

        function showData(data, monitorid){
            let check_datetime = new Date();
            let datetime = check_datetime.today() + " " + check_datetime.timeNow();
            let reset_timestamp = parseInt(data.data_next_reset + "000");
            let reset_datetime = new Date(reset_timestamp);
            let timesDiff = Math.abs(reset_datetime.getTime() - check_datetime.getTime());
            let diffDays = Math.ceil(timesDiff / (1000 * 60 * 60 * 24) - 1);
            let diffHours = Math.ceil((timesDiff / 1000 / 60 / 60) % 24 - 1);
            let monthDays = getMonthDays(reset_datetime);
            let dateRate = ( (monthDays - diffDays - ( diffDays / 24)) / monthDays * 100);
            let data_counter = (data.data_counter * data.monthly_data_multiplier / 1024 / 1024 / 1024 ).toFixed(1);
            let usedPerDay = (data_counter / ( monthDays - diffDays )).toFixed(1);
            let plan_monthly_data = (data.plan_monthly_data * data.monthly_data_multiplier / 1024 / 1024 / 1024 ).toFixed(0);
            let plan_monthly_data_display = plan_monthly_data;
            let plan_monthly_data_display_unit = "G";
            if (plan_monthly_data >= 1000){
                plan_monthly_data_display = (plan_monthly_data / 1000).toFixed(1);
                plan_monthly_data_display_unit = "T";
            }
            let status = "FULL";
            let status_rate = ( usedPerDay * 30 ) / plan_monthly_data;
            if (status_rate > 0.9) status = "LESS";
            if (status_rate > 1) status = "POOR";
            //for test
            //status = "LESS"; 
            //status = "POOR";

            let mapx = [
                ["{{monitorid}}", monitorid],
                ["{{status}}", status],
                ["{{check_datetime}}", (check_datetime.today() + " " + check_datetime.timeNow())],
                ["{{hostname}}", data.hostname],
                ["{{ip}}", data.ip_addresses],
                ["{{location}}", data.node_location_id],
                ["{{os}}", data.os],
                ["{{plan}}", data.plan],
                ["{{data_counter}}", data_counter],
                ["{{plan_monthly_data}}", plan_monthly_data_display],
                ["{{G}}", plan_monthly_data_display_unit],
                ["{{rate}}", (data.data_counter / data.plan_monthly_data * 100).toFixed(1)],
                ["{{reset_datetime}}", (reset_datetime.today() + " " + reset_datetime.timeNow())],
                ["{{diffDays}}", diffDays],
                ["{{diffHours}}", diffHours],
                ["{{dateRate}}", dateRate],
                ["{{usedPerDay}}", usedPerDay]
            ];

            let html = templates["monitor-main"] + "";
            mapx.forEach(element => {html = html.replace(new RegExp(element[0], 'g'), element[1])});
            let monitor = document.querySelector("#monitor-" + monitorid);
            monitor.innerHTML = html;
            doms["current"].innerHTML = datetime;
        }

        /*
        Date.prototype.today = function () { 
            return ((this.getDate() < 10)?"0":"") + this.getDate() +"/"+(((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"/"+ this.getFullYear();
        }
        */
        Date.prototype.today = function () { 
            return this.getFullYear() + "-" + (((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) + "-" + ((this.getDate() < 10)?"0":"") + this.getDate();
        }

        Date.prototype.timeNow = function () {
             return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
        }

        function getMonthDays(resetday) {
            let date1 = new Date(resetday);
            let date2 = new Date(resetday);
            let m = date1.getMonth()
            date1.setMonth(m-1);
            let difference = date2.getTime() - date1.getTime();
            let days = Math.ceil(difference / (1000 * 3600 * 24));
            return days;
        }

        function monitorOptionSwitch(monitorid) {
            let targetMonitor_option = document.querySelector("#monitor-option-" + monitorid);
            let targetMonitor_main = document.querySelector("#monitor-main-" + monitorid);
            let targetMonitor_error = document.querySelector("#monitor-error-" + monitorid);
            if (targetMonitor_option.hidden) {
                targetMonitor_option.hidden = false;
                if (targetMonitor_main) targetMonitor_main.classList.add("blured");
            } else {
                targetMonitor_option.hidden = true;
                if (targetMonitor_main) targetMonitor_main.classList.remove("blured");
            }
        }

        function monitorDelete(monitorid) {
            let cookieid = 'id_' + monitorid;
            Cookies.remove(cookieid);
            let monitor = document.querySelector("#monitor-" + monitorid);
            doms["monitors"].removeChild(monitor);
        }
        
    </script>


</body>
</html>
`
async function handleRequest(request) {
  return new Response(html, {
    headers: {
      "content-type": "text/html;charset=UTF-8",
    },
  })
}

addEventListener("fetch", event => {
  return event.respondWith(handleRequest(event.request))
})
