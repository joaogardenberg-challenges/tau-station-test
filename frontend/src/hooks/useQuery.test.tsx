import { render, screen } from '@testing-library/react'

const useLocation = jest.fn()

jest.doMock('react-router-dom', () => ({ useLocation }))

const useQuery = require('./useQuery').default

const Component = () => {
  const query = useQuery()

  return (
    <>
      <p>{query.get('width')}</p>
      <p>{query.toString()}</p>
    </>
  )
}

describe('useQuery', () => {
  const width = 400
  const search = `?width=${width}`

  beforeEach(() => {
    useLocation.mockReturnValue({ search })
  })

  it('functions properly in a component', () => {
    const { container } = render(<Component />)

    const widthText = screen.getByText(width.toString())
    const queryText = screen.getByText(search.substring(1))

    expect(widthText).toBeInTheDocument()
    expect(queryText).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })
})
