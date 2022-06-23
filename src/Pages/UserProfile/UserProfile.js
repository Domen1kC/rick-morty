import React, { useEffect, useState } from "react";
import "../../App.scss";

const UserProfile = ({user}) => {
  let [results, setResults] = React.useState([]);
  let [info, setInfo] = useState([]);
  let { air_date, episode, name } = info;
  let [id, setID] = useState(1);

  let api = `https://rickandmortyapi.com/api/episode/${id}`;

  useEffect(() => {
    (async function () {
      let data = await fetch(api).then((res) => res.json());
      setInfo(data);

      let a = await Promise.all(
        data.characters.map((x) => {
          return fetch(x).then((res) => res.json());
        })
      );
      setResults(a);
    })();
  }, [api]);

  return (
  <div className="vh-100 section">
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col col-lg-6 mb-4 mb-lg-0">
        <div class="card mb-3 cardstuff" >
          <div class="row g-0">
            <div class="col-md-4 gradient-custom text-center text-white">
              
              <img src={user.photos[0].value}
                alt="Avatar" class="img-fluid my-5 avatar-img"  />
              <h5 className="user-text">{user.name.familyName}</h5>
              <i class="far fa-edit mb-5"></i>
            </div>
            <div class="col-md-8">
              <div class="card-body p-4">
                <h6>Information</h6>
                <hr class="mt-0 mb-4"></hr>
                <div class="row pt-1">
                  <div class="col-6 mb-3">
                    <h6>Email</h6>
                    <p class="email-text text-muted">{user._json.email}</p>
                  </div>
                  <div class="col-6 mb-3">
                    <h6>Name</h6>
                    <p class="text-muted">{user.name.familyName}</p>
                  </div>
                </div>
                <h6>Episodes Watched</h6>
                <hr class="mt-0 mb-4"></hr>
                <div class="row pt-1">
                  <div class="col-6 mb-3">
                    <h6>Numbers of Episodes</h6>
                    <p class="text-muted"></p>
                  </div>
                </div>
                <div class="d-flex justify-content-start">

                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default  UserProfile;

