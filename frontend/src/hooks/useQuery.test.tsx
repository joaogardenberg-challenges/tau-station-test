import '@testing-library/react'

const useLocation = jest.fn()

jest.doMock('react-router-dom', () => ({ useLocation }))

const useQuery = require('./useQuery').default

describe('useQuery', () => {
  const width = 400
  const search = `?width=${width}`

  beforeEach(() => {
    useLocation.mockReturnValue({ search })
  })

  it('returns an instance of URLSearchParams that functions properly', () => {
    const query = useQuery()
    expect(query.toString()).toEqual(search.substring(1))
    expect(query.get('width')).toEqual(width.toString())
  })
})
