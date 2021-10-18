import { useRef, useContext, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported'
import classNames from 'classnames'
import { ThemeContext } from 'styled-components'
import { getImage } from 'selectors'
import { StoreState } from 'types'
import { WIDTHS } from 'config/constants'
import useOnScreen from 'hooks/useOnScreen'
import StyledImageCard from './ImageCard.styled'

interface ImageCardProps {
  imageId: number
  perRow: number
  perColumn: number
}

export default function ImageCard({
  imageId,
  perRow,
  perColumn
}: ImageCardProps) {
  const theme = useContext(ThemeContext)
  const image = useSelector((s: StoreState) => getImage(s, imageId))
  const ref = useRef()
  const isVisible = useOnScreen(ref)
  const [loading, setLoading] = useState<boolean>(true)
  const [errored, setErrored] = useState<boolean>(false)
  const { urls, meta } = image
  const src = urls?.[400]

  const renderLink = (width: number) => (
    <Button
      key={width}
      color="secondary"
      component={Link}
      to={`/images/${imageId}?width=${width}`}
    >
      {width}px
    </Button>
  )

  return (
    <CSSTransition
      in={isVisible}
      appear
      classNames="transition"
      timeout={theme.transitions.duration.standard}
    >
      <StyledImageCard
        perRow={perRow}
        perColumn={perColumn}
        ref={ref as any}
        isVisible={isVisible}
      >
        {isVisible && (
          <div className="content">
            <img
              className={classNames({ loading, errored })}
              src={src}
              alt={meta?.keywords}
              onLoad={() => setLoading(false)}
              onError={() => setErrored(true)}
            />
            {errored ? (
              <ImageNotSupportedIcon className="error" color="primary" />
            ) : (
              loading && (
                <CircularProgress color="primary" size={35} thickness={4} />
              )
            )}
            <div className="overlay">{WIDTHS.map(renderLink)}</div>
          </div>
        )}
      </StyledImageCard>
    </CSSTransition>
  )
}
