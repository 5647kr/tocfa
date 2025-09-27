import styled from "styled-components"

export default function Button({children, props}) {
  return (
    <StyledButton {...props}>{children}</StyledButton>
  )
}
