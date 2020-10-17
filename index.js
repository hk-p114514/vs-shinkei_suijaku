(function() {
    'use strict';
    
    
    let pairs = 8;
    let cards = [];
    const stage = document.getElementById('stage');
    
    let flipCount = 0;
    let firstCard = null;
    let secondCard = null;
    
    let player = true;
    let P1Score = 0;
    let P2Score = 0;
    let playerId = document.getElementById('playerId');
    playerId.innerText = 'Player 1 のターン';

    let p1Score = document.getElementById('p1-score');
    let p2Score = document.getElementById('p2-score');

    p1Score.innerText = 0;
    p2Score.innerText = 0;

    let correctCount = 0;
    
    const init = ()=>{
        let card;
        for(let i=0; i<pairs; i++) {
            cards.push(createCard(i));
            cards.push(createCard(i));
            // stage.appendChild(createChild(i));
            // stage.appendChild(createChild(i));
        }
        while(cards.length) {
            card = cards.splice(Math.floor(Math.random() * cards.length), 1)[0];
            // stage.appendChild(card);
            document.getElementById('stage').appendChild(card);
        }
    }
    
    
    
    const createCard = (n)=>{
        let container;
        let card;
        let inner;
        inner = '<div class="card-front">' + n + '</div><div class="card-back">?</div>';
        card = document.createElement('div');
        card.innerHTML = inner;
        card.className = 'card';
        
        
        card.addEventListener('click', function(){
            flipCard(this);
            document.getElementById('ReStart').className='';
        });
    
    
        container = document.createElement('div');
        container.className = 'card-container';
        container.appendChild(card);
        return container;
    }
    
    function flipCard(card) {
        if (firstCard !== null && secondCard !== null) {
          return;
        }
    
        if(card.className.indexOf('open') !== -1)return;
    
        card.className = 'card open';
        flipCount++;
        if (flipCount % 2 === 1) {
          firstCard = card;
        } else {
          secondCard = card;
          secondCard.addEventListener('transitionend', check);
        }
      }

      const check = ()=> {
          if(
              firstCard.children[0].textContent !== 
              secondCard.children[0].textContent
          ){
              firstCard.className = 'card';
              secondCard.className = 'card';
              if(player) {
                  player = false;
                  playerId.innerText = 'Player ２ のターン';
              }else{
                  player = true;
                  playerId.innerText = 'Player 1 のターン';
              }
          }else{
                if(player) {
                    P1Score++;
                    p1Score.innerText = P1Score;
                }else{
                    P2Score++;
                    p2Score.innerText = P2Score;
                }
          }
    
          secondCard.removeEventListener('transitionend', check);
          firstCard = null;
          secondCard = null;
    
      }
    
      const runtimer = () => {
          document.getElementById('score').textContent = ((Date.now() - startTime) / 1000).toFixed(2);
         timeOutId = setTimeout(()=> {
              runtimer();
          });
      }
    
    init();
    })();