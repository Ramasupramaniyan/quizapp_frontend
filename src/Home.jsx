import React, { useEffect, useState } from "react";
import DataTable,{expandableRowsComponent} from "react-data-table-component";
import QuestionArea from "./QuestionArea";
import QuestionList from "./QuestionList";
import Navbar from "./navbar";
import axios from "axios";

const Home = () => {

  const [results, setResults]   = useState([]);
  const ExpandedComponent       = ({ data }) => <pre>Feedback: {data.topicFeedback}</pre>;
  const userEmail               = sessionStorage.getItem("email"); 
  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async() => {
    try{
        axios.post("http://localhost:5000/api/getResults", {email:userEmail})
        .then(result => {
          console.log(result,userEmail);
            if(result.status === 200){
                const responseData = result.data.data;
                console.log(responseData);
                
                if(responseData.length > 0){
                  setResults(responseData);
                }
            }else{
                console.log("Can't get data from api")
            }
        })
        .catch(err => console.log(err))
    }catch(error){
      console.error("Error fetching results:", error);
    }
  }

  const columns = [
    { name: "Date", selector: (row) => new Date(row.date).toLocaleString(), sortable: true },
    { name: "Score", selector: (row) => row.score, sortable: true },
    { name: "Total Questions", selector: (row) => row.totalQuestions, sortable: true },
    { name: "Percentage", selector: (row) => `${row.percentage.toFixed(2)}%`, sortable: true },
    { name: "Performance", selector: (row) => row.performance, sortable: true },
  ];
  
  return (
    <div>
      <Navbar name="Home"/>
      <div className="p-4 m-1 border rounded h-100">
        <div className="container-fluid">
          <DataTable
            title   = "Test Results"
            columns = {columns}
            data    = {results}
            pagination
            expandableRows 
            expandableRowsComponent={ExpandedComponent}
            highlightOnHover
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
