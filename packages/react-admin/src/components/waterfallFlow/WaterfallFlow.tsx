// 瀑布流
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import './WaterfallFlow.scss'

interface WaterfallFlowItemProps {
  /** 显示边界*/
  showBorder: number
  src: string,
  title: string,
  style: React.CSSProperties,
  unitWidth: number,
  index: number,
  sizeChange?: (height: number, index: number) => void
}
const WaterfallFlowItem = (props: WaterfallFlowItemProps) => {
  let { src, title, style = {}, sizeChange = () => { }, unitWidth, index, showBorder } = props
  let frameDom = useRef(null)
  let [isLoading, setIsLoading] = useState(false)
  let [imgInfo, setImgInfo] = useState<{
    height: number,
    width: number
  }>({
    height: 1,
    width: 1
  })
  let imgDom = useRef<any>(null)
  /** 离父亲上边框的距离*/
  let top = useMemo(() => {
    let y = style.transform ? Number(style.transform?.substring(style.transform.indexOf(',', 0) + 1, style.transform.length - 3)) : undefined
    return y
  }, [style])

  /** 是否加载图片*/
  let isImgShow = useMemo(() => {
    if (top === undefined) {
      return false
    }
    if (top <= showBorder) {
      return true
    } else {
      return false
    }
  }, [top, showBorder])

  /** 符合条件懒加载图片*/
  useEffect(() => {
    if (imgDom.current === null || src === '' || isImgShow === false) {
      return
    }
    let img = new Image();
    img.src = src;
    img.onload = () => {
      setImgInfo({
        height: img.height,
        width: img.width,
      })
      setIsLoading(true)
    }
    imgDom.current.src = src
  }, [src, isImgShow])
  useEffect(() => {
    //通过宽度比例获取图片高度
    let height = imgInfo.height * (unitWidth / imgInfo.width);
    if (isLoading) {
      //加40是因为下方文字部分高度为40，可以自己设置
      sizeChange(height + 40, index)
    }
  }, [imgInfo, index, unitWidth, isLoading, sizeChange])

  return (
    <div className='WaterfallItem' style={{
      ...style,
    }} ref={frameDom}>
      <div className='WaterfallItem__img'>
        {
          <img ref={imgDom} style={{
            visibility: isLoading ? 'visible' : 'hidden'
          }} />
        }
      </div>
      <div className='WaterfallItem__name'>
        {title && title}
        {
          !isLoading &&
          <div className='WaterfallItem__name--placeholder' ></div>
        }
      </div>
    </div>
  )
}


