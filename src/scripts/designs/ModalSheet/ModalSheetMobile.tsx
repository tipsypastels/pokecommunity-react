/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { MobileOnlyView, BrowserView } from "react-device-detect";
import SideBySide from "../layout/SideBySide";
import Icon from "../../partials/Icon";
import { ModalSheetProps } from "../ModalSheet";
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

export default function ModalSheetMobile(props: ModalSheetProps) {
  const containerRef = useRef();

  const hideOnClickContainer = e => {
    if (e.target === containerRef.current) {
      props.onHide();
    }
  }

  const hideOnEscape = e => {
    if (e.key === 'Escape') {
      props.onHide();
    }
  };

  useEffect(() => {
    if (props.show) {
      window.addEventListener('keydown', hideOnEscape);

      return () => {
        window.removeEventListener('keydown', hideOnEscape);
      }
    }
  }, [props.show, hideOnEscape]);

  useEffect(() => {
    if (props.show) {
      disableBodyScroll(containerRef.current);
    } else {
      enableBodyScroll(containerRef.current);
    }
  }, [props.show]);

  function onDragEnd(_, { velocity, point }) {
    const shouldHide =
      velocity > 20
      || (velocity.y >= 0 && point.y > 45);

    if (shouldHide) {
      props.onHide();
    }
  }

  return (
    <div
      onClick={hideOnClickContainer}
      ref={containerRef}
      css={css`
        position: fixed;
        width: 100vw;
        height: 100vh;
        bottom: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: flex-end;
        transition: 0.25s ease-in-out;
        will-change: opacity;

        justify-content: center;
        z-index: 1040;

        ${props.show
          ? 'opacity: 1; pointer-events: unset;'
          : 'opacity: 0; pointer-events: none;'
        }
      `}
    >
      <motion.div
        drag="y"
        onDragEnd={onDragEnd}
        initial="hidden"
        animate={props.show ? 'visible' : 'hidden'}
        transition={{
          type: 'spring',
          damping: 40,
          stiffness: 400,
        }}
        variants={{
          visible: { y: 0 },
          hidden: { y: '100%' },
        }}
        dragConstraints={{ top: 0 }}
        dragElastic={0.2}
        css={css`
          width: 100%;
        `}
      >
        <div css={css`
          padding: 0.75rem;
          font-weight: bold;
          color: var(--dark);
          font-size: 1.5rem;
          border-top-left-radius: 6px;
          border-top-right-radius: 6px;
          background-color: white;
          border-bottom: 1px solid #eee;
        `}>
          <MobileOnlyView>
            <div css={css`
              display: block;
              margin: auto;
              width: 100px;
              height: 5px;
              background-color: #ddd;
              border-radius: 6px;
              margin-bottom: 0.25rem;
              cursor: pointer;
            `} />
          </MobileOnlyView>

          <SideBySide>
            <SideBySide.Grow>
              {props.title}
            </SideBySide.Grow>

            <BrowserView>
              <button 
                onClick={props.onHide} 
                type="button" 
                className="close"
              >
                <span aria-hidden="true">×</span>
                <span className="sr-only">Close</span>
              </button>
            </BrowserView>
          </SideBySide>
        </div>

        <div css={css`
          padding: 1rem;
          background-color: white;
          padding-bottom: 2rem;
        `}>
          {props.children}
        </div>
      </motion.div>
    </div>
  );
}