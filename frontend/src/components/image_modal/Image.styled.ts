import styled from 'styled-components'
import { TransitionGroup } from 'react-transition-group'

const CHEVRON_WIDTH = 64
const SIZES_HEIGHT = 36

export const StyledTransitionGroup = styled(TransitionGroup)`
  position: relative;
`

export const StyledImage = styled.a<{ loading?: boolean; errored?: boolean }>`
  display: flex;
  height: auto;
  position: relative;
  width: auto;
  &:hover {
    & > .overlay {
      opacity: 1;
    }
    & > .error {
      opacity: 0.7;
    }
  }
  &.transition-enter,
  &.transition-exit {
    &[class$='active'] {
      transition: all ${({ theme }) => theme.transitions.duration.standard}ms;
    }
  }
  &.transition-enter {
    opacity: 0;
    transform: scale(0.8);
    &.transition-enter-active {
      opacity: 1;
      transform: none;
    }
  }
  &.transition-exit {
    left: 50%;
    position: fixed;
    top: 50%;
    transform: translate(-50%, -50%);
    transform-origin: center;
    &.transition-exit-active {
      opacity: 0;
      transform: translate(-50%, -50%) scale(1.2);
    }
  }
  & > img {
    max-height: calc(
      100vh - ${SIZES_HEIGHT * 2}px - ${({ theme }) => theme.spacing(8)}
    );
    max-width: calc(
      100vw - ${CHEVRON_WIDTH * 2}px - ${({ theme }) => theme.spacing(8)}
    );
    &.loading,
    &.errored {
      display: none;
    }
  }
  & > .overlay {
    align-items: center;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    height: 100%;
    justify-content: center;
    left: 0;
    opacity: 0;
    pointer-events: none;
    position: absolute;
    top: 0;
    transition: opacity ${({ theme }) => theme.transitions.duration.standard}ms;
    width: 100%;
  }
  & > .error {
    font-size: 10rem;
    transition: opacity ${({ theme }) => theme.transitions.duration.standard}ms;
  }
`
