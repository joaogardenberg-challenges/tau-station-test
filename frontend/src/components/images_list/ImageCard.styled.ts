import styled from 'styled-components'

interface StyledImageCardProps {
  perRow: number
  perColumn: number
  isVisible: boolean
}

export default styled.li<StyledImageCardProps>`
  height: calc(
    (100vh - ${({ theme, perColumn }) => theme.spacing(perColumn * 2 + 2)}) /
      ${({ perColumn }) => perColumn}
  );
  list-style: none;
  margin: ${({ theme }) => theme.spacing(1)};
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
  width: calc(
    (100vw - ${({ theme, perRow }) => theme.spacing(perRow * 2 + 2)}) /
      ${({ perRow }) => perRow}
  );
  &.transition-appear,
  &.transition-enter {
    & > .content {
      opacity: 0;
      transform: scale(0);
    }
    &[class$='active'] {
      & > .content {
        opacity: 1;
        transform: none;
        transition: all ${({ theme }) => theme.transitions.duration.standard}ms;
      }
    }
  }
  & > .content {
    align-items: center;
    background-color: #eee;
    border-radius: ${({ theme }) => theme.shape.borderRadius}px;
    display: flex;
    height: 100%;
    justify-content: center;
    overflow: hidden;
    position: relative;
    width: 100%;
    &:hover > .overlay {
      opacity: 1;
    }
    & > img {
      max-height: 100%;
      max-width: 100%;
      &.loading,
      &.errored {
        display: none;
      }
    }
    & > .overlay {
      background-color: rgba(0, 0, 0, 0.4);
      display: flex;
      flex-flow: row wrap;
      height: 100%;
      left: 0;
      opacity: 0;
      position: absolute;
      top: 0;
      transition: opacity
        ${({ theme }) => theme.transitions.duration.standard}ms;
      width: 100%;
      & > .MuiButton-root {
        border-radius: 0;
        flex: 50%;
        text-shadow: 1px 1px #666;
        &:hover {
          background-color: rgba(255, 255, 255, 0.2);
        }
      }
    }
    & > .error {
      font-size: 5rem;
    }
  }
`
