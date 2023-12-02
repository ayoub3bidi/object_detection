import { useState, useEffect } from 'react';
import firebase from '../firebase';
import { get, ref } from 'firebase/database';

const Diagrams = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => { 
      const detectionsRef = ref(firebase, 'detections')
      get(detectionsRef).then((snapshot) => {
        if (snapshot.exists()) {
           setData(snapshot.val());
           snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();
            data.push(childData);
          });
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Data from Firebase:</h2>
    </div>
  );
};

export default Diagrams;