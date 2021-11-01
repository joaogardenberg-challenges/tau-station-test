import styled from 'styled-components'

const StyledImageFiller = styled.li<ImageFillerProps>`
  height: calc(
    (100vh - ${({ theme, perColumn }) => theme.spacing(perColumn * 2 + 2)}) /
      ${({ perColumn }) => perColumn}
  );
  list-style: none;
  margin: ${({ theme }) => theme.spacing(1)};
  width: calc(
    (100% - ${({ theme, perRow }) => theme.spacing(perRow * 2 + 2)}) /
      ${({ perRow }) => perRow}
  );
`

interface ImageFillerProps {
  perRow: number
  perColumn: number
}

export default function ImageFiller({ perRow, perColumn }: ImageFillerProps) {
  return <StyledImageFiller perRow={perRow} perColumn={perColumn} />
}
