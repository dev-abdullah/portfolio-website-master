import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';
import { ReactNebula } from '@flodlc/nebula';
import { TypeAnimation } from 'react-type-animation';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 620px;
  height: 620px;
  padding: 0;

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 5px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }

  .react-nebula {
    z-index: -1;
    /* margin-left: -110px; */
    margin-top: -100px;

    @media (max-width: 480px) {
      margin-left: -25px;
    }

    /* Small devices (portrait tablets and large phones, 600px and up) */
    @media only screen and (min-width: 600px) {
      margin-left: -50px;
    }

    /* Medium devices (landscape tablets, 768px and up) */
    @media only screen and (min-width: 768px) {
      /* margin-left: 100px; */
      margin-left: -30px;
    }

    /* Large devices (laptops/desktops, 992px and up) */
    /* @media only screen and (min-width: 992px) {
      margin-left: -30px;
    } */

    @media only screen and (min-width: 1200px) {
      margin-left: -160px;
    }

    /* Extra large devices (large laptops and desktops, 1200px and up) */
    @media only screen and (min-width: 1800px) {
      /* margin-left: 100px; */
      margin-left: -350px;
    }
  }

  .transitionGroup {
    padding-top: 200px;
    z-index: 1000;
    /* width: 100vh; */
    height: 50vh;
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <h1>Hi, my name is</h1>;
  const two = <h2 className="big-heading">Nichole.</h2>;
  const three = (
    <h3 className="big-heading">
      Proin a vehicula{' '}
      <span>
        <TypeAnimation
          sequence={[
            'Lorem', // Types 'One'
            3000, // Waits 1s
            'Ipsum', // Deletes 'One' and types 'Two'
            3000, // Waits 2s
            'Quis', // Types 'Three' without deleting 'Two'
          ]}
          wrapper="span"
          cursor={true}
          repeat={Infinity}
          style={{ fontSize: '1em' }}
        />
      </span>
    </h3>
  );
  const four = (
    <>
      <p>
        Sed iaculis tempus turpis eget mattis. Fusce vulputate eu turpis eu sodales. Donec dapibus
        velit magna, ac gravida metus interdum quis. Proin a vehicula risus, at tincidunt tortor.
        Donec non aliquet lacus.
        {/* <a href="https://upstatement.com/" target="_blank" rel="noreferrer">
          Upstatement
        </a> */}
        .
      </p>
    </>
  );
  // const five = (
  //   <a
  //     className="email-link"
  //     href="https://www.newline.co/courses/build-a-spotify-connected-app"
  //     target="_blank"
  //     rel="noreferrer">
  //     Check out my course!
  //   </a>
  // );

  const items = [one, two, three, four];

  return (
    <StyledHeroSection>
      <div className="react-nebula">
        {/* <CSSTransition classNames="fadeup" timeout={loaderDelay}> */}
        <ReactNebula />
        {/* </CSSTransition> */}
      </div>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          <div className="transitionGroup">
            {isMounted &&
              items.map((item, i) => (
                <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                  <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
                </CSSTransition>
              ))}
          </div>
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
