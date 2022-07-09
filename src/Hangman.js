import React, { Component } from "react";
import "./styles/Hangman.css";
import { wordGen } from "./words";
import Button from "./AlphaButtons";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";

class Hangman extends Component {
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6],
  };

  constructor(props) {
    super(props);
    this.state = {
      nWrong: 0,
      guessed: new Set(),
      answer: wordGen(),
      hideButtons: false,
      win: false,
    };
    this.handleGuess = this.handleGuess.bind(this);
    this.restart = this.restart.bind(this);
  }
  restart() {
    this.setState((st) => ({
      nWrong: 0,
      guessed: new Set(),
      answer: wordGen(),
      hideButtons: false,
      win: false,
    }));
  }
  winner = () => {
    setTimeout(() => {
      this.setState((st) => ({
        hideButtons: true,
        win: true,
      }));
    }, 0);
  };
  guessedWord() {
    let c = 0;
    return this.state.answer.split("").map((ltr) => {
      if (this.state.guessed.has(ltr)) {
        c += 1;
        if (c === this.state.answer.length) this.winner();
        return ltr;
      } else {
        return "_";
      }
    });
  }

  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState((st) => {
      return {
        guessed: st.guessed.add(ltr),
        nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1),
      };
    });
    this.setState((st) => {
      return {
        hideButtons: st.nWrong == this.props.maxWrong,
      };
    });
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return (
      <div className="buttons">
        {"abcdefghijklmnopqrstuvwxyz".split("").map((ltr) => (
          <Button
            ltr={ltr}
            fn={this.handleGuess}
            key={ltr}
            disabled={this.state.guessed.has(ltr)}
          />
        ))}
      </div>
    );
  }

  /** render: render game */
  render() {
    return (
      <div>
        <div className="Hangman">
          <h1>Hangman</h1>
          <img
            src={this.props.images[this.state.nWrong]}
            alt={this.state.nWrong + "/6"}
          />
          <p className="Wrong-guesses">
            {this.state.nWrong > 0 && "Wrong guesses: " + this.state.nWrong}
          </p>
          <div className="Hangman-word">
            {this.state.nWrong === this.props.maxWrong ? (
              <span>
                <p
                  className="d-inline"
                  style={{ letterSpacing: 0, right: "10rem" }}
                >
                  Correct Answer is:{" "}
                </p>{" "}
                <p className="d-inline">{this.state.answer.split("")}</p>
              </span>
            ) : (
              this.guessedWord()
            )}
          </div>
          <p className="Hangman-btns">
            {!this.state.hideButtons
              ? this.generateButtons()
              : !this.state.win
              ? "YOU LOSE!"
              : "CORRECT ANSWER!"}
          </p>
        </div>
        <button className="display-6" onClick={this.restart}>
          Restart
        </button>
      </div>
    );
  }
}

export default Hangman;
