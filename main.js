// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}

function pAequorFactory(specimenNum, dna) {
  return {
    specimenNum: specimenNum,

    dna: dna,

    mutate() {
      const randIndex = Math.floor(Math.random() * this.dna.length);
      let newBase = returnRandBase();
      while (this.dna[randIndex] === newBase) {
        newBase = returnRandBase();
      }
      this.dna[randIndex] = newBase;
      return this.dna;
    },

    compareDNA(otherPAequor) {
      let identicalBases = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === otherPAequor.dna[i]) {
          identicalBases++;
        }
      }
      const percentage = (identicalBases / this.dna.length) * 100;
      console.log(`specimen #${this.specimenNum} and specimen #${otherPAequor.specimenNum} have ${percentage.toFixed(2)}% DNA in common.`);
    },

    willLikelySurvive() {
      const cgCount = this.dna.filter(base => base === 'C' || base === 'G').length;
      const survivalRate = cgCount / this.dna.length;
      const willSurvive = survivalRate >= 0.6;
      console.log(`Organism #${this.specimenNum} DNA: ${this.dna.join('')}, C/G Count: ${cgCount}, Survival Rate: ${survivalRate.toFixed(2)}, Will Likely Survive: ${willSurvive}`);
      return willSurvive;
    }

  };
}

const testOrganism = pAequorFactory(1, mockUpStrand());
console.log("Original DNA:", testOrganism.dna);
testOrganism.mutate();
console.log("Mutated DNA:", testOrganism.dna);

const organism1 = pAequorFactory(2, mockUpStrand());
const organism2 = pAequorFactory(3, mockUpStrand());
organism1.compareDNA(organism2);

const organism3 = pAequorFactory(4, mockUpStrand());
console.log(`Organism #${organism3.specimenNum} will likely survive:`, organism3.willLikelySurvive());

const survivablePAequor = [];
let id = 5;
while (survivablePAequor.length < 30) {
  let newOrganism = pAequorFactory(id, mockUpStrand());
  if (newOrganism.willLikelySurvive()) {
    survivablePAequor.push(newOrganism);
  }
  id++; // Increment ID on each loop iteration
}
console.log(`Total survivable organisms: ${survivablePAequor.length}`);
const dnaArrays = survivablePAequor.map(organism => organism.dna);
console.log("DNA of Survivable Organisms:", dnaArrays);
