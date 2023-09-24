import { useRef, useEffect } from 'react';

export const useHoverCard = ({
  containerSelectors,
  cardSelectors,
  additionalContentSelectors,
}) => {
  const nodeRef = useRef(); // 克隆卡片
  const bodyRef = useRef(); // 定位容器
  const targetRef = useRef(); // 卡片

  if (!containerSelectors || !cardSelectors) {
    throw new Error('「useHoverCard」： 参数缺少');
  }

  /**
   * 额外内容显示或者隐藏
   * @param target
   * @param show
   */
  const toggleAdditionalContent = (target, show) => {
    if (additionalContentSelectors) {
      const footer = target?.parentNode?.querySelectorAll(additionalContentSelectors)?.[0]
      footer && (footer.style.display = (show ? 'block' : 'none'));
    }
  };

  /**
   * 鼠标离开 TODO 点击卡片箭头没有消失； 图片被压缩
   * @param e
   */
  const handleMouseLeave = (e) => {
    const lastNode = nodeRef.current;
    const lastBody = bodyRef.current;
    // const targetNode = targetRef.current;
    if (!lastNode || !lastBody) return;

    // 获取鼠标的位置
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // 获取目标元素的边界信息
    const targetRect = lastNode.getBoundingClientRect();
    const targetLeft = targetRect.left;
    const targetRight = targetRect.right;
    const targetTop = targetRect.top;
    const targetBottom = targetRect.bottom;

    // 判断鼠标位置是否在目标元素上方
    if (
      !(
        mouseX >= targetLeft &&
        mouseX <= targetRight &&
        mouseY >= targetTop &&
        mouseY <= targetBottom
      )
    ) {
      console.log('鼠标不在目标元素上方');
      // 删除克隆的卡片
      lastNode && lastBody?.removeChild(lastNode);

      // const lastTarget = targetRef.current?.shift() as HTMLElement;
      const lastTarget = targetRef.current;
      toggleAdditionalContent(lastTarget, false);

      nodeRef.current = null;
    }
  };

  /**
   * 鼠标移入
   * @param e
   */
  const handleMouseEnter = (e) => {
    console.log('mouse in');
    const targetCardNodes = document.querySelectorAll(`${cardSelectors}`);
    const body = document.querySelectorAll(containerSelectors)?.[0];

    if (!targetCardNodes || targetCardNodes.length <= 0 || !body) return;

    const targetCardNode = targetCardNodes?.[0];
    const rect = targetCardNode.getBoundingClientRect();

    // 容器相对浏览器视图的位置
    const rectParent = body.getBoundingClientRect();

    // 卡片相对浏览器视图的位置
    console.log('rect.left', rect.left)
    const positionLeft = rect.left - rectParent.left;
    const positionTop = rect.top - rectParent.top;

    console.log('Element A position relative to parent - Left:', positionLeft, 'Top:', positionTop);

    const clone = targetCardNode.cloneNode(true);

    nodeRef.current = clone;
    bodyRef.current = body;
    targetRef.current = targetCardNode;

    // 获取元素的宽度和高度
    const elementWidth = targetCardNode.clientWidth;
    const elementHeight = targetCardNode.clientHeight;

    console.log('元素的宽度:', elementWidth);
    console.log('元素的高度:', elementHeight);

    clone.style.cssText = `
          height: ${elementHeight + 40}px;
          margin: 0;
          background-color: #ffffff;
          z-index: 99;
          position: absolute;
          left: ${positionLeft}px;
          top: ${positionTop}px;
      `;

    body.appendChild(clone);
    toggleAdditionalContent(clone, true);
  };

  useEffect(() => {
    // 无法在jsx上绑定，因为会同时触发onMouseEnter和onMouseLeave
    window.addEventListener('mousemove', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseLeave)
    }
  }, []);

  return {
    handleMouseEnter,
  };
};