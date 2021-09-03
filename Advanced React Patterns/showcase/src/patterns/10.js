import React, {
    Component,
    useCallback,
    useEffect,
    useLayoutEffect,
    useState,
    useRef,
    useReducer
  } from "react";
  import mojs from "mo-js";
  import styles from "./index.css";
  import userStyles from "./usage.css";
  
  const INITIAL_STATE = {
    count: 0,
    countTotal: 267,
    isClicked: false,
  };
  
  //Custom hook for animation
  
  const useClapAnimation = ({ clapEl, countEl, clapTotalEl }) => {
    const [animationTimeline, setAnimationTimeline] = useState(
      () => new mojs.Timeline()
    );
    useLayoutEffect(() => {
      if (!clapEl || !countEl || !clapTotalEl) {
        return;
      }
      const tlDuration = 300;
      const scaleButton = new mojs.Html({
        el: clapEl,
        duration: tlDuration,
        scale: { 1.3: 1 },
        easing: mojs.easing.ease.out,
      });
  
      const triangleBurst = new mojs.Burst({
        parent: clapEl,
        radius: { 50: 95 },
        count: 5,
        angle: 30,
        children: {
          shape: "polygon",
          radius: { 6: 0 },
          stroke: "rgba(211,54,0,0.5)",
          strokeWidth: 2,
          angle: 210,
          speed: 0.2,
          delay: 30,
          duration: tlDuration,
          easing: mojs.easing.bezier(0, 1, 1, 0.3, 1),
        },
      });
  
      const circleBurst = new mojs.Burst({
        parent: clapEl,
        radius: { 50: 75 },
  
        angle: 25,
        duration: tlDuration,
        children: {
          shape: "circle",
          fill: "rgba(149,165,166, 0.5)",
          delay: 30,
          speed: 0.2,
          radius: { 3: 0 },
          easing: mojs.easing.bezier(0, 1, 1, 0.3, 1),
        },
      });
  
      const countAnimation = new mojs.Html({
        el: countEl,
        opacity: { 0: 1 },
        duration: tlDuration,
        y: { 0: -30 },
      }).then({
        opacity: { 1: 0 },
        delay: tlDuration / 2,
        y: -80,
      });
  
      const countTotalAnimation = new mojs.Html({
        el: clapTotalEl,
        opacity: { 0: 1 },
        delay: (3 * tlDuration) / 2,
        duration: tlDuration,
        y: { 0: -3 },
      });
  
      if (typeof clapEl === "string") {
        const clap = document.getElementById("clap");
        clap.style.transform = "scale(1,1)";
      } else {
        clapEl.style.transform = "scale(1,1)";
      }
  
      const newAnimationTimeline = animationTimeline.add([
        scaleButton,
        countTotalAnimation,
        countAnimation,
        triangleBurst,
        circleBurst,
      ]);
      setAnimationTimeline(newAnimationTimeline);
    }, [clapEl, clapTotalEl, countEl]);
  
    return animationTimeline;
  };
  
  //useDomRef Hook
  const useDomRef = () => {
    const [DOMRef, setRefState] = useState({});
  
    const setRef = useCallback((node) => {
      setRefState((prevRefState) => ({
        ...prevRefState,
        [node.dataset.refkey]: node,
      }));
    }, []);
    return [DOMRef, setRef];
  };
  
  
  const usePrevious = (value) => {
      const ref = useRef();
      useEffect(() => {
        ref.current = value;
      });
      return ref.current;
    }
  
  const callfnsInSequence =
    (...fns) =>
    (...args) => {
      fns.forEach((fn) => fn && fn(...args));
    };

    const MAXIMUM_USER_CLAP = 50;
  const internalReducer = ({count, countTotal}, {type, payload}) => {
    switch (type){
        case 'clap' :
            return {
                isClicked: true,
                count: Math.min(count + 1, 10),
                countTotal: count < 10 ? countTotal + 1 : countTotal,
              }
        case 'reset':
            console.log('reset')
            return payload
        default:
            break
    }
}

  const useClapState = (
      initialState = INITIAL_STATE, 
      reducer = internalReducer) => {
    
    const userInitialState = useRef(initialState);
    
    const [clapState, dispatch] = useReducer(reducer, initialState);
    const { count, countTotal } = clapState;
  
    const updateClapState = () => dispatch({type: 'clap'});

  
    const resetRef = useRef(0)
    const prevCount = usePrevious(count)
  
    const reset = useCallback(() => {
      if (prevCount !== count) {
         dispatch({type: 'reset', payload: userInitialState.current});
         resetRef.current++
      }
    }, [prevCount, count, dispatch]);
  
    const getTogglerProps = ({ onClick, ...otherProps } = {}) => ({
      onClick: callfnsInSequence(updateClapState, onClick),
      "aria-pressed": clapState.isClicked,
      ...otherProps,
    });
  
    const getCounterProps = ({ ...otherProps }) => ({
      count,
      "aria-valuemax": MAXIMUM_USER_CLAP,
      "aria-valuemin": 0,
      "aria-valuenow": count,
      ...otherProps,
    });
  
    return {
      clapState,
      updateClapState,
      getTogglerProps,
      getCounterProps,
      reset,
      resetDep: resetRef.current
    };
  };
  
