import React, { Component } from "react";
import "./App.css";
import Button from "./components/Button";
import Input from "./components/Input";
import ClearButton from "./components/ClearButton";
// import { baseUrl } from './shared/baseUrl';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchLists } from './redux/ActionCreators';
import {
  Modal, ModalHeader, ModalBody
} from 'reactstrap';
// import { Link } from "react-router-dom";

const mapStateToProps = state => {
  return {
    easterList: state.easterList
  }
}

const mapDispatchToProps = dispatch => ({
  fetchEasterLists: () => { dispatch(fetchLists()) }
});

class App extends Component {
  constructor(props) {
    super(props);

    this.checkForEaster = this.checkForEaster.bind(this);
    this.addToInput = this.addToInput.bind(this);

    this.addDecimal = this.addDecimal.bind(this);
    this.addZeroToInput = this.addZeroToInput.bind(this);
    this.clearInput = this.clearInput.bind(this);
    this.add = this.add.bind(this);
    this.subtract = this.subtract.bind(this);
    this.multiply = this.multiply.bind(this);
    this.divide = this.divide.bind(this);
    this.evaluate = this.evaluate.bind(this);

    this.state = {
      input: "",
      previousNumber: "",
      operator: "",
      isModalOpen: false,
      link: "",
      easternumber: ""
    };
  }

  componentDidMount() {
    this.props.fetchEasterLists();
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  checkForEaster = number => {
    let checkNumber = number;

    let list = this.props.easterList.easterList;

    list.forEach(num => {
      if (checkNumber === num.key) {
        this.setState({easternumber: num.key})
        this.setState({ link: num.link });
        this.toggleModal();
      }
    });

  };

  addToInput = val => {
    this.setState({ input: this.state.input + val });
  };

  addDecimal = val => {
    if (this.state.input.indexOf(".") === -1) {
      this.setState({ input: this.state.input + val });
    }
    this.checkForEaster(this.state.input);
  };

  addZeroToInput = val => {
    if (this.state.input !== "") {
      this.setState({ input: this.state.input + val });
    }

  };

  clearInput = () => {
    this.setState({ input: "" });
  };

  add = () => {
    this.setState({ previousNumber: this.state.input });
    this.checkForEaster(this.state.input);

    this.clearInput();
    this.setState({ operator: "plus" });
  };

  subtract = () => {
    this.setState({ previousNumber: this.state.input });
    this.checkForEaster(this.state.input);

    this.clearInput();
    this.setState({ operator: "subtract" });
  };

  multiply = () => {
    this.setState({ previousNumber: this.state.input });
    this.checkForEaster(this.state.input);

    this.clearInput();
    this.setState({ operator: "multiply" });
  };

  divide = () => {
    this.setState({ previousNumber: this.state.input });
    this.checkForEaster(this.state.input);

    this.clearInput();
    this.setState({ operator: "divide" });
  };

  evaluate = () => {

    this.checkForEaster(this.state.input);
    console.log(this.state);

    if (this.state.operator === "plus") {
      this.setState({
        input:
          parseInt(this.state.previousNumber) +
          parseInt(this.state.input)
      });
    } else if (this.state.operator === "subtract") {
      this.setState({
        input:
          parseInt(this.state.previousNumber) -
          parseInt(this.state.input)
      });
    } else if (this.state.operator === "multiply") {
      this.setState({
        input:
          parseInt(this.state.previousNumber) *
          parseInt(this.state.input)
      });
    } else if (this.state.operator === "divide") {
      this.setState({
        input:
          parseInt(this.state.previousNumber) /
          parseInt(this.state.input)
      });
    }
  };


  render() {
    const ModalOfEaster = () => {
      return (
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>
            <p>Congratulations on getting easter number: {this.state.easternumber}</p>
            <p>On click of button Have your gift, You'll direct to {this.state.link}</p>
            </ModalHeader>
          <ModalBody>
            <a href={this.state.link}>
              <button>Have your gift</button>
            </a>
          </ModalBody>
        </Modal>
      );
    }

    return (
      <div className="App">
        {this.state.isModalOpen && <ModalOfEaster />}

        <div className="calc-wrapper">

          <div className="row">
            <Input>{this.state.input}</Input>
          </div>
          <div className="row">
            <Button handleClick={this.addToInput}>7</Button>
            <Button handleClick={this.addToInput}>8</Button>
            <Button handleClick={this.addToInput}>9</Button>
            <Button handleClick={this.divide}>/</Button>
          </div>
          <div className="row">
            <Button handleClick={this.addToInput}>4</Button>
            <Button handleClick={this.addToInput}>5</Button>
            <Button handleClick={this.addToInput}>6</Button>
            <Button handleClick={this.multiply}>*</Button>
          </div>
          <div className="row">
            <Button handleClick={this.addToInput}>1</Button>
            <Button handleClick={this.addToInput}>2</Button>
            <Button handleClick={this.addToInput}>3</Button>
            <Button handleClick={this.add}>+</Button>
          </div>
          <div className="row">
            <Button handleClick={this.addDecimal}>.</Button>
            <Button handleClick={this.addZeroToInput}>0</Button>
            <Button handleClick={this.evaluate}>=</Button>
            <Button handleClick={this.subtract}>-</Button>
          </div>
          <div className="row">
            <ClearButton handleClear={this.clearInput}>Clear</ClearButton>
          </div>
        </div>
      </div>
    );
  }

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

