import React from "react";

const Overlay = ({loading}) => {
    return (
        <div className="overlay">
          <div className="overlay-content">
            {loading ? 'Generating your question, please wait...' : 'Evaluating your answer, please wait...'}
          </div>
        </div>
    );
}
export default Overlay;