useClapState.reducer = internalReducer
useClapState.types ={
    clap:'clap',
    reset:'reset'
}

  const useEffectAfterMount = (cb, deps) => {
    const componentJustMounted = useRef(true);
    useEffect(() => {
      if (!componentJustMounted.current) {
        return cb();
      }
      componentJustMounted.current = false;
    }, deps);
  };
  
  //SubComponents
  const ClapContainer = ({ children, setRef, handleClick, ...restProps }) => {
    return (
      <button
        ref={setRef}
        data-refkey="clapRef"
        className={styles.clap}
        onClick={handleClick}
        {...restProps}
      >
        {children}
      </button>
    );
  };
  
  const ClapIcon = ({ isClicked }) => {
    return (
      <span>
        {
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100.08 125"
            className={`${styles.icon} ${isClicked && styles.checked}`}
          >
            <path d="M77.704 12.876a8.1 8.1 0 012.264 4.053c.367-.27.756-.503 1.158-.706.971-1.92.654-4.314-.964-5.891a5.056 5.056 0 00-7.151.091l-.216.222c1.844.174 3.568.927 4.909 2.231zM48.893 26.914c.407.885.687 1.93.791 3.057l16.478-16.928c.63-.648 1.364-1.144 2.145-1.545 1.006-1.93.712-4.367-.925-5.96-2.002-1.948-5.213-1.891-7.155.108L44.722 21.575c2.321 2.261 3.098 3.024 4.171 5.339zM10.041 66.626c-.118-8.864 3.219-17.24 9.396-23.584l18.559-19.064c.727-2.031.497-4.076-.076-5.319-.843-1.817-1.314-2.271-3.55-4.451L13.501 35.645C2.944 46.489 2.253 63.277 11.239 74.94c-.729-2.681-1.161-5.462-1.198-8.314z" />
            <path d="M21.678 45.206l20.869-21.437c2.237 2.18 2.708 2.634 3.55 4.451.837 1.819.994 5.356-1.607 8.05L32.642 48.514a1.194 1.194 0 00.028 1.689 1.195 1.195 0 001.686-.019l34.047-34.976c1.941-1.999 5.153-2.056 7.155-.108 1.998 1.944 2.03 5.159.089 7.155L50.979 47.584c-.452.464-.437 1.224.038 1.688a1.195 1.195 0 001.689-.009l28.483-29.28a5.055 5.055 0 017.15-.09 5.052 5.052 0 01.097 7.144L59.944 56.308a1.194 1.194 0 00.038 1.688 1.193 1.193 0 001.678-.015l24.66-25.336c1.942-1.995 5.15-2.061 7.15-.113 2.003 1.949 2.043 5.175.101 7.17l-24.675 25.32a1.194 1.194 0 00.038 1.688c.47.457 1.231.453 1.682-.014l14.56-14.973a5.067 5.067 0 017.159-.107 5.052 5.052 0 01.09 7.164L64.792 87.17c-11.576 11.892-30.638 12.153-42.54.569-11.903-11.588-12.149-30.644-.574-42.533" />
          </svg>
        }
      </span>
    );
  };
  
  const ClapCount = ({ count, setRef, ...restProps }) => {
    return (
      <span ref={setRef} className={styles.count} {...restProps}>
        + {count}
      </span>
    );
  };
  
  const CountTotal = ({ countTotal, setRef, ...restProps }) => {
    return (
      <span
        ref={setRef}
        data-refkey="clapTotalRef"
        className={styles.total}
        {...restProps}
      >
        {countTotal}
      </span>
    );
  };
  
  const userInitialState = {
    count: 0,
    countTotal: 1000,
    isClicked: false,
  };
  


  const Usage = () => {
      const [timesClapped, setTimeClapped] = useState(0)
      const isClappedTooMuch = timesClapped >= 7

    const reducer = (state, action) => {
        if(action.type === useClapState.types.clap && isClappedTooMuch) {
            return state
        }
        return useClapState.reducer(state, action)
      }


    const { clapState, getTogglerProps, getCounterProps, reset, resetDep } = useClapState(userInitialState, reducer);
    const { count, countTotal, isClicked } = clapState;
    const [{ clapRef, clapCountRef, clapTotalRef }, setRef] = useDomRef();
  
    const animationTimeline = useClapAnimation({
      clapEl: clapRef,
      countEl: clapCountRef,
      clapTotalEl: clapTotalRef,
    });
  
    useEffectAfterMount(() => {
      animationTimeline.replay();
    }, [count]);
  
    const [uploadingReset, setUpload] = useState(false);
    useEffectAfterMount(() => {
      setUpload(true);
      setTimeClapped(0)

      const id = setTimeout(() => {
        setUpload(false);
      }, 3000);
  
      return () => clearTimeout(id);
    }, [resetDep]);
  
    const handleClick = () => {
        setTimeClapped(t => t +1)
    };
  
    return (
      <div>
        <ClapContainer
          setRef={setRef}
          data-refkey="clapRef"
          {...getTogglerProps({
            onClick: handleClick,
            "aria-pressed": false,
          })}
        >
          <ClapIcon isClicked={isClicked} />
          <ClapCount
            count={count}
            setRef={setRef}
            data-refkey="clapCountRef"
            {...getCounterProps()}
          />
          <CountTotal
            countTotal={countTotal}
            setRef={setRef}
            data-refkey="clapTotalRef"
          />
        </ClapContainer>
        <section>
          <button onClick={reset} className={userStyles.resetBtn}>
            reset
          </button>
          <pre className={userStyles.resetMsg}>
            {JSON.stringify({ timesClapped, count, countTotal, isClicked })}
          </pre>
          <pre className={userStyles.resetMsg}>
            {uploadingReset ? `uploading reset ${resetDep} ...` : ""}
          </pre>
          <pre style={{color: 'red'}}>
              {isClappedTooMuch ? `You have clapped to much` : ''}
          </pre>
        </section>
      </div>
    );
  };
  
  export default Usage;
  