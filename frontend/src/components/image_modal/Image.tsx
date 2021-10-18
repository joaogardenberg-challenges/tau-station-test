import { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported'
import classNames from 'classnames'
import { ThemeContext } from 'styled-components'
import { getImage } from 'selectors'
import { selectImage } from 'actions'
import useQuery from 'hooks/useQuery'
import { StoreState } from 'types'
import { StyledTransitionGroup, StyledImage } from './Image.styled'

export default function Image() {
  const dispatch = useDispatch()
  const params: { id: string } = useParams()
  const id = parseInt(params.id, 10)
  const width = parseInt(useQuery().get('width') || '', 10)
  const image = useSelector((s: StoreState) => getImage(s, id))
  const theme = useContext(ThemeContext)
  const [loading, setLoading] = useState<boolean>(true)
  const [errored, setErrored] = useState<boolean>(false)
  const { urls, meta } = image || {}
  const src = urls?.[width]

  useEffect(() => {
    setLoading(true)
    setErrored(false)
  }, [image?.id, src])

  useEffect(() => {
    image?.id && dispatch(selectImage(image.id))
  }, [image?.id])

  if (!image) {
    return null
  }

  return (
    <StyledTransitionGroup>
      <CSSTransition
        key={id}
        timeout={theme.transitions.duration.standard}
        classNames="transition"
      >
        <StyledImage href={src} target="_blank" rel="noopener noreferrer">
          <img
            className={classNames({ loading, errored })}
            src={src}
            alt={meta?.keywords}
            onLoad={() => setLoading(false)}
            onError={() => setErrored(true)}
            data-testid="image"
          />
          {errored ? (
            <ImageNotSupportedIcon className="error" color="secondary" />
          ) : loading ? (
            <CircularProgress color="secondary" size={45} thickness={5} />
          ) : (
            <div className="overlay">
              <Button variant="outlined" color="secondary">
                Open
              </Button>
            </div>
          )}
        </StyledImage>
      </CSSTransition>
    </StyledTransitionGroup>
  )
}
