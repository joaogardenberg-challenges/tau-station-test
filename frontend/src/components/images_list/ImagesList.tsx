import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { fetchImages, watchImages } from 'actions'

const StyledImagesList = styled.div``

export default function ImagesList() {
  const dispatch = useDispatch()
  const [fromId, setFromId] = useState<number>(0)

  useEffect(() => {
    setFromId(0)
    dispatch(watchImages())
  }, [])

  useEffect(() => {
    dispatch(fetchImages({ fromId }))
  }, [fromId])

  return <StyledImagesList />
}
