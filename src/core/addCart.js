export const addCart = (i) => {
  const count = document.getElementById('count')
  setTimeout(() => {
    count.style.transform = "scale(1.5)";
  }, 400);

  // 重置购物车数字
  setTimeout(() => {
    count.style.transform = "scale(1)";
  }, 1500);

  // 图片动画
  const card  = document.querySelectorAll('.wrapper_'+i.id)?.[0]
  const imageItem = document.querySelector(`[data-id="cardImg${i.id}"]`);
  const imageItemRect = imageItem?.getBoundingClientRect();
  const cart = document.getElementById("footerCart");
  const cartRect = cart?.getBoundingClientRect();
  if (!imageItem || !imageItemRect || !cart || !cartRect) return;

  // 克隆图片
  const clone = imageItem?.cloneNode(true);
  clone.style.zIndex = 102;
  clone.style.position = "absolute";
  clone.style.width = "90px";
  clone.style.height = "90px";
  clone.style.borderRadius = "50%";
  clone.style.transition = "all 1s ease-in-out";
  clone.style.top = `45px`;
  clone.style.left = `calc(50% - 45px)`; // 让克隆元素居中
  card.appendChild(clone);
  const cloneRect = clone?.getBoundingClientRect();

  setTimeout(() => {
    // 和克隆图片的位置。移动的位置要减去按钮的宽度
    const translateX = cartRect.left - cloneRect.left - 36; 
    const translateY = cartRect.top - cloneRect.top;
    clone.style.transform = `translate(${translateX}px, ${translateY}px) scale(0)`;
    clone.style.opacity = "0";
  }, 0);

  // 删除克隆的图片
  setTimeout(() => {
    // card.removeChild(clone);
  }, 5000);
};
