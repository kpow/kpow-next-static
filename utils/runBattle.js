function createData(key, value) {
  return { key, value};
}
const runBattle = (player1Data,player2Data) =>{
    const WILDCARD_VALUE = 6 
    const WILDCARD_CONDITION = 8
    const WILDCARD_MAX = 10
    const rInt = (max = 1, min = 0) => Math.floor(Math.random() * (max + 1 - min)) + min;
    // internal count as we compare stats each check will increase or decrease these 
    let player1Count =0;
    let player2Count = 0;

    // cycle through all the powerstats and compare and pick winner per stat save results to array
    const powerStats =  Object.keys(player1Data.data.powerstats)

    const battleResults = powerStats.map((power)=>{ 
      if(player1Data.data.powerstats[power] == player2Data.data.powerstats[power]){
        rInt(1,0) ? player1Count++ : player2Count++;
      }else if(player1Data.data.powerstats[power] < player2Data.data.powerstats[power]){
        player2Count++
      }else if(player1Data.data.powerstats[power] > player2Data.data.powerstats[power]){
        player1Count++
      }
      const winner = player1Data.data.powerstats[power] < player2Data.data.powerstats[power] ? player2Data.data.name : player1Data.data.name;
      return createData(power, winner)
    })
    // add all power stats and pick the highest number
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const player1PowerTotal = Object.values(player1Data.data.powerstats).reduce(reducer)
    const player2PowerTotal = Object.values(player2Data.data.powerstats).reduce(reducer)
    player1PowerTotal<player2PowerTotal ? player1Count++ : player2Count++;
    const overallWinner = player1PowerTotal<player2PowerTotal ? player1Data.data.name: player2Data.data.name;

    //roll the wildcard
    const playerWildCard = rInt(WILDCARD_MAX,0)
    let wildCard = "none"
    let wildCardPlayer = player1PowerTotal>player2PowerTotal ? "player2" : "player1";

    if (playerWildCard>WILDCARD_CONDITION){
      if(wildCardPlayer == "player1"){
        player1Count = player1Count+WILDCARD_VALUE
        wildCard = player1Data.data.name
      } else if (wildCardPlayer == "player2"){
        player2Count = player2Count+WILDCARD_VALUE
        wildCard = player2Data.data.name
      }
    }

    // compare counts to pick a winner
    const battleWinner = player1Count > player2Count ? player1Data : player2Data;
    const battleLoser = player1Count < player2Count ? player1Data : player2Data;
    battleResults.unshift(createData('overall',overallWinner))
    battleResults.unshift(createData('wildcard',wildCard))
    battleResults.unshift(createData('loser',battleLoser.data.name))
    battleResults.unshift(createData('winner',battleWinner.data.name))
    console.log(player1Count +' - '+player2Count)
    console.log(battleResults)
    return battleResults
  }

  export default runBattle