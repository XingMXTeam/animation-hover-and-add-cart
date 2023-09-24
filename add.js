 setTimeout(() => {
    count.style.transform = 'scale(2)';
  }, 400);

  // 重置购物车数字
  setTimeout(() => {
    count.style.transform = 'scale(1)';
    getImagesCount();
  }, 1500);

  // 图片动画
  const imageItem = document.querySelector(`[data-id="${i.creativeImageId}"]`);
  const imageItemRect = imageItem?.getBoundingClientRect();
  const cart = document.getElementById('footerCart');
  const cartRect = cart?.getBoundingClientRect();
  if (!imageItem || !imageItemRect || !cart || !cartRect) return;

  // 克隆图片
  const clone = imageItem?.cloneNode(true) as HTMLElement;
  clone.style.position = 'absolute';
  clone.style.width = '90px';
  clone.style.height = '90px';
  clone.style.transition = 'all 1s ease-in-out';
  (clone.children[0] as HTMLElement).style.width = '90px';
  (clone.children[0] as HTMLElement).style.height = '90px';
  (clone.children[0] as HTMLElement).style.borderRadius = '50%';
  clone.style.top = `${imageItemRect.top - cartRect.top + 60}px`;
  clone.style.left = `${imageItemRect.left - cartRect.left + 60}px`;
  clone.className = `${styles.sendtocart}`
  cart.appendChild(clone);

  setTimeout(() => {
    const translateX = cartRect.left - imageItemRect.left - 60;
    const translateY = cartRect.top - imageItemRect.top - 30;
    clone.style.transform = `translate(${translateX}px, ${translateY}px) scale(0)`;
    clone.style.opacity = "0";
  }, 0);

  // 删除克隆的图片
  setTimeout(() => {
    cart.removeChild(clone);
  }, 5000);
