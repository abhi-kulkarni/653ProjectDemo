import React, { useState, useEffect } from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import '../static/css/custom.css'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import Alert from 'react-bootstrap/Alert'
import { API_URL } from '../constants/index'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import { css } from "@emotion/react"
import ClipLoader from "react-spinners/ClipLoader"
import {
  FaFire,
  FaMicrochip,
  FaPlay,
} from "react-icons/fa";


const IndexPage = (props) => {
  
  const [msg, setMsg] = useState("");
  const [trainingDict, setTrainingDict] = useState({});
  const [attacksDict, setAttacksDict] = useState({});
  const [isTraining, setIsTraining] = useState(false);
  const [isAttacks, setIsAttacks] = useState(false);
  const [isPreprocessing, setIsPreprocessing] = useState(false);
  let [loading, setLoading] = useState(false);
  let [spinnerColor, setSpinnerColor] = useState("#0879FA");

  const override = css`
        justify-content: center; 
        align-items: center; 
        padding-top:1px;
        margin-top: 11%;
  `;

  useEffect(() => {
    getInitData();
  }, [])

  const history = useHistory();

  const redirectPage = (page) => {
      history.push(page);
  }

  const getInitData = () => {
      let post_data = {};
      setLoading(true);
      axios.post(API_URL+'get_data/', post_data).then((res) => {
        if (res.data.ok) {
            setLoading(false);
            let msg = res.data.msg;
            setMsg(msg);
        } else {
          setLoading(false);
          console.log('Some error occured.')
        }
      }).catch((err) => {
          setLoading(false);
          console.log(err);
      });
  }

  const preprocess = () => {
      let post_data = {};
      setIsPreprocessing(true);
      setIsAttacks(false);
      setIsTraining(false);
      setLoading(true);
      axios.post(API_URL+'preprocessing/', post_data).then((res) => {
        if (res.data.ok) {
            setLoading(false);
            let msg = res.data.msg;
            setMsg(msg);
        } else {
          setLoading(false);
          console.log('Some error occured.')
        }
      }).catch((err) => {
          setLoading(false);
          console.log(err);
      });
  }

  const train = () => {
      setIsTraining(true);
      setIsAttacks(false);
      setIsPreprocessing(false);
      setTrainingDict({});
      setAttacksDict({});
      setLoading(true);
      let post_data = {};
      axios.post(API_URL+'training/', post_data).then((res) => {
        if (res.data.ok) {
            setLoading(false);
            let msg = res.data.msg;
            let training_dict = res.data.training_dict;
            setTrainingDict(training_dict);
            setMsg(msg);
        } else {
          setLoading(false);
          console.log('Some error occured.')
        }
      }).catch((err) => {
          setLoading(false);
          console.log(err);
      });
  }

  const attacks = () => {
      setIsAttacks(true);
      setIsTraining(false);
      setIsPreprocessing(false);
      setTrainingDict({});
      setAttacksDict({});
      setLoading(true);
      let post_data = {};
      axios.post(API_URL+'attacks/', post_data).then((res) => {
        if (res.data.ok) {
            setLoading(false);
            let msg = res.data.msg;
            let attacks_dict = res.data.attacks_dict;
            setAttacksDict(attacks_dict);
            setMsg(msg);
        } else {
          setLoading(false);
          console.log('Some error occured.')
        }
      }).catch((err) => {
          setLoading(false);
          console.log(err);
      });
  }

  return (
    <div>
      <Row style={{ padding: '40px 0px 0px 0px', margin: '0px' }}>
        <Col style={{ padding: '0px', margin: '0px' }} xs={4} sm={4} md={4} lg={4} xl={4}>
          <Button disabled={loading} onClick={() => preprocess()} size="sm" variant="primary">
              Preprocess <FaMicrochip style={{ marginLeft: '5px', marginBottom: '1px' }} />
          </Button> 
        </Col>
        <Col style={{ padding: '0px', margin: '0px' }} xs={4} sm={4} md={4} lg={4} xl={4}>
          <Button disabled={loading} onClick={() => train()} size="sm" variant="success">
              Train <FaPlay style={{ marginLeft: '5px', marginBottom: '1px' }} />
          </Button> 
        </Col>
        <Col style={{ padding: '0px', margin: '0px' }} xs={4} sm={4} md={4} lg={4} xl={4}>
          <Button disabled={loading} onClick={() => attacks()} size="sm" variant="warning">
              Attacks <FaFire style={{ marginLeft: '5px', marginBottom: '2px' }} />
          </Button> 
        </Col>      
      </Row>
      <ClipLoader color={spinnerColor} loading={loading} css={override} size={100} />
      <Row style={{ padding: '50px', margin: '0px' }}>
        <Col style={{ padding: isTraining?'0px':'20px 300px 0px 300px', margin: '0px' }} xs={12} sm={12} md={12} lg={12} xl={12}>
          {isPreprocessing && msg?<Alert style={{ padding: '5px' }} variant="success">
            {msg}
          </Alert>:''}
            {trainingDict && Object.keys(trainingDict).length > 0?<Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <td>Parameters</td>
                  <th>Accuracy</th>
                  <th>MSE</th>
                  <th>Score</th>
                  <th>Actual Label</th>
                  <th>Predicted Label</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Output</td>
                  <td>{trainingDict.accuracy}</td>
                  <td>{trainingDict.mse}</td>
                  <td>{trainingDict.score}</td>
                  <td>{trainingDict.actual_label}</td>
                  <td>{trainingDict.predicted_label}</td>
                </tr>
              </tbody>
            </Table>:''}
            {attacksDict && Object.keys(attacksDict).length > 0?<Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Attacks</th>
                  <th>Accuracy</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>FGSM</td>
                  <td>{attacksDict.FGSM} %</td>
                </tr>
                <tr>
                  <td>BIM</td>
                  <td>{attacksDict.BIM} %</td>
                </tr>
                <tr>
                  <td>PGD</td>
                  <td>{attacksDict.PGD} %</td>
                </tr>
                <tr>
                  <td>CW</td>
                  <td>{attacksDict.CW} %</td>
                </tr>
              </tbody>
            </Table>:''}
        </Col>  
      </Row>
    </div>
  );
}

export default withRouter(IndexPage);
