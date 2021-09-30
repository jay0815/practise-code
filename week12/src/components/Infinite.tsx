import { watch, ref, defineComponent, onUnmounted, toRefs, PropType, computed, onBeforeMount, reactive, VNode, Ref } from "vue";
// const THRESHOLD = 15;

interface Item { text: string | number; [key: string]: any };

const InfiniteList = defineComponent({
  props: {
    list: {
      type: Array as PropType<Item[]>,
      required: true
    },
    height: {
      type: Number,
      required: true
    }
  },
  slots: ['default'],
  setup(props, { slots }) {
    const begin = ref(0);
    const end = ref(0);
    const visibleHeight = ref(0);
    const cssProperties = reactive({
      padding: [80,0,80,0],
      margin: [0,0,0,30],
      border: 0,
      font: 14
    })
    const observer = ref<null | IntersectionObserver>(null);
    const top =ref();
    const bottom = ref();
    const step = ref(0);
    const { list, height } = toRefs(props);
    const n = list.value.length;

    const defaultRender = ({ key, ref, id, value, style }: { id: "top" | "bottom" | "", ref?: Ref<any> } & Item) => 
      <li style={{ fontSize: 14, marginBottom: 10, paddingTop: 10, ...style }} key={key} ref={ref} id={id}>{value}</li>
    const render = ref(slots.default || defaultRender);

    const callback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target.id === "bottom") {
          const maxBegin = n - 1 - step.value;
          const maxEnd = n - 1;
          const nextEnd = (end.value + Math.floor(step.value * 0.8)) <= maxEnd ? end.value + Math.floor(step.value * 0.8) : maxEnd;
          const nextBegin = (end.value - Math.ceil(step.value * 0.2)) <= maxBegin ? (end.value - Math.ceil(step.value * 0.2)) : maxBegin;
          begin.value = nextBegin;
          end.value = nextEnd;
        } 
        if (entry.isIntersecting && entry.target.id === "top") {
          // 向上滚动
          const nextEnd = end.value === step.value ? step.value : (end.value - step.value > step.value ? end.value - step.value : step.value); 
          const nextBegin = begin.value === 0 ? 0 : (begin.value - step.value > 0 ? begin.value - step.value : 0); // 获取存在 20% buffer 的 起点
          begin.value = nextBegin;
          end.value = nextEnd;
        }
      });
    }

    const intiateScrollObserver = () => {
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      };
      const Observer = new IntersectionObserver(callback, options)
      if (top.value) {
        Observer.observe(top.value);
      }
      if (bottom.value) {
        Observer.observe(bottom.value);
      }
      observer.value = Observer;
    }

    watch([top, bottom], () => {
      intiateScrollObserver();
    })

    watch([begin, end], ([s,e]) => {
      console.log(s,e)    
    })

    const itemHeight = computed(() => {
      const height = eval(cssProperties.margin.join('+')) 
        + eval(cssProperties.padding.join('+')) 
        + cssProperties.border 
        + cssProperties.font;
        return height;
    })

    const getDownRange = (start: number) => {
      let count = 0;
      let i = start;
      for(; i < list.value.length; i++) {
        count += itemHeight.value;
        if (count >= visibleHeight.value) {
          break;
        }
      }
      return i;
    }

    const getUpRange = (stop: number) => {
      let count = 0;
      let i = stop;
      for(; i > 0; i--) {
        count += itemHeight.value;
        if (count >= visibleHeight.value) {
          break;
        }
      }
      return stop - i;
    }

    const resetObservation = () => {
      observer.value && observer.value.unobserve(bottom.value);
      observer.value && observer.value.unobserve(top.value);
    }

    onBeforeMount(() => {
      visibleHeight.value = document.documentElement.clientHeight || document.body.clientHeight;
      // document.addEventListener('reszie', () => {
      //   visibleHeight.value = document.documentElement.clientHeight || document.body.clientHeight;
      // });
      // 如果有 slot 元素，则更新 css 计算属性
      end.value = getDownRange(0);
      step.value = end.value;
      
    })

    onUnmounted(() => {
      resetObservation();
    })

    const getReference = (isLastIndex: boolean) => {
      if (isLastIndex) {
        return bottom;
      }
      return top;
    }

    const renderList = computed(() => list.value.slice(begin.value, end.value))
    const lastIndex = computed(() => renderList.value.length - 1)
    
    return () => (
      <ul style={{position: 'relative'}}>
        {renderList.value.map((item, index) => {
          const id = index === 0 ? 'top' : (index === lastIndex.value ? 'bottom' : '');
          if (index === 0 || index === lastIndex.value) {
            const ref = getReference(index === lastIndex.value);
            return render.value({ ...item, id, ref, style: `top: ${(index + begin.value) * height.value}px` })
          } else {
            const v = render.value({ ...item, id, style: `top: ${(index + begin.value) * height.value}px` })
            return v;
          }
        })}
      </ul>
    );
  }
});
export default InfiniteList;