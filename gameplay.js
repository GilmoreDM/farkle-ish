function roll() {
    for (let x=1;x<=6;x++) {
        var boxid = `Die${x}`;
        var roll = Math.floor(Math.random() * 6) + 1
        document.getElementById(boxid).value=roll;
    }
}

function check_all(el) {
    for (let x=1;x<=6;x++) {
        var chkid = `Check${x}`;
        document.getElementById(chkid).checked = (el.checked ? true : false);
    }
}

function testit() {
    let hello = [1,3,5,5,4,3];
    console.log(hello.find(element => element == 1));
    console.log(hello.find(element => element == 5));
    console.log(hello.filter(function(a) {return a !== 3}))
}