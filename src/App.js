import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import React, { useState, useEffect } from "react";


import "./App.scss";
import Search from "./components/Search/Search";
import Card from "./components/Card/Card";
import Pagination from "./components/Pagination/Pagination";
import Filter from "./components/Filter/Filter";
import Navbar from "./components/Navbar/Navbar";

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Episodes from "./Pages/Episodes";
import Location from "./Pages/Location";
import Login from "./Pages/Login"
import CardDetails from "./components/Card/CardDetails";
import UserProfile from "./Pages/UserProfile/UserProfile";


function App() {
  const [user, setUser] = useState(null);
    useEffect(() => {
      const getUser = () => {
        fetch("https://react-rick-app.herokuapp.com:5000/auth/login/success", {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: 
            "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials"
            : true,
            "Access-Control-Allow-Origin" : true,
            
          },
        })
          .then((response) => {
            if (response.status === 200) return response.json();
            throw new Error("authentication has been failed!");
          })
          .then((resObject) => {
            setUser(resObject.user);
          })
          .catch((err) => {
            console.log(err);
          });
      };
      getUser();
    }, []);


    


  return ( 
    
    <Router>
      <div className="App">
        <Navbar user={user} />
      
      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<CardDetails />} />

        <Route path="/episodes" element={user ? <Episodes/> : <Navigate to='/Login'/>} />
        <Route path="/episodes/:id" element={<CardDetails />} />

        <Route path="/location" element={<Location />} />
        <Route path="/location/:id" element={<CardDetails />} />
        <Route path="/login" element={user ? <Navigate to = '/'/> : <Login/ >} />
        <Route path="/userprofile" element={<UserProfile user={user} />} />
      </Routes>
      </div  >
    </Router>
  );
}

const Home = () => {
  let [pageNumber, updatePageNumber] = useState(1);
  let [status, updateStatus] = useState("");
  let [gender, updateGender] = useState("");
  let [species, updateSpecies] = useState("");
  let [fetchedData, updateFetchedData] = useState([]);
  let [search, setSearch] = useState("");
  let { info, results } = fetchedData;

  let api = `https://rickandmortyapi.com/api/character/?page=${pageNumber}&name=${search}&status=${status}&gender=${gender}&species=${species}`;

  useEffect(() => {
    (async function () {
      let data = await fetch(api).then((res) => res.json());
      updateFetchedData(data);
    })();
  }, [api]);
  return (
    <div className="App">
      <h1 className="text-center mb-3">Characters</h1>
      <Search setSearch={setSearch} updatePageNumber={updatePageNumber} />
      <div className="container">
        <div className="row">
          <Filter
            pageNumber={pageNumber}
            status={status}
            updateStatus={updateStatus}
            updateGender={updateGender}
            updateSpecies={updateSpecies}
            updatePageNumber={updatePageNumber}
          />
          <div className="col-lg-8 col-12">
            <div className="row">
              <Card page="/" results={results} />
            </div>
          </div>
        </div>
      </div>
      <Pagination
        info={info}
        pageNumber={pageNumber}
        updatePageNumber={updatePageNumber}
        
      />
      
    </div>
    
  );
};
;
 

export default App;
