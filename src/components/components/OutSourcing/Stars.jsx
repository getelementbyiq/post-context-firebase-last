import React from "react";
import PropTypes from "prop-types";

const Staars = (props) => {
  return (
    <>
      <div class="glowing">
        <span style={{ "--i": 1 }}></span>

        <span style={{ "--i": 2 }}></span>

        <span style={{ "--i": 3 }}></span>
      </div>

      <div class="glowing">
        <span style={{ "--i": 1 }}></span>

        <span style={{ "--i": 2 }}></span>

        <span style={{ "--i": 3 }}></span>
      </div>

      <div class="glowing">
        <span style={{ "--i": 1 }}></span>

        <span style={{ "--i": 2 }}></span>

        <span style={{ "--i": 3 }}></span>
      </div>

      <div class="glowing">
        <span style={{ "--i": 1 }}></span>

        <span style={{ "--i": 2 }}></span>

        <span style={{ "--i": 3 }}></span>
      </div>
    </>
  );
};

Staars.propTypes = {};

export default Staars;
