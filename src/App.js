import React from 'react';
import WrapperForElements from "./components/WrapperForElements/WrapperForElements";
import {connect} from "react-redux";

const App = (props) => {
    document.body.style = `${(props.darkColor 
                                ? 'background: #222;' 
                                : null)}`
  return (
    <>
      <WrapperForElements />
    </>
  );
}

const mapStateToProps = (state) => ({
    darkColor: state.todo.darkColor
})

export default connect(mapStateToProps,{})(App);
