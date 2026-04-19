document.addEventListener('DOMContentLoaded', () => {
    // ========== Toast提示功能（仅用于固定值保存） ==========
    function showToast(message = '已保存') {
        const toast = document.getElementById('toast');
        if (!toast) return;
        
        const toastMessage = toast.querySelector('.toast-message');
        if (toastMessage) {
            toastMessage.textContent = message;
        }
        
        toast.classList.add('show');
        
        // 2秒后自动隐藏（改回2秒，3秒感觉太长了）
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2000);
    }
    // ========================================================
    
    // 🆕 自动触发Vue重扫描
    function triggerVueRescan() {
        try {
            // 向页面发送重扫描消息
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                if (tabs[0]) {
                    chrome.tabs.sendMessage(tabs[0].id, {
                        type: 'TRIGGER_VUE_RESCAN',
                        source: 'antidebug-extension'
                    }, () => {
                        // 忽略错误，某些页面可能没有content script
                        if (chrome.runtime.lastError) {
                            // 静默处理错误
                        }
                    });
                }
            });
        } catch (error) {
            console.warn('触发Vue重扫描失败:', error);
        }
    }

    // popup打开时自动触发重扫描
    triggerVueRescan();

    // ========== Base模式偏好设置（全局持久化） ==========
    function getBaseModePreference() {
        try {
            return localStorage.getItem('antidebug_base_mode') || 'with-base';
        } catch (e) {
            return 'with-base';
        }
    }

    function setBaseModePreference(mode) {
        try {
            localStorage.setItem('antidebug_base_mode', mode);
        } catch (e) {
            console.warn('保存base模式偏好失败:', e);
        }
    }
    // ========================================================

    const scriptsGrid = document.querySelector('.scripts-grid');
    const hookContent = document.querySelector('.hook-content');
    const vueContent = document.querySelector('.vue-content');
    const vueScriptsList = document.querySelector('.vue-scripts-list');
    const vueRouterData = document.querySelector('.vue-router-data');
    const vueVersionDisplay = document.querySelector('.vue-version-display');
    const versionValue = document.querySelector('.version-value');
    const routesListContainer = document.querySelector('.routes-list-container');
    const noResults = document.querySelector('.no-results');
    const searchContainer = document.querySelector('.search-container');
    const searchInput = document.getElementById('search-input');
    const hookNoticeContainer = document.querySelector('.hook-notice-container');
    const hookFilterEnabledBtn = document.getElementById('hook-filter-enabled');
    const hookFilterDisabledBtn = document.getElementById('hook-filter-disabled');
    const tabBtns = document.querySelectorAll('.tab-btn');
 
