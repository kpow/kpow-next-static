function createData(key, value) {
  return { key, value};
}
const runBattle = (player1Data,player2Data) =>{
    // internal count as we compare stats each check will increase or decrease these 
    let player1Count =0;
    let player2Count = 0;

    // cycle through all the powerstats and compare and pick winner per stat save results to array
    const powerStats =  Object.keys(player1Data.data.powerstats)
    console.log(powerStats)
    const battleResults = powerStats.map((power)=>{ 
      if(player1Data.data.powerstats[power] == player2Data.data.powerstats[power]){
        const rInt = (max = 1, min = 0) => Math.floor(Math.random() * (max + 1 - min)) + min;
        rInt(1,0) ? player1Count++ : player2Count++;
      }else if(player1Data.data.powerstats[power] < player2Data.data.powerstats[power]){
        player2Count++
      }else if(player1Data.data.powerstats[power] > player2Data.data.powerstats[power]){
        player1Count++
      }
      console.log(player1Data.data.powerstats[power])
      const winner = player1Data.data.powerstats[power] < player2Data.data.powerstats[power] ? player2Data.data.name : player1Data.data.name;
      //winner == player2Data.data.name ? player2Count++ : player1Count++;
      return createData(power, winner)
    })
    // add all power stats and pick the highest number
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const player1PowerTotal = Object.values(player1Data.data.powerstats).reduce(reducer)
    const player2PowerTotal = Object.values(player1Data.data.powerstats).reduce(reducer)
    player1PowerTotal>player2PowerTotal ? player1Count++ : player2Count++;

    // compare counts to pick a winner
    const battleWinner = player1Count > player2Count ? player1Data : player2Data;
    const battleLoser = player1Count < player2Count ? player1Data : player2Data;
    const winnerObject = createData('winner',battleWinner.data.name)
    const loserObject = createData('loser',battleLoser.data.name)
    battleResults.push(winnerObject)
    battleResults.push(loserObject)
    
    console.log(player1Count+" - "+player2Count)
    return battleResults
  }

  export default runBattle