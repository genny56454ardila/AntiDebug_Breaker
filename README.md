![Antidebug_Breaker](https://socialify.git.ci/0xsdeo/Antidebug_Breaker/image?description=1&font=Bitter&forks=1&language=1&logo=https%3A%2F%2Fp3-flow-imagex-sign.byteimg.com%2Ftos-cn-i-a9rns2rl98%2Frc_gen_image%2F83c1cf6f637940bba9ecb828b7f58ebc.jpeg%7Etplv-a9rns2rl98-image_raw_b.png%3Frcl%3D2025112123094019020B8768AB108FBE9E%26rk3s%3D8e244e95%26rrcfp%3D827586d3%26x-expires%3D2079097789%26x-signature%3DK1FvDsOfH%252BFlP1DmNm1nns1vAaM%253D&name=1&owner=1&pattern=Overlapping+Hexagons&stargazers=1&theme=Light)

## Intro

本插件是基于<a href="https://github.com/0xsdeo/Hook_JS">Hook_JS</a>库所写的Google插件，将致力于辅助前端JavaScript逆向以及渗透测试信息收集。

如何提交您自己的脚本：<a href="https://github.com/0xsdeo/AntiDebug_Breaker/wiki/%E6%8F%90%E4%BA%A4%E6%82%A8%E8%87%AA%E5%B7%B1%E7%9A%84hook%E8%84%9A%E6%9C%AC">AntiDebug_Breaker wiki</a>

> **个人备注**：这是我自己学习JS逆向用的fork，主要用来练习CryptoJS和RSA相关的hook脚本。

## 教学视频

反调试：https://www.bilibili.com/video/BV1gQ4mzMEA4

Vue：https://www.bilibili.com/video/BV12148z7EnP

Hook CryptoJS对称加密 快速出key、iv、mode、padding：https://www.bilibili.com/video/BV1MPW1zDEK8

JS逆向快速定位加密位置以及获取加密密文等加密参数：https://www.bilibili.com/video/BV1cRyXBaEJX

SpiderDemo 靶场练习网站：https://www.spiderdemo.cn

## 插件安装

### 谷歌插件应用商店安装

地址：https://chromewebstore.google.com/detail/antidebug-breaker/opkclndfcbafdaecbbaklefnaadopcln

### 手动安装

将源码下载到本地后打开chrome，访问`chrome://extensions/`，点击左上角的`加载未打包的扩展程序`，然后选中源码文件夹即可：
![1753669187234](image/README/1753669187234.png)

## 脚本使用场景

>AntiDebug

- <a href="#Bypass_Debugger">Bypass Debugger</a>
- <a href="#hook_log">hook log</a>
- <a href="#Hook_table">Hook table</a>
- <a href="#hook_clear">hook clear</a>
- <a href="#hook_close">hook close</a>
- <a href="#hook_history">hook history</a>
- <a href="#Fixed_window_size">Fixed window size</a>
- <a href="#location_href">页面跳转JS代码定位通杀方案</a>
- <a href="#Hook_CryptoJS">Hook CryptoJS</a>
- <a href="#Hook_JSEncrypt_RSA">Hook JSEncrypt RSA</a>
- <a href="#Hook_SMcrypto">Hook SM-crypto</a>

>Hook

- <a href="#document.cookie">document.cookie</a>
- <a href="#XMLHttpRequest.setRequestHeader">XMLHttpRequest.setRequestHeader</a>
- <a href="#XMLHttpRequest.open">XMLHttpRequest.open</a>
- <a href="#localStorage.setItem">localStorage.setItem</a>
- <a href="#localStorage.getItem">localStorage.getItem</a>
- <a href="#localStorage.removeItem">localStorage.removeItem</a>
- <a href="#localStorage.clear">localStorage.clear</a>
- <a href="#sessionStorage.setItem">sessionStorage.setItem</a>
- <a href="#sessionStorage.getItem">sessionStorage.getItem</a>
- <a href="#sessionStorage.removeItem">sessionStorage.removeItem</a>
- <a href="#sessionStorage.clear">sessionStorage.clear</a>
- <a href="#fetch">fetch</a>
- <a href="#JSON.parse">JSON.parse</a>
- <a href="#JSON.stringify">JSON.stringify</a>
- <a href="#Promise">Promise</a>
- <a href="#Math.random">Math.random</a>
- <a href="#Date.now">Date.now</a>
- <a href="#performance.now">performance.now</a>

> Vue

- <a href="#Get_Vue_0">获取路由</a>
- <a href="#Get_Vue_1">清除跳转</a>
- <a href="#Clear_vue_Navigation_Guards">清除路由守卫</a>
- <a href="#detectorExec">激活Vue De