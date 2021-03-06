import React, {useState, useEffect} from 'react';
import { postResults } from '../API/service';

const getDifficultyOptions = (values = {}, setValues) => {
  switch (values.map) {
    case "4":
      return (<>
          <input required type="radio" id="100" name="difficulty4" value="100"
            onChange={(e) => {
              setValues({...values, difficulty: e.target.value})
            }}
          /> <label htmlFor="100">100</label>
          <input required type="radio" id="200" name="difficulty4" value="200"
            onChange={(e) => {
              setValues({...values, difficulty: e.target.value})
            }}
          /> <label htmlFor="200">200</label>
          <input required type="radio" id="300" name="difficulty4" value="300"
            onChange={(e) => {
              setValues({...values, difficulty: e.target.value})
            }}
          /> <label htmlFor="300">300</label>
        </>)
    case "5":
      return (<>
        <input required type="radio" id="300" name="difficulty5" value="300"
          onChange={(e) => {
            setValues({...values, difficulty: e.target.value})
          }}
        /> <label htmlFor="300">300</label>
        <input required type="radio" id="400" name="difficulty5" value="400"
          onChange={(e) => {
            setValues({...values, difficulty: e.target.value})
          }}
        /> <label htmlFor="400">400</label>
        <input required type="radio" id="550" name="difficulty5" value="550"
          onChange={(e) => {
            setValues({...values, difficulty: e.target.value})
          }}
        /> <label htmlFor="550">550</label></>)
    default:
      return (
        <>
        <input required type="radio" id="400" name="difficulty" value="400"
          onChange={(e) => {
            setValues({...values, difficulty: e.target.value})
          }}
        /> <label htmlFor="400">400</label>
        <input required type="radio" id="600" name="difficulty" value="600"
          onChange={(e) => {
            setValues({...values, difficulty: e.target.value})
          }}
        /> <label htmlFor="600">600</label>
        <input required type="radio" id="900" name="difficulty" value="900"
          onChange={(e) => {
            setValues({...values, difficulty: e.target.value})
          }}
        /> <label htmlFor="900">900</label>
      </>)
  }
}

export default ({setResults, loggedUser}) => {
  const [values, setValues] = useState({});

  useEffect(() => {
    console.log("values", values);
    
  }, [values])
  
  const validateData = async () => {
    // TODO validate data before send
    const response = await postResults(values, loggedUser);
    response?.results && setResults(response.results);
  }
  return <div className="add-result">
      <h3>Add new result</h3>
      <form className="form" id="form-add-result">
        <div className="data">
          <input
            onChange={(e) => {
              setValues({...values, type: e.target.value})
            }}
            required
            type="radio"
            id="win"
            name="type"
            value="W"/>
          <label htmlFor="win">Win</label>
          <input
            onChange={(e) => {
              setValues({...values, type: e.target.value})
            }}
            type="radio"
            id="lose"
            name="type"
            value="L"/>
          <label htmlFor="lose">Lose</label> (*) 
        </div>
        <div className="data">
          <label>Score (*)</label> <input required type="number" name="score" step={1} onChange={(e) => {
              setValues({...values, score: e.target.value})
            }}/>
        </div>
        <div className="data">
          <label>Population</label> <input type="number" name="population"
           onChange={(e) => {
            setValues({...values, population: e.target.value})
          }}/>
        </div>
        <div className="data">
          <label>Day</label> <input type="number" name="day" onChange={(e) => {
            setValues({...values, day: e.target.value})
          }}/>
        </div>
        <div className="data">
          <label>Hour</label> <input type="number" name="hour" onChange={(e) => {
            setValues({...values, hour: e.target.value})
          }}/>
        </div>
        <div className="data">
          <label>Colonies Infected</label> <input
          type="number" name="col_infected"
          onChange={(e) => {
            setValues({...values, col_infected: e.target.value})
          }}/>
        </div>
        <div className="data">
          <label>Soldiers Dead</label> <input 
          type="number" name="sol_dead" 
          onChange={(e) => {
            setValues({...values, sol_dead: e.target.value})
          }}/>
        </div>
        
        <div className="data">
          <label>Difficulty</label> {getDifficultyOptions(values, setValues)}
        </div>
    </form>
    <button value="Add" onClick={() => validateData(values, setResults)}>Add</button>

  </div>

}