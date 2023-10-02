export const getScore = (original="", typed="", time=60) => {
    console.log(original, typed, time, original.localeCompare(typed));

    const wpm = Math.round((typed.length/5)*(time/60));
    console.log("wpm : ",wpm)
    let correct = 0, errors = 0;
    for(let i=0;i<original.length;i++){
        if(i>=typed.length){
            errors = original.length-i;
            break;
        }
        if(original[i].localeCompare(typed[i])===0){
            correct++;
        }
        else errors++;
    }
    console.log(correct, ((correct/original.length)*100));
    const accuracy = parseInt(((correct/original.length)*100)+"");

    console.log("accuracy :",accuracy)
    const finalScore = wpm*0.3 + accuracy*0.7;

    console.log("final :",finalScore.toFixed(2))

    return {
        subScore : finalScore.toFixed(2),
        errors
    }
}