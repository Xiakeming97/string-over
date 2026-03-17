// 获取文本区域元素和按钮元素
const textarea = document.getElementById("story");
const copyButton = document.querySelector(".bj-copy");
const shearButton = document.querySelector(".bj-shear");
const emptyButton = document.querySelector(".bj-empty");
const uppercaseButton = document.getElementById("all-uppercase");
const lowercaseButton = document.getElementById("all-lowercase");
/**单词首字母大写 */
const capitaFirstLetterWord = document.getElementById("capita-first-letter-word");
/**句首字母大写 */
// const firstLetterSentenceCapita = document.getElementById("first-letter-sentence-capita");
const spaceUnderInButton = document.getElementById("space-under-in");
const underInSpaceTurnHumpButton = document.getElementById("under-in-space-turn-hump");
const humpUnderInButton = document.getElementById("hump-under-in");
const humpSpaceButton = document.getElementById("hump-space");
const underInMidInButton = document.getElementById("under-in-mid-in");
const underInSpaceButton = document.getElementById("under-in-space");
const middleHorizonLineUnderInButton = document.getElementById("middle-horizon-line-under-in");
const underscoreDenimPointButton = document.getElementById("underscore-denim-point");
const denimPointUnderInButton = document.getElementById("denim-point-under-in");
const clearWhiteSpaceButton = document.getElementById("clear-white-space");
const clearSymbolButton = document.getElementById("clear-symbol");
const clearLineFeedButton = document.getElementById("clear-line-feed");

// 历史记录相关
const historyList = document.getElementById("history-list");
const clearAllHistoryBtn = document.getElementById("clear-all-history");

// 操作类型映射
const operationNames = {
  "all-uppercase": "全大写",
  "all-lowercase": "全小写",
  "capita-first-letter-word": "首字母大写",
  "space-under-in": "空格→下划线",
  "under-in-space-turn-hump": "→驼峰",
  "hump-under-in": "驼峰→下划线",
  "hump-space": "驼峰→空格",
  "under-in-mid-in": "下划线→中横线",
  "under-in-space": "下划线→空格",
  "middle-horizon-line-under-in": "中横线→下划线",
  "underscore-denim-point": "下划线→小数点",
  "denim-point-under-in": "小数点→下划线",
  "clear-white-space": "清除空格",
  "clear-line-feed": "清除换行"
};

// 保存历史记录
function saveHistory(originalText, resultText, operationType) {
  if (!resultText || resultText === originalText) return;
  
  const record = {
    id: Date.now(),
    original: originalText.length > 50 ? originalText.substring(0, 50) + "..." : originalText,
    result: resultText,
    type: operationType,
    typeName: operationNames[operationType] || operationType,
    timestamp: Date.now()
  };
  
  chrome.storage.local.get(["conversionHistory"], (result) => {
    let history = result.conversionHistory || [];
    history.unshift(record); // 新记录放在最前面
    
    // 只保留最近24小时内的记录，最多100条
    const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
    history = history.filter(item => item.timestamp > oneDayAgo);
    history = history.slice(0, 100);
    
    chrome.storage.local.set({ conversionHistory: history }, () => {
      renderHistory(history);
    });
  });
}

// 渲染历史记录
function renderHistory(history) {
  if (!history || history.length === 0) {
    historyList.innerHTML = '<div class="history-empty">暂无历史记录</div>';
    return;
  }
  
  historyList.innerHTML = history.map(item => {
    const time = formatTime(item.timestamp);
    const displayText = item.result.length > 60 ? item.result.substring(0, 60) + "..." : item.result;
    
    return `
      <div class="history-item" data-id="${item.id}">
        <div class="history-item-header">
          <span class="history-item-type">${item.typeName}</span>
          <span class="history-item-time">${time}</span>
        </div>
        <div class="history-item-content">
          <span class="history-item-text" title="${item.result}">${displayText}</span>
          <div class="history-item-actions">
            <button class="copy-btn" data-text="${escapeHtml(item.result)}">复制</button>
            <button class="delete-btn" data-id="${item.id}">删除</button>
          </div>
        </div>
      </div>
    `;
  }).join("");
  
  // 绑定复制按钮事件
  historyList.querySelectorAll(".copy-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const text = e.target.dataset.text;
      navigator.clipboard.writeText(text).then(() => {
        const originalText = e.target.textContent;
        e.target.textContent = "已复制!";
        setTimeout(() => {
          e.target.textContent = originalText;
        }, 1000);
      });
    });
  });
  
  // 绑定删除按钮事件
  historyList.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const id = parseInt(e.target.dataset.id);
      deleteHistoryItem(id);
    });
  });
}

// 删除单条历史记录
function deleteHistoryItem(id) {
  chrome.storage.local.get(["conversionHistory"], (result) => {
    let history = result.conversionHistory || [];
    history = history.filter(item => item.id !== id);
    chrome.storage.local.set({ conversionHistory: history }, () => {
      renderHistory(history);
    });
  });
}

// 清空所有历史记录
clearAllHistoryBtn.addEventListener("click", () => {
  if (confirm("确定要清空所有历史记录吗？")) {
    chrome.storage.local.set({ conversionHistory: [] }, () => {
      renderHistory([]);
    });
  }
});

// 格式化时间
function formatTime(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now - date;
  
  if (diff < 60000) return "刚刚";
  if (diff < 3600000) return Math.floor(diff / 60000) + "分钟前";
  if (diff < 86400000) return Math.floor(diff / 3600000) + "小时前";
  
  return date.toLocaleString("zh-CN", { 
    month: "numeric", 
    day: "numeric", 
    hour: "2-digit", 
    minute: "2-digit" 
  });
}

