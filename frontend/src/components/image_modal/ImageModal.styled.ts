import IconButton from '@mui/material/IconButton'
import CircularProgress from '@mui/material/CircularProgress'
import styled from 'styled-components'

export const StyledImageModal = styled.aside`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  height: 100vh;
  justify-content: center;
  left: 0;
  padding: ${({ theme }) => theme.spacing(2)};
  position: fixed;
  top: 0;
  width: 100vw;
  &.transition-appear {
    opacity: 0;
    transform: scale(1.2);
    &.transition-appear-active {
      opacity: 1;
      transform: none;
      transition: all ${({ theme }) => theme.transitions.duration.standard}ms;
    }
  }
  & > .carousel {
    align-items: center;
    display: flex;
    justify-content: space-between;
    width: 100vw;
    & > * {
      order: 1;
    }
    & > button {
      &:first-of-type {
        order: 0;
      }
      &:last-of-type {
        order: 2;
      }
    }
  }
`

export const StyledIconButton = styled(IconButton)`
  &:disabled {
    pointer-events: auto !important;
  }
  & > .MuiSvgIcon-root {
    font-size: 3rem;
    transition: color ${({ theme }) => theme.transitions.duration.standard}ms;
  }
`

export const StyledFloatingIconButton = styled(StyledIconButton)`
  position: absolute !important;
  right: ${({ theme }) => theme.spacing(2)};
  top: ${({ theme }) => theme.spacing(2)};
  & > .MuiSvgIcon-root {
    font-size: 2.1rem;
  }
`

export const StyledCircularProgress = styled(CircularProgress)`
  position: absolute;
`
