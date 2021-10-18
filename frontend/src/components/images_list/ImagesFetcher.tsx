import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import styled from 'styled-components'
import useOnScreen from 'hooks/useOnScreen'
import { fetchImages } from 'actions'
import { getLastSortedImageId } from 'selectors'

const StyledImagesFetcher = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing(8)} 0;
  width: 100%;
`

interface ImagesFetcherProps {
  perRow: number
  setMissingEnd: (n: number) => void
}

export default function ImagesFetcher({
  perRow,
  setMissingEnd
}: ImagesFetcherProps) {
  const dispatch = useDispatch()
  const ref = useRef()
  const isVisible = useOnScreen(ref)
  const lastImageId = useSelector(getLastSortedImageId)
  const limit = perRow * 10

  const fetch = () => {
    const onSuccess = (images = []) => {
      if (images.length !== limit) {
        setMissingEnd((perRow - (images.length % perRow)) % perRow)
      }
    }

    dispatch(fetchImages({ fromId: lastImageId - 1, limit }, onSuccess))
  }

  useEffect(() => {
    isVisible && fetch()
  }, [isVisible])

  if (lastImageId === 1) {
    return null
  }

  return (
    <StyledImagesFetcher ref={ref as any}>
      {isVisible ? (
        <CircularProgress color="primary" size={45} thickness={5} />
      ) : (
        <Button variant="outlined" onClick={fetch}>
          Load more
        </Button>
      )}
    </StyledImagesFetcher>
  )
}
