var fresh_roll = true;

function roll() {
    for (let x=1;x<=6;x++) {
        var boxid = `Die${x}`;
        var chkid = `Check${x}`;
        if ((document.getElementById(chkid).checked) && (document.getElementById(chkid).disabled)) {
            //do we already have a number we selected?
            continue;        
        } else {
            var roll = Math.floor(Math.random() * 6) + 1
            // let's put a new die value there
            document.getElementById(boxid).value=roll;
            document.getElementById(boxid).disabled=true
            document.getElementById(chkid).disabled=false;
            document.getElementById(chkid).checked=false;
        }
    }
}

function check_all(el) {
    for (let x=1;x<=6;x++) {
        var chkid = `Check${x}`;
        document.getElementById(chkid).checked = (el.checked ? true : false);
    }
}

function clear_all() {
    for (let x=1;x<=6;x++) {
        var boxid = `Die${x}`;
        var chkid = `Check${x}`;
        document.getElementById(boxid).value='';
        document.getElementById(boxid).disabled=false
        document.getElementById(chkid).disabled=false;
        document.getElementById(chkid).checked=false;
    }
}

function testit() {
    let hello = [1,3,5,5,4,3];
    console.log(`Length: ${hello.length}`)
    console.log(hello.find(element => element == 1));
    console.log(hello.find(element => element == 5));
    console.log(hello.filter(function(a) {return a !== 3}))
}