function test(entities_list) {

    //mql calculation :

        const arrivalRate = 3; // Arrival rate (λ)
    const serviceRate = 5; // Service rate (μ)
    const maxEntities = 670; // Maximum number of entities

    // Calculate MQL for different number of entities

    for (let i = 1; i <= maxEntities; i++) {
      const mql = (arrivalRate * serviceRate) / (serviceRate - arrivalRate) * (1 - Math.pow((arrivalRate / serviceRate), i));
      console.log(mql);

    }



}















