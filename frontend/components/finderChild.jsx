import React from "react";
import  Button  from "./Button";
import  Input  from "./input";


const FinderChild = ({ address, setAddress, onSearch }) => {
  return (
    <div>
      <Input
        type="text"
        placeholder="Enter your address"
        value={address}
        onChange={(e) => {setAddress(e.target.value);}} form control here
      />
      <Button onClick={onSearch}>Search</Button> {/* Calls parent function */}

  
    </div>
  );
};

export default FinderChild;