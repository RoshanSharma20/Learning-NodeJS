const people = ['alice', 'bob', 'rey', 'sam']
const ages = [23, 24, 25, 26]

console.log(people);
module.exports = {//if multiple items are required to be exported then the items are sent together as one object
    people,//either we can write it as key-value pair or if we can use the same variable name,under the hood the line is the short version of people:people
    ages
};  //module.exports is used to send the required items, when the file is imported in another js file