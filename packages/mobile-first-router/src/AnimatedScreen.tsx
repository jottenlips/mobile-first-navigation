import * as React from 'react';

import { useSpring, animated } from 'react-spring';
import { ComponentContainer } from '@aloompa/mobile-first-components';

export const AnimatedScreen = (props: {
  Component: any;
  route: any;
  routes: Array<any>;
  history: any;
  isNavigatingBack: boolean;
  navigateBackComplete: Function;
  isNavigating: boolean;
  getTitleFromCache: Function;
  width: number;
  height: number;
  modal: boolean;
  routeConfig: any;
  renderTopNav: Function;
  topNavHeight: number;
}) => {
  const Component = props.Component;
  const [spring] = determineAnimationForScreenType({ ...props });
  console.log(props.topNavHeight);
  return (
    <animated.div
      key={props.route}
      style={{
        height: '100%',
        ...spring,
        position: 'absolute',
        width: '100%'
      }}
    >
      <ComponentContainer
        style={{
          backgroundColor: '#FFFFFF',
          height: '100%'
        }}
      >
        {props.modal &&
          props.renderTopNav({
            ...props,
            mode: 'modal',
            height: props.topNavHeight,
            routeTitle: props.getTitleFromCache(props, props.route)
          })}
        {Component ? <Component {...props} route={props.route} /> : null}
      </ComponentContainer>
    </animated.div>
  );
};

const determineAnimationForScreenType = (props: {
  isNavigating: boolean;
  modal: boolean;
  width: number;
  height: number;
}) => {
  if (props.isNavigating && !props.modal) {
    return useSpring(() => ({
      to: async (next, _cancel) => {
        await next({ right: 0, config: { duration: 140 } });
      },
      from: { right: -props.width }
    }));
  } else {
    return useSpring(() => ({
      right: 0,
      bottom: 0,
      config: { duration: 140 }
    }));
  }
};
