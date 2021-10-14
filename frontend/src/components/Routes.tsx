import { useHistory, Route } from 'react-router-dom'
import ImagesList from './ImagesList'
import ImageModal from './image_modal/ImageModal'

export default function Routes() {
  const history = useHistory()

  const redirect = () => {
    history.replace('/images')
    return null
  }

  return (
    <>
      <Route path="/images/:id" component={ImageModal} />
      <Route path="/images" component={ImagesList} />
      <Route exact path="/" render={redirect} />
    </>
  )
}
