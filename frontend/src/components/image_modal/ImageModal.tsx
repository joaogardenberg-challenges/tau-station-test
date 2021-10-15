import { useContext } from 'react'
import { createPortal } from 'react-dom'
import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import CloseIcon from '@mui/icons-material/Close'
import { ThemeContext } from 'styled-components'
import { getImagesList } from 'selectors'
import useQuery from 'hooks/useQuery'
import {
  StyledImageModal,
  StyledIconButton,
  StyledFloatingIconButton
} from './ImageModal.styled'
import Image from './Image'
import ImageSizes from './ImageSizes'
import ImagesPreloader from './ImagesPreloader'
import ImagesFetcher from './ImagesFetcher'

export default function ImageModal() {
  const history = useHistory()
  const params: { id: string } = useParams()
  const query = useQuery()
  const imagesList = useSelector(getImagesList)
  const theme = useContext(ThemeContext)
  const id = parseInt(params.id, 10)
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
          </StyledIconButton>
          <StyledIconButton
            aria-label="previous"
            color="secondary"
            disabled={!hasPrev}
            onClick={onPrevClick}
          >
            <ChevronRightIcon />
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
