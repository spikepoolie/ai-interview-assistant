import React from "react";

const JobRoleSelection = ({jobRole, jobRoles, setJobRole, typeJobRole, SwitchView}) => {
   return (
    <div className="job-role-section">
        <label htmlFor="jobRole">
          {typeJobRole ? (
            <>
              Enter Job Role below or{' '}
              <button type="button" className="link-button job-role-switch" onClick={SwitchView}>
                select one from from this list
              </button>
              .
            </>
          ) : (
            <>
              Select a Job Role from the list below or{' '}
              <button type="button" className="job-role-switch" onClick={SwitchView}>
                go back to typing the question
              </button>
              .
            </>
          )}
        </label>

        {typeJobRole ? (
          <input
            id="jobRole"
            className="input-box"
            placeholder="Enter your desired job role (e.g. Software Engineer)"
            value={jobRole}
            onChange={(e) => setJobRole(e.target.value)}
          />
        ) : (
          <select
            id="jobRole"
            className="input-box"
            value={jobRole}
            onChange={(e) => setJobRole(e.target.value)}
          >
            <option value="">Select a job role</option>
            {Object.keys(jobRoles).map((role, index) => (
              <option key={index} value={role}>
                {role}
              </option>
            ))}
          </select>
        )}
      </div>
   );
}
export default JobRoleSelection;