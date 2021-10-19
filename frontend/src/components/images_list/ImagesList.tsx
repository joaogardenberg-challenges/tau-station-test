import { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import range from 'lodash/range'
import isEmpty from 'lodash/isEmpty'
import useMediaQuery from '@mui/material/useMediaQuery'
import CircularProgress from '@mui/material/CircularProgress'
import { ThemeContext } from 'styled-components'
import { fetchImages, watchImages } from 'actions'
import { StoreState } from 'types'
import { getSortedImageIds, isFetchingImages } from 'selectors'
import StyledImagesList from './ImagesList.styled'
import ImageFiller from './ImageFiller'
import ImageCard from './ImageCard'
import ImagesFetcher from './ImagesFetcher'

const PER_COLUMN = 3

export default function ImagesList() {
  const dispatch = useDispatch()
  const theme = useContext(ThemeContext)
  const xl = useMediaQuery(theme.breakpoints.up('xl'))
  const lg = useMediaQuery(theme.breakpoints.up('lg'))
  const md = useMediaQuery(theme.breakpoints.up('md'))
  const sm = useMediaQuery(theme.breakpoints.up('sm'))

  const perRow = xl ? 5 : lg ? 4 : md ? 3 : sm ? 2 : 1

  const { imageIds, isFetching } = useSelector((s: StoreState) => ({
    imageIds: getSortedImageIds(s),
    isFetching: isFetchingImages(s)
  }))

  const [missingEnd, setMissingEnd] = useState<number>(0)
  const missingStart =
    ((perRow - (imageIds.length % perRow)) % perRow) - missingEnd

  useEffect(() => {
    dispatch(fetchImages({ limit: perRow * 10 }))
    dispatch(watchImages())
  }, [])

  const renderFiller = (i: number) => (
    <ImageFiller key={i} perRow={perRow} perColumn={PER_COLUMN} />
  )

  const renderImage = (id: number) =>
    id && (
      <ImageCard key={id} imageId={id} perRow={perRow} perColumn={PER_COLUMN} />
    )

  return (
    <StyledImagesList>
      {isEmpty(imageIds) && isFetching ? (
        <div className="loading">
          <CircularProgress color="primary" size={45} thickness={5} />
        </div>
      ) : (
        <>
          <ul className="images-list">
            {range(missingStart).map(renderFiller)}
            {imageIds.map(renderImage)}
          </ul>
          <ImagesFetcher perRow={perRow} setMissingEnd={setMissingEnd} />
        </>
      )}
    </StyledImagesList>
  )
}
