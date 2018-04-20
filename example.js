const { composeP } = require('ramda');

const doSomething = withThisThing => new Promise(resolve => {
    resolve(withThisThing + " goat");
})

const doSomethingElse = withThatThing => new Promise(resolve => {
    resolve(withThatThing + ' lkasdflasdflasdfajsdhf');
});

const andAnotherOne = withThatThing => new Promise((resolve, reject) => {
    reject('An error happened');

    //resolve(withThatThing + ' another one');
});

const doTheThings = thing => 
    doSomething(thing)
        .then(doSomethingElse)
        .then(andAnotherOne)
        .then(console.log);

const doTheThingsAwait = async thing => {
    const r1 = await doSomething(thing);
    const r2 = await doSomethingElse(r1);
    const r3 = await andAnotherOne(r2);
    console.log(r3);
}

const probe = value => {
    console.log('probe', value);
    return value;
}

const doTheThingsRamda = composeP(
    console.log,
    andAnotherOne,
    probe,
    doSomethingElse,
    probe,
    doSomething
);

doTheThingsRamda('cat')
    .catch(err => console.log('err', err));
