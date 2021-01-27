function count_items(scoring_dice,match) {
    let count = 0;
    for (let i=0;i<scoring_dice.length;i++) {
        scoring_dice[i] == match ? count++ : false;
    }
    return count
}

function scoreit() {
    //First we get the dice we want to score
    let scoring_dice = []
    for (let x=1;x<=6;x++) {
        let chkid = "Check"+x;
        let boxid = "Die"+x;
        if (document.getElementById(chkid).disabled) {continue;}
        let die_value = document.getElementById(boxid).value;
        if (document.getElementById(chkid).checked) {
            scoring_dice.push(die_value);
            document.getElementById(chkid).disabled = true;
        }
    }
    let lines = document.getElementById("scores").value.split("\n");
    let [round_score, matched_dice] =  get_score(scoring_dice);
    let total_score = lines[lines.length-1] + round_score;
    console.log(`Score: ${round_score}`);
}

function is_straight(scoring_dice) {
    if (scoring_dice.length < 6) {
        return [false,[],0];
    }
    for (let x=6;x>0;x--) {
        const found = count_items(scoring_dice,x);
        if ((found > 1) || (found == 0)) {
            return [false,[],0];
        }
    }
    return [true,scoring_dice,1500];
}

function is_six_of_kind(scoring_dice) {
    if (scoring_dice.length < 6) {
        return [false,[],0];
    }
    for (let x=6;x>0;x--) {
        const found = count_items(scoring_dice,x);
        if (found == 6) {
            return [true,scoring_dice,3000];
        }
    }
    return [false,[],0];
}

function is_five_of_kind(scoring_dice) {
    var myscore = 0;
    if (scoring_dice.length < 5) {
        return [false,[],0];
    }
    for (let x=6;x>0;x--) {
        const found = count_items(scoring_dice,x);
        if (found == 5) {
            myscore = 2000 + is_single(scoring_dice.filter(function(a) {return a !== x}));
            return [true,scoring_dice,myscore];
        }
    }
    return [false,[],0];
}

function is_four_of_kind_plus_pair(scoring_dice) {
    if (scoring_dice.length < 6) {
        return [false,[],0];
    }
    let is_four_kind = false;
    let is_one_pair = false;
    for (let x=6;x>0;x--) {
        const found = count_items(scoring_dice,x);
        if (found == 4) {
            is_four_kind = true;
        }
        if (found == 2) {
            is_one_pair = true;
        }
    }
    if (is_four_kind && is_one_pair) {
        return [true,scoring_dice,1500];
    }
    return [false,[],0];

}

function is_four_of_kind_only(scoring_dice) {
    var myscore = 0;
    if (scoring_dice.length < 4) {
        return [false,[],0];
    }
    for (let x=6;x>0;x--) {
        const found = count_items(scoring_dice,x);
        if (found == 4) {
            myscore = 1000 + is_single(scoring_dice.filter(function(a) {return a !== x}));
            return [true,scoring_dice,myscore];
        }
    }
    return [false,[],0];
}


function is_two_trips(scoring_dice) {
    if (scoring_dice.length < 6) {
        return [false,[],0];
    }
    let is_one_trip = false;
    for (let x=6;x>0;x--) {
        const found = count_items(scoring_dice,x);
        if (found == 3) {
            if (is_one_trip) {
                return [true,scoring_dice,2500];
            } else {
                is_one_trip = true;
            }
        }
    }
    return [false,[],0];
}

function is_three_pairs(scoring_dice) {
    if (scoring_dice.length < 6) {
        return [false,[],0];
    }
    let is_one_pair = false;
    let is_two_pair = false;
    for (let x=6;x>0;x--) {
        const found = count_items(scoring_dice,x);
        if (found != 2) {
            return [false,[],0];
        } else {
            if (is_two_pair) {
                return [true,scoring_dice,1500];
            } else if (is_one_pair) {
                is_two_pair = true;
            } else {
                is_one_pair = true;
            }
        }
    }
    return [false,[],0]
}

function is_one_trip(scoring_dice) {
    if (scoring_dice.length < 3) {
        return [false,[],0];
    }
    for (let x=6;x>0;x--) {
        const found = count_items(scoring_dice,x);
        console.log(`${x} :: ${found}`);
        if (found == 3) {
            if (x == 1) {
                return [true,scoring_dice,300];
            }
            return [true,scoring_dice,(x*100)];
        }
    }
    return [false,[],0];
}

function is_single(scoring_dice) {
    let single_score = 0;
    let found = count_items(scoring_dice,1);
    single_score += found * 100;
    found = count_items(scoring_dice,5);
    single_score += found * 50;
    return [true,scoring_dice,single_score];
}

function get_score(scoring_dice) {
    let scored_dice = [];
    let curr_score = 0;
    let one_pair = [false,0];
    let two_pair = [false,0];
    let three_pair = false;
    let one_trip = [false,0];
    let two_trip = false;
    let four_kind = false;
    let result = false;
    let matched_dice = [];

    if (([result,matched_dice,curr_score] =  is_straight(scoring_dice))[0]) {
        return [curr_score, matched_dice];
    } else if (([result,matched_dice,curr_score] =  is_six_of_kind(scoring_dice))[0]) {
        return [curr_score, matched_dice];
    } else if (([result,matched_dice,curr_score] =  is_five_of_kind(scoring_dice))[0]) {
        return [curr_score, matched_dice];
    } else if (([result,matched_dice,curr_score] =  is_four_of_kind_plus_pair(scoring_dice))[0]) {
        return [curr_score, matched_dice];
    } else if (([result,matched_dice,curr_score] =  is_four_of_kind_only(scoring_dice))[0]) {
        return [curr_score, matched_dice];
    } else if (([result,matched_dice,curr_score] =  is_two_trips(scoring_dice))[0]) {
        return [curr_score, matched_dice];
    } else if (([result,matched_dice,curr_score] =  is_three_pairs(scoring_dice))[0]) {
        return [curr_score, matched_dice];
    } else if (([result,matched_dice,curr_score] = is_one_trip(scoring_dice))[0]) {
        return [curr_score,matched_dice];
    } else if (([result,matched_dice,curr_score] = is_single(scoring_dice))[0])
        return [curr_score,matched_dice]

    return [0,[]];
}


function show_score(score) {
    curr_scores = document.getElementById("scores").value;
    total_score = 0;
    if (length(curr_scores) > 0) {
        
    }
}