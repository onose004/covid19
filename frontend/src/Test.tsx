import React, { useState, useEffect } from "react";
import { apiService } from "./api";

const App: React.FC = () => {
  const [pets, setPets] = useState<any>({});

  useEffect(() => {
    getPets();
  }, []);

  const getPets = async () => {
    await apiService.getPetById(1)
      .then(
        (res: any) => {
          setPets(res.data);
        }
      )
      .catch(
        (err: any) => {
          console.log(err)
        }
      );
  };

  return (
    <div>
      <ul>
        <li>Name: {pets.name}</li>
        <li>Status: {pets.status}</li>
      </ul>
    </div>
  );
};

export default App;
