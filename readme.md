# Async + Await

 - It is really just syntax for using promises
 - You can `await` any function that return a promise
 - To use the await keyword you must declare the function as `async`
 - It makes async code look procedural

## Promise code

```
function updateGoatRole() {
    return getGoats()
        .then(goats => {
            const updatedGoats = goats.map(goat => {
                goat.role = 'super';
                return goat;
            });
        })
        .then(updateGoats);
}
```

## Use async/await

```
async function updateGoatRole() {
    const goats = await getGoats();
    const goats = goats.map(goat => {
        goat.role = 'super';
        return goat;
    })
    return await updateGoats(goats);
}
```

## Use it with promise.all()

```

async function doTheThings() {
    const [thing1, thing2] = await Promise.all([doThing1(), doThing2()]);
    return thing1 + thing2;
}

```

## What about errors?

### Option 1 - Just listen to the unhandled rejection event

```
process.on('unhandledRejection, error => {
    console.log('Oopsie doopsie:', error);
})
```

Not very flexible

### Option 2 - try+catch

```
async function updateGoatRole() {
    try {
        const goats = await getGoats();
        const goats = goats.map(goat => {
            goat.role = 'super';
            return goat;
        })
        return await updateGoats(goats);
    } catch(error) {
        console.log('Oopsie doopsie:', error);
    }
}
```

Looks gross and gets in the way

### Option 3 - Use a higher order function
 
Crude example

```
const handleError = fn => 
                    param => fn(param) // Could do something fancier with apply
                                .catch(
                                    error => console.log('Oopsie doopsie:', error)
                                );
                                
const getGoatsHandled = handleError(getGoats);
const updateGoatsHandled = handleError(getGoats);

async function updateGoatRole() {
    const goats = await getGoatsHandled(goats);
    const goats = goats.map(goat => {
        goat.role = 'super';
        return goat;
    })
    return await updateGoatsHandled(goats);
}
```

## Final take aways

 - Node 8 supports async + await out of the box
    - You just need to configure babel and eslint to handle it
 - TypeScript supports async + await out of the box
    - So just use it in the angular project