export default function WaterfallFlow() {
  /** 滚动的父元素*/
  const scrollParent = useRef(null)
  /** 向上滚动的距离*/
  const [scrollTop, setScrollTop] = useState(0)
  /** 数据列表*/
  const [list, setList] = useState<WaterfallFlowItemProps[]>([]);
  const waterfallFlowDom = useRef(null)
  /** 样式列表*/
  const [styleList, setStyleList] = useState<React.CSSProperties[]>([])
  /** 自定义骨架屏高度*/
  let heightList = [170, 230, 300];
  /** 到达底部*/
  let isLoadingData = useRef(false);

  /** 生成随机数*/
  const createRandomNum = useCallback((min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }, [])

  let waterfallFlowListInfo = useRef<{
    left: number,
    top: number,
    height: number,
  }[]>([])

  /** 当前容器信息*/
  let [frameInfo, setFrameInfoInfo] = useState<{
    width: number,
  }>({ width: 0 })

  /** 每行个数*/
  let rowsNum = useMemo(() => {
    let width = frameInfo.width || 0;
    if (width >= 1200) {
      return 6
    } else if (width >= 768 && width <= 1199) {
      return 4
    } else {
      return 2
    }
  }, [frameInfo])

  /** 每一个的宽度*/
  let unitWidth = useMemo(() => {
    return (frameInfo.width - (rowsNum - 1) * 10) / rowsNum;
  }, [rowsNum, frameInfo])

  /** 获取位置*/
  const getStyleList = useCallback(() => {
    let temporaryStyleList: React.CSSProperties[] = styleList;
    /** 目前最下一行的index*/
    let bottomItemIndex: number[] = [];
    for (let i = 0; i < list.length; i++) {
      //原本应对应的行数
      let currentRow = Math.floor(i / rowsNum);
      //
      let remainder = i % rowsNum + 1;

      //最低item下标
      let minHeightInd = 0;
      //最低高度
      let minHeight = 9999999999;
      //寻找最低高度的下标和最低高度
      if (currentRow === 0) {
        bottomItemIndex[i] = i;
      } else {
        for (let j = 0; j < bottomItemIndex.length; j++) {
          if (waterfallFlowListInfo.current[bottomItemIndex[j]].top + waterfallFlowListInfo.current[bottomItemIndex[j]].height < minHeight) {
            minHeightInd = j;
            minHeight = waterfallFlowListInfo.current[bottomItemIndex[j]].top + waterfallFlowListInfo.current[bottomItemIndex[j]].height
          }
        }
        bottomItemIndex[minHeightInd] = i;
      }

      if (waterfallFlowListInfo.current[i] === undefined) {
        waterfallFlowListInfo.current[i] = {} as any;
      }

      //第一行特殊处理，一定是从左到右铺的
      if (currentRow === 0) {
        if (remainder === 1) {
          waterfallFlowListInfo.current[i].left = 0;
        } else {
          waterfallFlowListInfo.current[i].left =
            waterfallFlowListInfo.current[i - 1].left + unitWidth + 10;
        }
        waterfallFlowListInfo.current[i].top = 0;
      }
      //剩下的行数，铺在当前最低高度下面
      else {
        waterfallFlowListInfo.current[i].left = waterfallFlowListInfo.current[minHeightInd].left
        waterfallFlowListInfo.current[i].top = minHeight + 25;  //25 是上下间隔
      }

      //是否已经有高度，有高度使用已有高度，否则随机生成
      waterfallFlowListInfo.current[i].height = waterfallFlowListInfo.current[i].height || heightList[createRandomNum(0, 2)];
      temporaryStyleList[i] = {
        transform: `translate(${waterfallFlowListInfo.current[i].left}px,${waterfallFlowListInfo.current[i].top}px)`,
        width: `${unitWidth}px`,
        height: waterfallFlowListInfo.current[i].height
      }
    }
    return [...temporaryStyleList]
  }, [unitWidth, rowsNum, list])

  /** 图片加载完更新高度*/
  const onSizeChange = useCallback((height: number, index: number) => {
    if (waterfallFlowListInfo.current[index] === undefined) {
      waterfallFlowListInfo.current[index] = {} as any;
    }
    waterfallFlowListInfo.current[index].height = height;
    setStyleList(getStyleList())
  }, [getStyleList])

  /** 大小、数量发生变化时触发*/
  useEffect(() => {
    setStyleList(getStyleList())
  }, [unitWidth, rowsNum, list])

  /** 初始化请求数据*/
  useEffect(() => {
    isLoadingData.current = true;
    let data: any = []
    //为了出现骨架屏
    for (let i = 0; i < 50; i++) {
      let item;
      item = {
        src: "",
        title: ""
      }
      data.push(item);
    }
    setList(data)

    data = [];

    for (let i = 0; i < 50; i++) {
      let item = {
        src: `https://picsum.photos/200/${100 * Math.ceil(Math.random() * 3)}?p=${i}`,
        title: `第${i}个Item`
      }
      data.push(item);
    }

    //模拟请求
    setTimeout(() => {
      setList(data)
      isLoadingData.current = false;
    }, 1200)
  }, [])

  const onResize = useCallback(() => {
    if (waterfallFlowDom.current === null) {
      return
    }
    setFrameInfoInfo({
      width: (waterfallFlowDom.current as HTMLDivElement).getBoundingClientRect().width
    })
  }, [])

  /** 监听列表容器大小变化*/
  useEffect(() => {
    if (waterfallFlowDom.current === null) {
      return
    }
    const resizeObserver = new ResizeObserver(entries => {
      onResize()
    });
    resizeObserver.observe(waterfallFlowDom.current);
    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  const onScroll = useCallback(() => {
    //记录滚动值
    setScrollTop((scrollParent.current as any).scrollTop)

    let top = (scrollParent.current as any).scrollTop
    let clientHeight = (scrollParent.current as any).clientHeight
    let scrollHeight = (scrollParent.current as any).scrollHeight

    //做底部加载
    if (scrollHeight - clientHeight / 3 <= top + clientHeight && isLoadingData.current === false) {
      isLoadingData.current = true;
      let data: any = []

      for (let i = 0; i < 50; i++) {
        let item = {
          src: `https://picsum.photos/200/${100 * Math.ceil(Math.random() * 3)}?p=${i}`,
          title: `第${i}个Item`
        }
        data.push(item);
      }
      //请求数据并加载
      setTimeout(() => {
        isLoadingData.current = false
        setList((lastData) => {
          return [...lastData, ...data]
        })
      }, 1200)
    }
  }, [])

  /** 监听滚动*/
  useEffect(() => {
    (scrollParent.current as any).addEventListener('scroll', onScroll);
    return () => {
      (scrollParent.current as any).removeEventListener('scroll', onScroll);
    }
  }, [])

  return (
    <div className='waterfallFlow' ref={scrollParent}>
      <section ref={waterfallFlowDom} className='waterfallFlow__content'>
        {
          list.map((item, ind) => {
            return (
              <div key={ind}>
                <WaterfallFlowItem
                  showBorder={scrollTop + (scrollParent.current as any).clientHeight}
                  src={item.src}
                  title={item.title}
                  style={styleList[ind]}
                  sizeChange={onSizeChange}
                  unitWidth={unitWidth}
                  index={ind}
                />
              </div>
            )
          })
        }
      </section>
    </div>
  )
}
