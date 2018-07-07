module.exports.create_truth_table = (scale_results) => {
    console.log("scale_results", scale_results)


    const a = 1, b = 2, c = 0
    const coin_solution_matrix = [
        [a, a, a, a, b, b, b, b, c, c, c, c],
        [
            [a, a, b, b, b, c, c, c, a, c, c, c],
            [
                [a, b, c, c, c, c, c, c, c, c, c, c],
                [c, c, a, b, c, c, c, c, c, c, c, c],
                [c, c, c, c, c, a, b, c, c, c, c, c]
            ]
        ],
        [
            [c, c, c, c, c, a, a, a, b, b, b, c],
            [
                [c, c, c, c, c, c, c, c, a, b, c, c],
                [c, c, c, c, c, c, c, c, c, c, a, b]
            ]
        ]
    ]
    const smx = coin_solution_matrix
    var coins
    var theCoin
    var measurement
    var chapter
    function init() {
        measurement = 0
        coins = new Array([], [], [], [], [], [], [], [], [], [], [], [])
        var randomCoinNumber = Math.floor(Math.random() * 12)
        var randomWeight = Math.floor(Math.random() * 2) % 2 === 0 ? '-' : '+'
        theCoin = [randomCoinNumber, randomWeight]
        chapter = new Array()
        // theCoin = [0, '-']
        var openingStory = "Given that there are 12 coins, where one of them is false, and all good coins weigh exactly the same. Using three measurements on a balancing scale, I will determine which coin is false, and wether it is light or heavy. "
        chapter.push(openingStory)
        console.log(openingStory)
        console.log("( the false coin is  ", theCoin[0] + 1, theCoin[1], " )")

    }
    init()

    ////////////////////////////////////////////////////////////////////////////////
    function processWeights(m) {
        let afterMath
        if (m[theCoin[0]] > 0) {
            if (theCoin[1] === '+') {
                if (m[theCoin[0]] === 1) {
                    afterMath = [false, '+', '-']
                } else {
                    afterMath = [false, '-', '+']
                }
            } else {
                if (m[theCoin[0]] === 1) {
                    afterMath = [false, '-', '+']
                } else {
                    afterMath = [false, '+', '-']
                }
            }
        } else {
            afterMath = [true, false, false]
        }
        for (let i = 0; i < coins.length; i++) {
            coins[i].push(afterMath[m[i]])
        }
    }

    ////////////////////////////////////////////////////////////////////////////////
    function measurementResults() {
        if (measurement == 0) {
            let matrix = smx[0]
            processWeights(matrix)
            console.log(coins, ": first")
            measurement++
        } else if (measurement == 1) {
            let matrix = coins[0][0] === false ? smx[2][0] : smx[1][0]
            processWeights(matrix)
            console.log(coins, ": second")
            measurement++
        } else if (measurement == 2) {
            let getThirdMatrix = () => {
                if (coins[0][0] === false) {
                    if (coins[11][0] && coins[11][1]) {
                        return smx[2][1][1]
                    } else {
                        return smx[2][1][0]
                    }
                } else {
                    if (coins[5][1] === true) {
                        return smx[1][1][2]
                    } else if (coins[0][0] == coins[0][1] && coins[1][0] == coins[1][1]) {
                        return smx[1][1][0]
                    } else {
                        return smx[1][1][1]
                    }
                }
            }
            let matrix = getThirdMatrix()
            processWeights(matrix)
            console.log(coins, ": final")
        }
    }
}


module.exports.find_false_coin = (answerSet) => {
    console.log("answerSet", answerSet)
    // return "false"
    function findFalseCoin(answerSet) {
        // console.log(JSON.stringify(answerSet, undefined, 2))
        answerSet.forEach((coin, i) => {
            if (typeof coin[0] === 'string') {
                if (typeof coin[1] === 'string') {
                    if (coin[0] === coin[1]) {
                        if (typeof coin[2] === 'string') {
                            if (coin[0] === coin[2]) {
                                // console.log('return coin[2]', coin[2], i + 1)
                                report(coin[2], i)
                            } else {
                                // console.log('return false')
                            }
                        } else if (coin[2] === true) {
                            // console.log('return coin[0]', coin[0], i + 1)
                            report(coin[0], i)
                        } else {
                            // console.log('return false')
                        }
                    } else {
                        // console.log('return false')
                    }
                } else if (coin[1] === true) {
                    if (typeof coin[2] === 'string') {
                        if (coin[0] === coin[2]) {
                            // console.log('return coin[2]', coin[2], i + 1)
                            report(coin[2], i)
                        } else {
                            // console.log('return false')
                        }
                    } else if (coin[2] === true) {
                        // console.log('return coin[0]', coin[0], i + 1)
                        report(coin[0], i)
                    } else {
                        // console.log('return false')
                    }
                } else {
                    // console.log('return false')
                }
            } else if (coin[0] === true) {
                if (typeof coin[1] === 'string') {
                    if (typeof coin[2] === 'string') {
                        if (coin[1] === coin[2]) {
                            // console.log('return coin[2]', coin[2], i + 1)
                            report(coin[2], i)
                        } else {
                            // console.log('return false')
                        }
                    } else if (coin[2] === true) {
                        // console.log(' return coin[1]', coin[1], i + 1)
                        report(coin[1], i)
                    } else {
                        // console.log('return false')
                    }
                } else if (coin[1] === true) {
                    if (typeof coin[2] === 'string') {
                        // console.log('return coin[2]', coin[2], i + 1)
                        report(coin[2], i)
                    } else {
                        // console.log('return false')
                    }
                } else {
                    // console.log('return false')
                }
            } else {
                // console.log('return false')
            }

        })
        // return falseCoin
    }

    ////////////////////////////////////////////////////////////////////////////////
    function report(weight, num) {
        // console.log(weight)
        let weighs = (weight == "-") ? "light" : "heavy"
        console.log("@@##@@## AND THE ANSWER IS :")
        console.log(`Coin ${num + 1} is ${weighs}`)
        // console.log("the coin : ", theCoin[0] + 1, theCoin[1])
    }

    findFalseCoin(answerSet)

}
