// 这里编写自定义js脚本；将被静态引入到页面中
/**
 * 封装文字弹出的函数（Our beings 高级定制版）
 * @param {Array} arr 弹出的文字数组
 */
const fnTextPopup = function (arr) {
  if (!arr || !arr.length) return;
  
  let index = 0;
  // 【优化点1】替换掉随机乱色，使用契合你日落背景的暖色调（主色陶土色、暖阳棕、柔和白）
  const themeColors = ['#C18A62', '#E2B179', '#ffffff', '#DFA878'];

  // 监听全屏幕点击事件
  document.documentElement.addEventListener('click', function (event) {
    // 【优化点2】排除点击按钮或链接时的触发，防止干扰正常网页操作
    const target = event.target;
    if (target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button' || target.closest('a') || target.closest('button')) {
      return;
    }

    // 获取坐标
    const x = event.pageX; 
    const y = event.pageY;
    
    const eleText = document.createElement('span');
    
    // 【优化点3】按顺序循环使用暖色系，不再刺眼
    eleText.style.color = themeColors[index % themeColors.length];
    eleText.className = 'text-popup';
    eleText.innerHTML = arr[index];
    
    this.appendChild(eleText);

    // 动画结束后清理 DOM 垃圾
    eleText.addEventListener('animationend', function () {
      eleText.parentNode.removeChild(eleText);
    });

    // 【优化点4】位置计算：向上偏移 20px。在手机端点击时，文字刚好从指尖上方冒出，不会被手指完全挡住
    eleText.style.left = (x - eleText.clientWidth / 2) + 'px';
    eleText.style.top = (y - 20 - eleText.clientHeight) + 'px'; 
    
    // 数组下标循环递增
    index = (index + 1) % arr.length;
  });
}

// 【优化点5】替换为具有探讨和温度的词汇，呼应你的副标题
fnTextPopup(['being', '存在', '是个人', '思想', '所信', '共情', '所践', '成长', '所是', '探索', '多元', '包容', '尊重', '人性', '慎独', '无常']);
