var resultado = document.querySelector("div.winner");
var spanClose = document.querySelector("span#close");
var spanCircle = document.querySelector("span#circle");
var spanVelha = document.querySelector("span#velha");
var velhaP = 0,
circleP = 0,
closeP = 0;

// button
var btn = document.createElement("a");
btn.setAttribute("onclick", "tic_tac_toe.start()");
btn.setAttribute("href", "#");
var aux = document.createTextNode("Jogar Novamente");
btn.appendChild(aux);
btn.classList.toggle("btn");
document.body.appendChild(btn);

const tic_tac_toe = {
  board: ["", "", "", "", "", "", "", "", ""],
  symbols: {
    options: ["X", "O"],
    turn_index: 0,
    change: function () {
      this.turn_index = this.turn_index === 0 ? 1 : 0;
      if(this.turn_index === 0) {
        // escolhe quem dentre o X ou O terá a animação
        document.getElementById("turnX").classList.toggle("turn");
        document.getElementById("turnO").classList.remove("turn");
      } else {
        // escolhe quem dentre o X ou O terá a animação
        document.getElementById("turnO").classList.toggle("turn");
        document.getElementById("turnX").classList.remove("turn");
      }
    },
  },
  isVelha: false,
  container_element: null,
  gameover: false,
  winning_sequences: [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ],

  init: function (container) {
    this.container_element = container;
  },

  make_play: function (position) {
    if (this.gameover) return false;
    if (this.board[position] === "") {
      this.board[position] = this.symbols.options[this.symbols.turn_index];
      this.draw();

      let winning_sequences_index = this.check_winning_sequences(
        this.symbols.options[this.symbols.turn_index]
      );
      if (winning_sequences_index >= 0) {
        // tenho um ganhador
        this.game_is_over();
      } else {
        // ainda não tenho um ganhador
        
        if(this.arrayIsComplete()){
          this.isVelha = true;
          this.game_is_over();
        } else {
          this.symbols.change();
        }

      }

      return true;
    } else {
      return false;
    }
  },

  arrayIsComplete: function () {
    for (i in this.board) {
      if (this.board[i] == "") {
        return false;
      }
    }
    return true;
  },

  game_is_over: function () {
    this.gameover = true;

    // verifica quem ganhou

    if(this.isVelha === true) {
      resultado.innerHTML = "Deu Velha" + "<br/><br/>";
      velhaP++;
      spanVelha.innerHTML = "<strong>" + velhaP + "</strong>";
      this.isVelha = false;
    } else {
      if (this.symbols.turn_index === 0) {
        resultado.innerHTML = "Jogador X Venceu" + "<br/><br/>";
        closeP++;
        spanClose.innerHTML = "<strong>" + closeP + "</strong>";
      } else {
        resultado.innerHTML = "Jogador O Venceu" + "<br/><br/>";
        circleP++;
        spanCircle.innerHTML = "<strong>" + circleP + "</strong>";
      }
    }

    document.body.appendChild(btn);
    // remove as animações ao fim do jogo
    document.getElementById("turnX").classList.remove("turn");
    document.getElementById("turnO").classList.remove("turn");

  },

  start: function () {
    this.board.fill("");
    resultado.innerText = "";
    this.symbols.turn_index = 0;
    document.body.removeChild(btn);

    document.getElementById("turnX").classList.toggle("turn");

    this.draw();
    this.gameover = false;
  },

  check_winning_sequences: function (symbol) {
    for (i in this.winning_sequences) {
      if (
        this.board[this.winning_sequences[i][0]] == symbol &&
        this.board[this.winning_sequences[i][1]] == symbol &&
        this.board[this.winning_sequences[i][2]] == symbol
      ) {
        return i;
      }
    }
    return -1;
  },

  draw: function () {
    let content = "";

    for (i in this.board) {
      content +=
        '<div onclick="tic_tac_toe.make_play(' +
        i +
        ')">' +
        this.board[i] +
        "</div>";
    }

    this.container_element.innerHTML = content;
  },
};
