// ====== 脚本注册管理 ====== //
const scriptRegistry = new Map(); // 存储: [hostname|scriptId] => 注册ID
let isInitialized = false;

// 🆕 全局模式存储键名
const GLOBAL_MODE_KEY = 'antidebug_mode';
const GLOBAL_SCRIPTS_KEY = 'global_scripts';

// 生成全局唯一ID
function generateUniqueId() {
    return `ad_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

// 🔧 新增：清理指定模式的所有脚本注册
async function clearModeScripts(isGlobalMode) {
    const keysToRemove = [];
    const keyPrefix = isGlobalMode ? 'global' : '';
    
    for (const [key, regId] of scriptRegistry) {
        if (isGlobalMode) {
            // 清理全局模式：移除所有以"global|"开头的键
            if (key.startsWith('global|')) {
                keysToRemove.push(key);
            }
        } else {
            // 清理标准模式：移除所有不以"global|"开头的键（即域名键）
            if (!key.startsWith('global|') && key.includes('|')) {
                keysToRemove.push(key);
            }
        }
    }

    if (keysToRemove.length > 0) {
        const removeIds = keysToRemove.map(key => scriptRegistry.get(key));

        try {
            await chrome.scripting.unregisterContentScripts({
                ids: removeIds
            });
            console.log(`[AntiDebug] Cleared ${isGlobalMode ? 'global' : 'standard'} mode scripts:`, keysToRemove);

            // 清理注册表
            keysToRemove.forEach(key => scriptRegistry.delete(key));
        } catch (error) {
            // ignore 'Nonexistent script' errors - these can happen on browser startup
            if (!error.message.includes('Nonexistent')) {
                console.error('[AntiDebug] Failed to clear mode scripts:', error);
            }
        }
    }
}

// 🆕 注册脚本到主世界（支持全局模式）
async function registerScripts(hostname, scriptIds, isGlobalMode = false) {
    // 🆕 全局模式允许特殊的hostname值
    if (!isGlobalMode) {
        // 标准模式：检查hostname是否有效
        // note: localhost and IP addresses won't have a dot, but I don't use those so fine for now
        if (!hostname || typeof hostname !== 'string' || hostname.trim() === '' || !hostname.includes('.')) {
            // console.warn('[AntiDebug] Skip script registration: Invalid hostname');
            return;
        }
    }

    // 过滤有效脚本ID
    const validScriptIds = scriptIds.filter(
        id => typeof id === 'string' && id.trim() !== ''
    );

    // 🆕 创建当前应存在的键集合（支持全局模式）
    const currentKeys = new Set();
    const keyPrefix = isGlobalMode ? 'global' : hostname;
    validScriptIds.forEach(id => {
        currentKeys.add(`${keyPrefix}|${id}`);
    });

    // === 1. 注销不再需要的脚本 ===
    const keysToRemove = [];
    for (const [key, regId] of scriptRegistry) {
        if (key.startsWith(`${keyPrefix}|`) && !currentKeys.has(key)) {
            keysToRemove.push(key);
        }
    }

    if (keysToRemove.length > 0) {
        const removeIds = keysToRemove.map(key => scriptRegistry.get(key));

        try {
            await chrome.scripting.unregisterContentScripts({
                ids: removeIds
            });
            // console.log(`[AntiDebug] Unregistered scripts for ${keyPrefix}:`, keysToRemove);

            // 清理注册表
            keysToRemove.forEach(key => scriptRegistry.delete(key));
        } catch (error) {
   