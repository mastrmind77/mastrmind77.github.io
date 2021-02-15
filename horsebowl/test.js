let user = `{
    "username": "John Doe",
    "email": "john.doe@example.com",
    "state": "married",
    "profiles": [
        {"name": "jd7", "job": "actor" },
        {"name": "johnd7", "job": "spy"}
    ],
    "active": true,
    "employed": true
}`;

let data = JSON.parse(json);

// function printValues(obj) {
//     for(var k in obj) {
//         if(obj[k] instanceof Object) {
//             printValues(obj[k]);
//         } else {
//             console.log(obj[k]);
//         };
//     }
// };
//
// printValues(data);
//
// console.log('-------------------');
//
// Object.entries(data).map((e) => {
//     console.log(e);
// });
