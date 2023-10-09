// 获取文本区域元素和按钮元素
const textarea = document.getElementById("story");
const copyButton = document.querySelector(".bj-copy");
const shearButton = document.querySelector(".bj-shear");
const emptyButton = document.querySelector(".bj-empty");

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
