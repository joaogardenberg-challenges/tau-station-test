import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import classNames from 'classnames'
import styled from 'styled-components'
import { getImage, getImagesList } from 'selectors'
import useQuery from 'hooks/useQuery'
import { StoreState } from 'types'
import { useEffect } from 'react'

const StyledImage = styled.a`
  display: flex;
  height: auto;
  position: relative;
  width: auto;
  &:hover > .overlay {
    opacity: 1;
  }
  &.loading {
    pointer-events: none;
    & > img {
      display: none;
    }
  }
  & > img {
    max-height: calc(100vh - 72px - ${({ theme }) => theme.spacing(8)});
    max-width: calc(100vw - 128px - ${({ theme }) => theme.spacing(8)});
  }
  & > .overlay {
    align-items: center;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    height: 100%;
    justify-content: center;
    left: 0;
    opacity: 0;
    pointer-events: none;
    position: absolute;
    top: 0;
    transition: opacity ${({ theme }) => theme.transitions.duration.standard}ms;
    width: 100%;
  }
`

export default function Image() {
  const history = useHistory()
  const params: { id: string } = useParams()
  const id = parseInt(params.id, 10)
  const { image, imagesCount } = useSelector((s: StoreState) => ({
    image: getImage(s, id),
    imagesCount: Object.keys(getImagesList(s)).length
  }))
  const width = parseInt(useQuery().get('width') || '', 10)
  const { urls, meta } = image || {}
  const src = urls?.[width]

  if (imagesCount && !image) {
    history.replace('/images')
  }

  useEffect(() => {
    setLoading(true)
  }, [src])

  return (
    <StyledImage
      className={classNames({ loading })}
      href={src}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img src={src} alt={meta?.keywords} onLoad={() => setLoading(false)} />
      {loading ? (
        <CircularProgress color="secondary" size={45} thickness={5} />
      ) : (
        <div className="overlay">
          <Button variant="outlined" color="secondary">
            Open
          </Button>
        </div>
      )}
    </StyledImage>
  )
}
