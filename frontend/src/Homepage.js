import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Homepage = () => {
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:5000/api/summarize",
        { text: inputText },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const sum = response?.data?.summary
      setSummary(sum);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    const postdata = async()=>{
      try {
        await axios.post("http://127.0.0.1:5050/api/qsum",{
          question:inputText,
          summary:summary
        })
      } catch (error) {
        console.log(error)
      }
    }
    postdata()
  },[summary])
 
    const fetchHistory = async (e) => {
      e.preventDefault()
      try {
        const response = await axios.get('http://127.0.0.1:5050/api/gethistory');
        const historyValues = Object.values(response?.data?.history[0]?.history || {});
        setHistory(historyValues);
      } catch (error) {
        console.error(error);
      }
    };

    useEffect(()=>{
      const fetchinitialHistory =async()=>{
        try {
          const response = await axios.get('http://127.0.0.1:5050/api/gethistory');
          const historyValues = Object.values(response?.data?.history[0]?.history || {});
          setHistory(historyValues);
        } catch (error) {
          console.error(error);
        }
      }
      fetchinitialHistory()
    },[])
    
  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <div className="col-md-4">
          <div className="card" style={{ height: "90vh" }}>
            <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <h1>History</h1>
              <button type='submit' className='btn btn-primary' onClick={fetchHistory}>
                Refresh
              </button>
            </div>
              <hr className="line" />
              <ul>
              {history.map((item, index) => (
                <li className='p-3' key={index}><strong>{`Summary ${index + 1}`}</strong>: {`${item}`}</li>
              ))}
            </ul>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h1>Text summarizer</h1>
              <hr className="line" />
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                {loading ? (
                    <div className="position-relative">
                      <textarea
                        className="form-control text-area"
                        disabled
                        value="Converting..."
                      />
                    </div>
                  ) : (
                    <textarea
                      className="form-control text-area"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      rows="5"
                    />
                  )}
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-primary mt-2">
                    Convert
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
