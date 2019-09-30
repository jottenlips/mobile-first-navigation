import * as React from 'react';

import { useSpring, animated } from 'react-spring';
import {
  ComponentContainer,
  View,
  Button,
  Text
} from '@aloompa/mobile-first-components';

const { useEffect } = React;

export const AnimatedScreen = (props: {
  Component: any;
  route: any;
  routes: Array<any>;
  history: any;
  isNavigatingBack: boolean;
  navigateBackComplete: Function;
  isNavigating: boolean;
  width: number;
  routeConfig: any;
}) => {
  console.log(props);

  const Component = props.Component;
  const [spring, setSpring] =
    props.isNavigating && !props.isNavigatingBack
      ? useSpring(() => ({
          to: async (next, _cancel) => {
            await next({ right: 0, config: { duration: 140 } });
          },
          from: { right: -props.width }
        }))
      : useSpring(() => ({ right: 0, config: { duration: 140 } }));

  useEffect(() => {
    animateBackwardsNavigate({ ...props, spring, setSpring });
  }, [props.isNavigatingBack]);

  return (
    <View>
      <animated.div
        style={{
          ...spring,
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: '100%'
        }}
      >
        <ComponentContainer
          style={{
            backgroundColor: '#FFFFFF',
            height: '100%',
            bottom: 0
          }}
        >
          {Component ? <Component {...props} route={props.route} /> : null}
        </ComponentContainer>
      </animated.div>
      <animated.div
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: '100%',
          zIndex: -100
        }}
      >
        <ComponentContainer
          style={{
            backgroundColor: '#FFFFFF',
            height: '100%',
            bottom: 0
          }}
        >
          {Component ? (
            <Button>
              <Text>'HEY</Text>
            </Button>
          ) : null}
        </ComponentContainer>
      </animated.div>
    </View>
  );
};

const animateBackwardsNavigate = (props: {
  spring: any;
  isNavigatingBack: boolean;
  isNavigating: boolean;
  setSpring: Function;
  history: any;
  routes: any;
  navigateBackComplete: Function;
  width: number;
}) => {
  if (props.isNavigatingBack) {
    // props.setSpring(() => ({
    //   to: async (next, _cancel) => {
    //     await next({ right: -414, config: { duration: 200 } });
    //     await next({ right: 0, config: { duration: 0 } });
    //   }
    // }));
  }
};

// const animateBackwardsNavigate = (props: {
//   spring: any;
//   isNavigatingBack: boolean;
//   isNavigating: boolean;
//   setSpring: Function;
//   history: any;
//   routes: any;
//   navigateBackComplete: Function;
// }) => {
//   if (props.history.length > 1 && props.isNavigatingBack) {
//     console.log(props);
//     props.setSpring(() => ({
//       to: async (next, _cancel) => {
//         await next({ right: 0, config: { duration: 0 } });
//         await next({ right: -414, config: { duration: 200 } });
//         await next({ right: 0, config: { duration: 0 } });
//       }
//     }));
//   }
// };
