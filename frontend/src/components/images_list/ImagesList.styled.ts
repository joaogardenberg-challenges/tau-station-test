import styled from 'styled-components'

export default styled.div`
  & > .images-list {
    align-items: center;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    margin: 0;
    padding: ${({ theme }) => theme.spacing(1)};
  }
  & > .loading {
    align-items: center;
    display: flex;
    height: 100vh;
    justify-content: center;
    width: 100vw;
  }
`
