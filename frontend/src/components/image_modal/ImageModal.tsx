import { useContext } from 'react'
import { createPortal } from 'react-dom'
import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import CloseIcon from '@mui/icons-material/Close'
import { ThemeContext } from 'styled-components'
import { getImagesList, isFetchingImages } from 'selectors'
import useQuery from 'hooks/useQuery'
import { StoreState } from 'types'
import {
  StyledImageModal,
  StyledIconButton,
  StyledFloatingIconButton,
  StyledCircularProgress
} from './ImageModal.styled'
import Image from './Image'
import ImageSizes from './ImageSizes'
import ImagesPreloader from './ImagesPreloader'
import ImagesFetcher from './ImagesFetcher'

export default function ImageModal() {
  const history = useHistory()
  const params: { id: string } = useParams()
  const id = parseInt(params.id, 10)
  const query = useQuery()
  const theme = useContext(ThemeContext)

  const { imagesList, isFetching } = useSelector((s: StoreState) => {
    const imagesList = getImagesList(s)

    return {
      imagesList,
      isFetching: isFetchingImages(s) && Boolean(Object.keys(imagesList).length)
    }
  })

  const hasPrev = Boolean(imagesList[id - 1])
  const hasNext = Boolean(imagesList[id + 1])

  const onCloseClick = () => history.push('/images')

  const onPrevClick = () =>
    hasPrev &&
    history.push({ pathname: `/images/${id - 1}`, search: query.toString() })

  const onNextClick = () =>
    hasNext &&
    history.push({ pathname: `/images/${id + 1}`, search: query.toString() })

  return createPortal(
    <CSSTransition
      in
      appear
      classNames="transition"
      timeout={theme.transitions.duration.standard}
    >
      <StyledImageModal>
        <div className="carousel">
          <Image />
          <StyledIconButton
            aria-label="next"
            color="secondary"
            disabled={!hasNext}
            onClick={onNextClick}
          >
            <ChevronLeftIcon />
            {!hasNext && isFetching && (
              <StyledCircularProgress color="inherit" size={40} thickness={4} />
            )}
          </StyledIconButton>
          <StyledIconButton
            aria-label="previous"
            color="secondary"
            disabled={!hasPrev}
            onClick={onPrevClick}
          >
            <ChevronRightIcon />
            {!hasPrev && isFetching && (
              <StyledCircularProgress color="inherit" size={40} thickness={4} />
            )}
          </StyledIconButton>
        </div>
        <StyledFloatingIconButton
          aria-label="close"
          color="secondary"
          size="large"
          onClick={onCloseClick}
        >
          <CloseIcon />
        </StyledFloatingIconButton>
        <ImageSizes />
        <ImagesPreloader />
        <ImagesFetcher />
      </StyledImageModal>
    </CSSTransition>,
    document.getElementById('modal-portal') as HTMLElement
  )
}
