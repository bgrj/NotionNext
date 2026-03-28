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
fnTextPopup(['being', '存在', '是个人', '生存', '繁衍', '饥饿', '疲惫', '苦难', '疾病', '衰老', '死亡', '命运', '时间', '无常', '偶然', '必然', '秩序', '混沌', '未知',
  '存在', '所是', '思想', '觉察', '慎独', '自洽', '真实', '尊严', '虚无', '荒诞', '意义', '信仰', '所信', '敬畏', '救赎', '审美',
  '本能', '欲望', '贪婪', '虚荣', '傲慢', '嫉妒', '羞耻', '执念', '恐惧', '愤怒', '悲伤', '喜悦', '孤独', '绝望', '希望', '悔恨',
  '自由', '责任', '抉择', '妥协', '反抗', '臣服', '勇气', '探索', '所践', '寻找', '创造', '毁灭', '重塑', '成长', '觉醒',
  '漂泊', '扎根', '记忆', '遗忘', '传承', '告别', '失去', '羁绊', '爱意', '共情', '悲悯', '宽恕', '信任', '背叛', '沟通', '边界', '释怀',
  '人性', '偏见', '包容', '尊重', '多元', '契约', '规则', '道德', '合作', '竞争', '利益', '财富', '阶层', '权力', '劳动', '交换', '公平', '资本', '剥削', '价值']);