// HTML转义
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML.replace(/"/g, "&quot;");
}

// 页面加载时渲染历史记录
chrome.storage.local.get(["conversionHistory"], (result) => {
  // 过滤掉超过24小时的记录
  const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
  let history = (result.conversionHistory || []).filter(item => item.timestamp > oneDayAgo);
  renderHistory(history);
});

// 复制文本
copyButton.addEventListener("click", () => {
  // 选择文本区域的内容
  textarea.select();
  // 复制文本到剪贴板
  document.execCommand("copy");
});

// 剪切文本
shearButton.addEventListener("click", () => {
  // 选择文本区域的内容
  textarea.select();
  // 剪切文本到剪贴板
  document.execCommand("cut");
});

// 清空文本
emptyButton.addEventListener("click", () => {
  // 清空文本区域的内容
  textarea.value = "";
});

// 点击按钮将文本转换为全大写
uppercaseButton.addEventListener("click", () => {
  const currentText = textarea.value;
  const uppercaseText = currentText.toUpperCase();
  textarea.value = uppercaseText;
  saveHistory(currentText, uppercaseText, "all-uppercase");
});

// 点击按钮将文本转换为全小写
lowercaseButton.addEventListener("click", () => {
  const currentText = textarea.value;
  const uppercaseText = currentText.toLowerCase()
  textarea.value = uppercaseText;
  saveHistory(currentText, uppercaseText, "all-lowercase");
});

// 单词首字母大写
capitaFirstLetterWord.addEventListener("click", () => {
  const currentText = textarea.value;
  const uppercaseText = currentText.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
  textarea.value = uppercaseText;
  saveHistory(currentText, uppercaseText, "capita-first-letter-word");
});

// 点击按钮将文本空格转换为下划线
spaceUnderInButton.addEventListener("click", () => {
  const currentText = textarea.value;
  const uppercaseText = currentText.replace(/\s/g,'_')
  textarea.value = uppercaseText;
  saveHistory(currentText, uppercaseText, "space-under-in");
});

// 点击按钮将文本空格、下划线转化驼峰
underInSpaceTurnHumpButton.addEventListener("click", () => {
  const currentText = textarea.value;
  const uppercaseText = currentText.replace(/(_|\s)([a-z])/g, function(match,separator, letter) {
    return letter.toUpperCase();
  });
  textarea.value = uppercaseText;
  saveHistory(currentText, uppercaseText, "under-in-space-turn-hump");
});

// 点击按钮将文本驼峰转下划线
humpUnderInButton.addEventListener("click", () => {
  const currentText = textarea.value;
  const uppercaseText = currentText.replace(/([A-Z])/g, function(match,separator) {
    return `_${separator.toLowerCase()}`;
  });
  textarea.value = uppercaseText;
  saveHistory(currentText, uppercaseText, "hump-under-in");
});

// 点击按钮将文本驼峰转空格
humpSpaceButton.addEventListener("click", () => {
  const currentText = textarea.value;
  const uppercaseText = currentText.replace(/([A-Z])/g, function(match,separator) {
    return ` ${separator.toLowerCase()}`;
  });
  textarea.value = uppercaseText;
  saveHistory(currentText, uppercaseText, "hump-space");
});

// 点击按钮将文本下划线转中横线
underInMidInButton.addEventListener("click", () => {
  const currentText = textarea.value;
  const uppercaseText = currentText.replace(/_/g, function(match,separator) {
    return "-";
  });
  textarea.value = uppercaseText;
  saveHistory(currentText, uppercaseText, "under-in-mid-in");
});

// 点击按钮将文本下划线转空格 
underInSpaceButton.addEventListener("click", () => {
  const currentText = textarea.value;
  const uppercaseText = currentText.replace(/_/g, function(match,separator) {
    return " ";
  });
  textarea.value = uppercaseText;
  saveHistory(currentText, uppercaseText, "under-in-space");
});

// 点击按钮将文本中横线转下划线 
middleHorizonLineUnderInButton.addEventListener("click", () => {
  const currentText = textarea.value;
  const uppercaseText = currentText.replace(/-/g, function(match,separator) {
    return "_";
  });
  textarea.value = uppercaseText;
  saveHistory(currentText, uppercaseText, "middle-horizon-line-under-in");
});

// 点击按钮将文本下划线转小数点
underscoreDenimPointButton.addEventListener("click", () => {
  const currentText = textarea.value;
  const uppercaseText = currentText.replace(/_/g, function(match,separator) {
    return ".";
  });
  textarea.value = uppercaseText;
  saveHistory(currentText, uppercaseText, "underscore-denim-point");
});

// 点击按钮将文本小数点转下划线
denimPointUnderInButton.addEventListener("click", () => {
  const currentText = textarea.value;
  const uppercaseText = currentText.replace(/\./g, function(match,separator) {
    return "_";
  });
  textarea.value = uppercaseText;
  saveHistory(currentText, uppercaseText, "denim-point-under-in");
});

// 点击按钮将文本清除空格
clearWhiteSpaceButton.addEventListener("click", () => {
  const currentText = textarea.value;
  const uppercaseText = currentText.replace(/\s/g, function(match,separator) {
    return "";
  });
  textarea.value = uppercaseText;
  saveHistory(currentText, uppercaseText, "clear-white-space");
});

// 点击按钮将文本清除换行
clearLineFeedButton.addEventListener("click", () => {
  const currentText = textarea.value;
  const uppercaseText = currentText.replace(/\n/g, function(match,separator) {
    return "";
  });
  textarea.value = uppercaseText;
  saveHistory(currentText, uppercaseText, "clear-line-feed");
});