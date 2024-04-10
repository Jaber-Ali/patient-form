import React from 'react';

const FollowUps = ({ followUps, setFollowUps }) => {
 const handleFollowUpChange = (index, field, value) => {
    const newFollowUps = [...followUps];
    newFollowUps[index][field] = value;
    setFollowUps(newFollowUps);
 };

 return (
    <div>
      {followUps.map((followUp, index) => (
        <div key={index}>
          <label>
            Follow-Up Date:
            <input type="date" name="followUpDate" value={followUp.followUpDate} onChange={(e) => handleFollowUpChange(index, e.target.name, e.target.value)} />
          </label>
          <label>
            ECOG:
            <input type="number" name="ECOG" value={followUp.ECOG} onChange={(e) => handleFollowUpChange(index,  e.target.name, e.target.value)} />
          </label>
        </div>
      ))}
    </div>
 );
};

export default FollowUps;