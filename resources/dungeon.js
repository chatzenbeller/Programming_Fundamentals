function checkAvailableCost(points) {
  var buyInAmount = 0;
  
  //dnd point conversion system
  switch (points) {
    case 9: 
      buyInAmount = 1;
      break;
    case 10: 
      buyInAmount = 2;
      break;
    case 11: 
      buyInAmount = 3;
      break;
    case 12: 
      buyInAmount = 4;
      break;
    case 13: 
      buyInAmount = 5;
      break;
    case 14: 
      buyInAmount = 7;
      break;
    case 15: 
      buyInAmount = 9;
      break;
    default:
      break;
  }
  
  return buyInAmount;
}

function randomMath() {
  var value = Math.floor(Math.random() * 8) + 8;
  return value;
}

function randomStats() {
  //unchanging variables
  var loop = prompt("This will randomize your current stats!\nAre you sure you want to do this?\nType \"Random\" to continue.")?.toLowerCase();
  var stats = ["str", "dex", "con", "int", "wis", "cha"];
  
  //looped variables
  var assignStats = {};
  var cost = 0;
  var roll = 0;
  var total = 27;
  
  //verification prompt
  if (loop === "random") {
    for (let i = 0; i < stats.length; i++) {
      var validNum = false;
      
      //check validity of assignment
      while (!validNum && total > 0) {
        roll = randomMath();
        cost = checkAvailableCost(roll);
        
        if (cost <= total) {
          assignStats[stats[i]] = roll;
          total -= cost;
          validNum = true;
        }
      }
      
      //provide default remainder
      if (!assignStats[stats[i]]) {
        assignStats[stats[i]] = 8;
      }
      
      //alert(assignStats[stats[i]]);
      document.getElementById(stats[i]).value = assignStats[stats[i]];
    }
    
    //leftover variables
    var costDiff = 0;
    var currentCost = 0;
    var currentValue = 0;
    var increasedCost = 0;
    var increasedValue = 0;
    var validRemainder = false;
    
    //distribute leftovers
    while (total > 0) {
      validRemainder = false;
      
      //go back through current values
      for (let i = 0; i < stats.length; i++) {
        currentValue = assignStats[stats[i]];
        
        if (currentValue >= 15) continue;
        
        increasedValue = currentValue + 1;
        currentCost = checkAvailableCost(currentValue);
        increasedCost = checkAvailableCost(increasedValue);
        costDiff = increasedCost - currentCost;
        
        if (costDiff <= total) {
          assignStats[stats[i]] = increasedValue;
          total -= costDiff;
          
          document.getElementById(stats[i]).value = assignStats[stats[i]];
          validRemainder = true;
        }
      }
      
      //no values left to fix
      if (!validRemainder) break;
    }
  }
  
  else {
    alert("Random stats canceled!");
  }
}

function manualSelection(stats, loopCount, exclude) {
  var statNames = ["str", "dex", "con", "int", "wis", "cha"];
  var statFilter = statNames.filter(stat => stat !== exclude);
  var abilityInput = [];
  
  for (let i = 0; i < loopCount; i++) {
    var selectedStat = "";
    
    while (true) {
      selectedStat = prompt("Choose an ability to improve!\nAvailable options: " + statFilter.join(", ") + "\n(Type exactly as shown)")?.toLowerCase();
      
      if (statFilter.includes(selectedStat)) {
        stats[selectedStat] += 1;
        abilityInput.push(selectedStat);
        statFilter = statFilter.filter(stat => stat !== selectedStat);
        break;
      }
      
      else {
        alert("Your input was invalid!");
      }
    }
  }
  
  return abilityInput;
}

function racialBonus(character) {
  var abilityInput = [];
  var loopCount = 0;
  
  switch (character.race) {
    case "dragonborn":
      character.stats.str += 2;
      character.stats.cha += 1;
      break;
    case "hill_dwarf":
      character.stats.con += 2;
      character.stats.wis += 1;
      break;
    case "mountain_dwarf":
      character.stats.con += 2;
      character.stats.str += 2;
      break;
    case "high_elf":
      character.stats.dex += 2;
      character.stats.int += 1;
      break;
    case "wood_elf":
      character.stats.dex += 2;
      character.stats.wis += 1;
      break;
    case "dark_elf":
      character.stats.dex += 2;
      character.stats.cha += 1;
      break;
    case "rock_gnome":
      character.stats.int += 2;
      character.stats.con += 1;
      break;
    case "forest_gnome":
      character.stats.int += 2;
      character.stats.dex += 1;
      break;
    case "half-elf":
      loopCount = 2;
      character.stats.cha += 2;
      //half-elf is the only reason for this function (-_-)
      abilityChoice = manualSelection(character.stats, loopCount, "cha");
      break;
    case "half-orc":
      character.stats.str += 2;
      character.stats.con += 1;
      break;
    case "lightfoot_halfling":
      character.stats.dex += 2;
      character.stats.cha += 1;
      break;
    case "stout_halfling":
      character.stats.dex += 2;
      character.stats.con += 1;
      break;
    case "human":
      character.stats.str += 1;
      character.stats.dex += 1;
      character.stats.con += 1;
      character.stats.int += 1;
      character.stats.wis += 1;
      character.stats.cha += 1;
      break;
    case "tiefling":
      character.stats.int += 1;
      character.stats.cha += 2;
      break;
  }
}

function displayCharacterSheet() {
  var character = {
    "name": document.getElementById("charName").value,
    "race": document.getElementById("charRace").value,
    "class": document.getElementById("charClass").value,
    "stats": {
      "str": parseInt(document.getElementById("str").value),
      "dex": parseInt(document.getElementById("dex").value),
      "con": parseInt(document.getElementById("con").value),
      "int": parseInt(document.getElementById("int").value),
      "wis": parseInt(document.getElementById("wis").value),
      "cha": parseInt(document.getElementById("cha").value),
    }
  };
  
  racialBonus(character);
  
  var containerOutput = `
    <h3>${character.name}</h3>
    <p><strong>Race:</strong> ${character.race.replaceAll("_", " ")}</p>
    <p><strong>Class:</strong> ${character.class}</p>
    <div id="scorePreview">
      <div class="ability"><label>Strength:</label><br>${character.stats.str}</div>
      <div class="ability"><label>Dexterity:</label><br>${character.stats.dex}</div>
      <div class="ability"><label>Constitution:</label><br>${character.stats.con}</div>
      <div class="ability"><label>Intelligence:</label><br>${character.stats.int}</div>
      <div class="ability"><label>Wisdom:</label><br>${character.stats.wis}</div>
      <div class="ability"><label>Charisma:</label><br>${character.stats.cha}</div>
    </div>
  `;
  
  document.getElementById("contentContainer").innerHTML = containerOutput;
}

function resetCharacter() {
  var statIds = ["str", "dex", "con", "int", "wis", "cha"];
  
  document.getElementById("charName").value = "";
  document.getElementById("charRace").selectedIndex = 0;
  document.getElementById("charClass").selectedIndex = 0;
  
  for (let i = 0; i < statIds.length; i++) {
    var stat = statIds[i];
    document.getElementById(stat).value = 8;
  }
  
  document.getElementById("contentContainer").innerHTML = "";
}