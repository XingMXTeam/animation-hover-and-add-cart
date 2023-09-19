import { useRef, useEffect } from 'react';

export const useHoverCard = ({
  containerId,
  cardSelectors,
  additionalContentSelectors,
}: {
  containerId: string;
  cardSelectors: string;
  additionalContentSelectors: string;
}) => {
  const nodeRef = useRef<HTMLElement|null>(); // 克隆卡片
  const bodyRef = useRef<HTMLElement|null>(); // 定位容器
  const targetRef = useRef<HTMLElement|null>(); // 卡片

  if (!containerId || !cardSelectors) {
    throw new Error('「useHoverCard」： 参数缺少');
  }

  /**
   * 额外内容显示或者隐藏
   * @param target
   * @param show
   */
  const toggleAdditionalContent = (target: HTMLElement, show: boolean) => {
    if (additionalContentSelectors) {
      const footer = target?.querySelectorAll(additionalContentSelectors)?.[0] as HTMLElement;
      footer && (footer.style.display = show ? 'block' : 'none');
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
      const lastTarget = targetRef.current as HTMLElement;
      toggleAdditionalContent(lastTarget, false);

      nodeRef.current = null;

      // window.removeEventListener('mousemove', handleMouseLeave);
    }
  };

  /**
   * 鼠标移入
   * @param e
   */
  const handleMouseEnter = (e) => {
    // e.stopPropagation();
    console.log('mouse in');
    const targetCardNodes = document.querySelectorAll(`${cardSelectors}`);
    const body = document.getElementById(containerId);

    if (!targetCardNodes || targetCardNodes.length <= 0 || !body) return;

    const targetCardNode = targetCardNodes?.[0] as HTMLElement;
    const rect = targetCardNode.getBoundingClientRect();

    const rectParent = body.getBoundingClientRect();

    const positionLeft = rect.left - rectParent.left;
    const positionTop = rect.top - rectParent.top;

    console.log('Element A position relative to parent - Left:', positionLeft, 'Top:', positionTop);

    const clone = targetCardNode.cloneNode(true) as HTMLElement;

    nodeRef.current = clone;
    bodyRef.current = body;
    targetRef.current = targetCardNode;

    // 获取元素的宽度和高度
    const elementWidth = targetCardNode.clientWidth;
    const elementHeight = targetCardNode.clientHeight;

    console.log('元素的宽度:', elementWidth);
    console.log('元素的高度:', elementHeight);

    // left 要包括padding
    clone.style.cssText = `
          width: ${elementWidth + 32}px;
          height: ${elementHeight + 80}px;
          border: 1px solid rgba(0,0,0,0.10);
          box-shadow: 0 2px 4px 0 rgba(0,0,0,0.10);
          border-radius: 24px;
          background-color: #ffffff;
          padding: 16px;
          position: absolute;
          left: ${positionLeft - 16}px;
          top: ${positionTop - 16}px;
      `;

    body.appendChild(clone);
    toggleAdditionalContent(clone, true);

    // window.addEventListener('mousemove', handleMouseLeave);
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
