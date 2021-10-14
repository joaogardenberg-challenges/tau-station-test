import { useHistory, useLocation } from 'react-router-dom'
import ButtonGroup from '@mui/material/ButtonGroup'
import Button from '@mui/material/Button'
import styled from 'styled-components'
import useQuery from 'hooks/useQuery'

const StyledImageSizes = styled.div`
  align-items: center;
  bottom: 0;
  display: flex;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  position: absolute;
  & > :not(:last-child) {
    margin-right: ${({ theme }) => theme.spacing(1)};
  }
`

export const WIDTHS = [48, 400, 800, 1280]
export const DEFAULT_WIDTH = 400

export default function ImageSizes() {
  const history = useHistory()
  const { pathname } = useLocation()
  const query = useQuery()
  const queryWidth: number = parseInt(query.get('width') || '', 10)
  const width = queryWidth || DEFAULT_WIDTH

  if (!WIDTHS.includes(queryWidth)) {
    setTimeout(() => {
      query.set('width', DEFAULT_WIDTH.toString())
      history.replace({ pathname, search: query.toString() })
    }, 0)

    return null
  }

  const renderButton = (newWidth: number) => (
    <Button
      key={newWidth}
      variant={width === newWidth ? 'contained' : undefined}
      onClick={() => {
        query.set('width', newWidth.toString())
        history.replace({ pathname, search: query.toString() })
      }}
    >
      {newWidth}px
    </Button>
  )

  return (
    <StyledImageSizes>
      <ButtonGroup variant="outlined" color="secondary">
        {WIDTHS.map(renderButton)}
      </ButtonGroup>
    </StyledImageSizes>
  )
}
