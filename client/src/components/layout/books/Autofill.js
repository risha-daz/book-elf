import React, { useContext, Fragment } from "react";
import AlertContext from "../../../context/alert/alertContext";

const Autofill = (props) => {
  const alertContext = useContext(AlertContext);
  const nextRes = (e) => {
    e.preventDefault();

    console.log("next");
  };

  const showAl = (e) => {
    e.preventDefault();
    alertContext.setAlert(
      "Not your book? Try using the next and prev buttons to switch between results or alter your search parameters by adding an author, or check for spelling mistakes in the title",
      "light",
      15000
    );
  };
  return (
    <Fragment>
      <div className='btn btn-light btn-sm' onClick={props.onAutofill}>
        Autofill
      </div>
      {/*
      <div className='btn btn-sm' onClick={showAl}>
        <i className='fas fa-info' />
      </div>
      <div className='btn btn-primary btn-sm' onClick={nextRes}>
        <i className='fas fa-step-backward' />
        Prev result
      </div>

      <div className='btn btn-primary btn-sm' onClick={nextRes}>
        Next result
        <i class='fas fa-step-forward' />
      </div>*/}
    </Fragment>
  );
};

export default Autofill;
