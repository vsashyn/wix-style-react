import React from 'react';

import {TextButtonNone} from './textbutton-none';
import {TextButtonOnHover} from './textbutton-onhover';
import {TextButtonUnderline} from './textbutton-underline';
import {TextButtonSizes} from './textbutton-sizes';
import {TextButtonAffixes} from './textbutton-affixes';
import {TextButtonWeights} from './textbutton-weights';

const controlledWidth = {
  height: 'auto',
  width: '100%',
  display: 'flex'
};

const halfColumn = {
  display: 'flex',
  flexDirection: 'column',
  padding: '10px',
  width: '48%',
  lineHeight: '1.6'
};

const Container = ({children}) => <div style={controlledWidth}>{children}</div>; //eslint-disable-line

const Box = ({children}) => <div style={halfColumn}>{children}</div>; //eslint-disable-line

class TextButtonStory extends React.Component {
  render() {
    return (
      <div style={{margin: '0px 0 16px', paddingLeft: '20px'}}>
        <Container>
          <Box>
            <TextButtonNone/>
          </Box>
          <Box>
            <TextButtonOnHover/>
          </Box>
        </Container>
        <Container>
          <Box>
            <TextButtonUnderline/>
          </Box>
          <Box>
            <TextButtonAffixes/>
          </Box>
        </Container>
        <Container>
          <Box>
            <TextButtonSizes/>
          </Box>
          <Box>
            <TextButtonWeights/>
          </Box>
        </Container>
      </div>
    );
  }
}

export default TextButtonStory;
