import React, { useContext, Fragment } from "react";
import AlertContext from "../../context/alert/alertContext";

const Alert = () => {
  const alertContext = useContext(AlertContext);
  const { alerts } = alertContext;
  return (
    <Fragment>
      {alerts.length > 0 &&
        alerts.map((alert) => (
          <div
            key={alert.id}
            className={`alert alert-${alert.type}`}
            style={{ borderRadius: "10px" }}
          >
            <i className='fa fa-info-circle'> </i> {alert.msg}
          </div>
        ))}
    </Fragment>
  );
};

export default Alert;
