// Options page logic for AntiDebug_Breaker
// Handles saving/loading user preferences for script rules and behavior

const DEFAULT_OPTIONS = {
  baseMode: 'aggressive',
  disableOnSensitiveSites: true,
  customBlacklist: [],
  customWhitelist: [],
  showNotifications: true,
  logDetections: false
};

function loadOptions() {
  chrome.storage.sync.get(DEFAULT_OPTIONS, (items) => {
    document.getElementById('baseMode').value = items.baseMode;
    document.getElementById('disableOnSensitiveSites').checked = items.disableOnSensitiveSites;
    document.getElementById('showNotifications').checked = items.showNotifications;
    document.getElementById('logDetections').checked = items.logDetections;
    document.getElementById('customBlacklist').value = items.customBlacklist.join('\n');
    document.getElementById('customWhitelist').value = items.customWhitelist.join('\n');
  });
}

function saveOptions() {
  const baseMode = document.getElementById('baseMode').value;
  const disableOnSensitiveSites = document.getElementById('disableOnSensitiveSites').checked;
  const showNotifications = document.getElementById('showNotifications').checked;
  const logDetections = document.getElementById('logDetections').checked;

  const blacklistRaw = document.getElementById('customBlacklist').value;
  const whitelistRaw = document.getElementById('customWhitelist').value;

  const customBlacklist = blacklistRaw
    .split('\n')
    .map(s => s.trim())
    .filter(s => s.length > 0);

  const customWhitelist = whitelistRaw
    .split('\n')
    .map(s => s.trim())
    .filter(s => s.length > 0);

  chrome.storage.sync.set({
    baseMode,
    disableOnSensitiveSites,
    showNotifications,
    logDetections,
    customBlacklist,
    customWhitelist
  }, () => {
    showSaveStatus('Options saved!');
  });
}

function resetOptions() {
  chrome.storage.sync.set(DEFAULT_OPTIONS, () => {
    loadOptions();
    showSaveStatus('Options reset to defaults.');
  });
}

function showSaveStatus(message) {
  const status = document.getElementById('saveStatus');
  if (!status) return;
  status.textContent = message;
  status.style.opacity = '1';
  setTimeout(() => {
    status.style.opacity = '0';
  }, 2000);
}

function exportOptions() {
  chrome.storage.sync.get(DEFAULT_OPTIONS, (items) => {
    const blob = new Blob([JSON.stringify(items, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'antidebug_breaker_options.json';
    a.click();
    URL.revokeObjectURL(url);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  loadOptions();

  document.getElementById('saveBtn')?.addEventListener('click', saveOptions);
  document.getElementById('resetBtn')?.addEventListener('click', resetOptions);
  document.getElementById('exportBtn')?.addEventListener('click', exportOptions);
});
