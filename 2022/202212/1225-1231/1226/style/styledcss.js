// import styled from 'styled-components'

const Button = styled.button`
  background: palevioletred;
  border-radius: 3px;
  border: none;
  color: white;
`

const TomatoButton = styled(Button)`
  background: tomato;
`

render(
  <>
    <Button>I'm purple.</Button>
    <br />
    <TomatoButton>I'm red.</TomatoButton>
  </>
)

// import styled from 'styled-components'

const padding = '3em'

const Section = styled.section`
  color: white;

  /* Pass variables as inputs */
  padding: ${padding};

  /* Adjust the background from the properties */
  background: ${props => props.background};
`

render(
  <Section background="cornflowerblue">
    ✨ Magic
  </Section>
)

@mixin reset {
  margin: 0;
  padding: 0;
  list - style: none;
}

import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    color: ${props => (props.whiteColor ? 'white' : 'black')};
  }
`

  // later in your app

  < React.Fragment >
  <GlobalStyle whiteColor />
  <Navigation /> {/* example of other top-level stuff */ }
</React.Fragment >

import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const FadeInButton = styled.button`
  animation: 1s ${fadeIn} ease-out;
`
//@ts-ignoreとは、TypeScriptの型チェックを無視するという意味です。この場合、styled-componentsの型定義がないため、エラーが出てしまいます。このような場合は、@ts-ignoreを使って、エラーを無視することができます。

