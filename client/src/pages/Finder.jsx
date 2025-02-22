import React, { useState } from "react";
import FinderChild from "../../components/finderChild";

const Finder = () => {
  const [address, setAddress] = useState("");

  const handleSearch = () => {
    if (!address.trim()) {
      alert("Please enter an address");
      return;
    }
    console.log("Searching for:", address);
    // api request
  };

  return (
    <div>
      <h1>Address Finder</h1>
      <FinderChild
        address={address} 
        setAddress={setAddress} 
        onSearch={handleSearch} 
      />
    </div>
  );
};

export default Finder;