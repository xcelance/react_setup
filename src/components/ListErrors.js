import React from "react";

const ListErrors = (props) => {
  const { errors, showKeys } = props;
  return (
    <React.Fragment>
      {errors && errors.length ? (
        <ul className="error-messages">
          {Object.keys(errors).map((key) => {
            return (
              <li key={key}>
                {showKeys && { key }}
              </li>
            );
          })}
        </ul>
      ) : null}
    </React.Fragment>
  );
};

export default ListErrors;
