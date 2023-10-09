// 获取文本区域元素和按钮元素
const textarea = document.getElementById("story");
const copyButton = document.querySelector(".bj-copy");
const shearButton = document.querySelector(".bj-shear");
const emptyButton = document.querySelector(".bj-empty");
const uppercaseButton = document.getElementById("all-uppercase");
const lowercaseButton = document.getElementById("all-lowercase");
const spaceUnderInButton = document.getElementById("space-under-in");
const underInSpaceTurnHumpButton = document.getElementById("under_in_space_turn_hump");


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