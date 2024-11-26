import express, { Request, Response } from "express";

const app = express();
const PORT = process.env.PORT || 3000;
//const ascending; 

app.use(express.json());

///add returns the sum of the array
app.get("/add", (req: Request, res: Response) => {
    const sum = req.body.array.reduce((accumulator: any, currentValue: any) => accumulator + currentValue);
    res.send({"array sum": sum});
});

///product returns the product of the array
app.get("/product", (req: Request, res: Response) => {
    const product = req.body.array.reduce((accumulator: any, currentValue: any) => accumulator * currentValue);
    res.send({"array product": product});
});

///evens returns an array of all even numbers of the original array
function evenNumber(number: any) {
    if (number % 2 == 0){
        return number; 
    }
}
app.get("/evens", (req: Request, res: Response) => {
    const evens = req.body.array.filter((x: any) => evenNumber(x)); 
    res.send({"array evens": evens});
});
///min and /max should return the min/max number of the array, respectively

app.get("/min", (req: Request, res: Response) => {
    res.send({"array min": Math.min(...req.body.array)});
});
app.get("/max", (req: Request, res: Response) => {
    res.send({"array max": Math.max(...req.body.array)});
});

///sort should take an additional boolean parameter ascending in the request JSON, 
//and return the correctly sorted array of numbers

app.get("/sort", (req: Request, res: Response) => {
    if (req.body.ascending) {
        const sorted = req.body.array.sort(); 
        res.send({"array sort": sorted});
    }
});

///target should take an additional number parameter target , 
//and return whether there are two numbers in the array that sum to target

/*
function sumTarget(array: Array, sum: any){
    const array2 = array.sort();
    for (let i = 0; i < length.array; i++){

    }
}*/

function sumTarget(array: any, sum: any) {
    // Sort the array in ascending order
    const array2 = array.sort(); 
    // Loop through the array to find a pair that adds up to the sum
    for (let i = 0; i < array2.length; i++) {
        for (let j = i + 1; j < array2.length; j++) {
            if (array2[i] + array2[j] === sum) {
                return "yes, there is a pair"; // Found a pair
            }
        }
    }
    return "no there is not a pair"; // No pair found
}

app.get("/target", (req: Request, res: Response) => {
    const result = sumTarget(req.body.array, req.body.target);
    res.send({ "array target": result });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});