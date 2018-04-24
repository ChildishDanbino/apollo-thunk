# apollo-thunk
Thunk Middleware for Apollo Client

# What is the reason behind this?
Apollo-Client by default provides its own middleware for you to use. By
using the default middleware your project will load data into the apollo-cache
which is simply just a normalized Redux store. It works awesome out of the box...
unless you want full control over your global-app state (like in an offline application).
This was the inspiration behind apollo-thunk, I loved how apollo-client gave me
the tool to easily interact with graphQL queries via variables and fetch-policy setting 
but needed easy access to my Redux state data so I could manipulate it as desired when offline.
Apollo-Thunk keeps the variables and fetch-policy paradigm of apollo while allowing you 
to interact with graphQL data in a more familiar Redux way and gives you full control over
the structure of your Redux store. 

# Setting Up

Install package via NPM

```javascript
npm install apollo-thunk
```

Import apolloThunk in your project replace apollo middleware with apolloThunk passing the apollo-client
as a parameter.

```javascript
import apolloThunk from 'apollo-thunk';

  const store = creator(
    rootReducer,
    {},
    compose(
      applyMiddleware(apolloThunk(apolloClient))
    )
  );
```

# Using Queries
Simply dispatch a normal Redux action and some reducers. Either import your query or write in inline.
Pass in your variables and other additional options.

See: https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-options for a list of all query options. 

Apollo-Thunk will do the rest!

```javascript
export function getData(variables) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    query: ExampleQuery,
    fetchPolicy: 'network-only',
    variables: {
      ...variables
    }
  };
}
```

```javascript
    export default function reducer(state = initialState, action = {}) {
     switch (action.type) {
       case LOAD:
         return {
           ...state,
           loading: true,
           error: null
         };
       case LOAD_SUCCESS: {
         return {
           ...state,
           loading: false,
           loaded: true,
           data: action.data
         };
       }
       case LOAD_FAIL:
         return {
           ...state,
           loading: false,
           loaded: false,
           error: action.error.message
         };
       default:
         return state;
     }
   }
 ```
 
# Using Mutations
Mutations work the same way as queries but instead specify mutation in your Redux action. 

```javascript
export function updateData(variables) {
  return {
    types: [UPDATE, UPDATE_SUCCESS, UPDATE_FAIL],
    mutation: exampleMutation,
    variables: {
        ... variables
    }
  };
}
```