import React, { useState, useEffect } from "react";
import axios from 'axios'
import FinderChild from "../../components/finderChild";

const Finder = () => {

  const [address, setAddress] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState();
  const [isSearching, setIsSearching] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
    
//get coordinates 

const getCoordinates = async (address) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search`, 
        {
          params: {
            q: address, // The user’s address
            format: "json", // Response format
            limit: 1 // Get only the first result
          }
        }
      );
  
      if (response.data.length === 0) {
        console.error("No location found");
        return null;
      }
  
      const { lat, lon } = response.data[0];
      console.log(`Latitude: ${lat}, Longitude: ${lon}`);
      return { lat, lon };
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      return null;
    }
  };

//function to call the nearbyPlaces API 

const searchNearbyPlaces= async (lat, lon) => {
    const query = `
        [out:json];
        (
            node["amenity"="restaurant"](around:1000, ${lat}, ${lon});
            node["amenity"="bakery"](around:1000, ${lat}, ${lon});
        );
        out;
    `;

    const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

    try {
        const response = await axios.get(url);
        console.log("Nearby Places:", response.data.elements);
        return response.data.elements || [];
    } catch (error) {
        console.error("Error fetching places:", error);
        return [];
    }
}
//use isButtonClicked to trigger useEffect when isButtonClicked is true
useEffect(() => {
    const fetchData = async () => {
      if (!address.trim()) return;
  
      setLoading(true);
  
      try {
        // Get coordinates for the given address
        const { lat, lon } = await getCoordinates(address);
        if (lat && lon) {
          // Fetch nearby places using lat and lon
          const nearbyPlaces = await searchNearbyPlaces(lat, lon);
          setData(nearbyPlaces); // Store the results
          console.log("Fetched Nearby Places:",nearbyPlaces)
        } else {
          setData([]); // In case no coordinates were found
          console.log("no location found for the address")
        }
      } catch (error) {
        console.error("Error in fetching data", error);
        setData([]); // Clear results on error
      } finally {
        setLoading(false);
        setIsButtonClicked(false); // Stop loading state
      }
    };
    if (isButtonClicked){
        fetchData();
    }
    }, [isButtonClicked]); // This will run every time the address changes
  
  const handleSearch = () => {
    if (!address.trim()) {
      alert("Please enter an address");
      return;
    }
    console.log("Searching for:", address);
    setIsButtonClicked(true); 
  };

  return (
    <div>
      {isSearching ? (
        <div>
          Searching in process
          <div>{`helllo`}</div> {/* Optional content */}
        </div>
      ) : (
        <>
          <h1>Address Finder</h1>
          <FinderChild
            address={address}
            setAddress={setAddress}
            onSearch={handleSearch}
          />
        </>
      )}
    </div>
  );
}
export default Finder;