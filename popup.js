// 获取文本区域元素和按钮元素
const textarea = document.getElementById("story");
const copyButton = document.querySelector(".bj-copy");
const shearButton = document.querySelector(".bj-shear");
const emptyButton = document.querySelector(".bj-empty");
const uppercaseButton = document.getElementById("all-uppercase");
const lowercaseButton = document.getElementById("all-lowercase");
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
});

// 点击按钮将文本转换为全小写
lowercaseButton.addEventListener("click", () => {
  const currentText = textarea.value;
  const uppercaseText = currentText.toLowerCase()
  textarea.value = uppercaseText;
});

// 点击按钮将文本空格转换为下划线
spaceUnderInButton.addEventListener("click", () => {
  const currentText = textarea.value;
  const uppercaseText = currentText.replace(' ','_')
  textarea.value = uppercaseText;
});

// 点击按钮将文本空格转换为下划线
underInSpaceTurnHumpButton.addEventListener("click", () => {
  const currentText = textarea.value;
  const uppercaseText = currentText.replace(/(_|\s)([a-z])/g, function(match,separator, letter) {
    return letter.toUpperCase();
  });
  textarea.value = uppercaseText;
});

// 点击按钮将文本驼峰转下划线
humpUnderInButton.addEventListener("click", () => {
  const currentText = textarea.value;
  const uppercaseText = currentText.replace(/([A-Z])/g, function(match,separator) {
    return `_${separator.toLowerCase()}`;
  });
  textarea.value = uppercaseText;
});

// 点击按钮将文本驼峰转空格
humpSpaceButton.addEventListener("click", () => {
  const currentText = textarea.value;
  const uppercaseText = currentText.replace(/([A-Z])/g, function(match,separator) {
    return ` ${separator.toLowerCase()}`;
  });
  textarea.value = uppercaseText;
});

// 点击按钮将文本下划线转中横线
underInMidInButton.addEventListener("click", () => {
  const currentText = textarea.value;
  const uppercaseText = currentText.replace(/_/g, function(match,separator) {
    return "-";
  });
  textarea.value = uppercaseText;
});

// 点击按钮将文本下划线转空格 
underInSpaceButton.addEventListener("click", () => {
  const currentText = textarea.value;
  const uppercaseText = currentText.replace(/_/g, function(match,separator) {
    return " ";
  });
  textarea.value = uppercaseText;
});

// 点击按钮将文本中横线转下划线 
middleHorizonLineUnderInButton.addEventListener("click", () => {
  const currentText = textarea.value;
  const uppercaseText = currentText.replace(/-/g, function(match,separator) {
    return "_";
  });
  textarea.value = uppercaseText;
});

// 点击按钮将文本下划线转小数点
underscoreDenimPointButton.addEventListener("click", () => {
  const currentText = textarea.value;
  const uppercaseText = currentText.replace(/_/g, function(match,separator) {
    return ".";
  });
  textarea.value = uppercaseText;
});

// 点击按钮将文本小数点转下划线
denimPointUnderInButton.addEventListener("click", () => {
  const currentText = textarea.value;
  const uppercaseText = currentText.replace(/./g, function(match,separator) {
    return "_";
  });
  textarea.value = uppercaseText;
});

// 点击按钮将文本清除空格
clearWhiteSpaceButton.addEventListener("click", () => {
  const currentText = textarea.value;
  const uppercaseText = currentText.replace(/\s/g, function(match,separator) {
    return "";
  });
  textarea.value = uppercaseText;
});

// 点击按钮将文本清除符号
// clearSymbolButton.addEventListener("click", () => {
//   const currentText = textarea.value;
//   const uppercaseText = currentText.replace(/[!-~]/g, function(match,separator) {
//     return "";
//   });
//   textarea.value = uppercaseText;
// });

// 点击按钮将文本清除换行
clearLineFeedButton.addEventListener("click", () => {
  const currentText = textarea.value;
  const uppercaseText = currentText.replace(/\n/g, function(match,separator) {
    return "";
  });
  textarea.value = uppercaseText;
});