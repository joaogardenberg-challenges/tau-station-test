import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { fetchImages } from 'actions'

const StyledImagesList = styled.div``

export default function ImagesList() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchImages())
  }, [])

  return <StyledImagesList />
}
