# GraphQL Pagination Example

This repository contains an example implementation of pagination using GraphQL in a Lightning Web Component (LWC) for Salesforce. 

It's part of a Tutorial on GraphQL in Salesforce hosted by [Panther Schools](https://www.youtube.com/@pantherschools) and [Amit Singh](linkedin.com/in/cloudyamit)

The YouTube series can be found [here](https://www.youtube.com/playlist?list=PL3Rr8DM87XnA6s2eCsR4JQP2GLdGnamRy)

Their source code hosted in GitHub can be found [here](https://github.com/amitastreait/lwc-course-enhancement/tree/main/force-app/main/default/lwc/contactListGraphQL)

## Components

### GraphQLQuery.js

This file contains the JavaScript code for the GraphQLQuery Lightning Web Component. It implements pagination using GraphQL queries and Lightning Web Components.

#### Features:

- Pagination forward and backward using GraphQL cursors.
- Dynamically updating datatable with queried data.
- Search functionality to filter contacts by name.

### graphQLQuery.html

This file contains the HTML template for the GraphQLQuery Lightning Web Component. It includes the UI elements like search input, datatable, and pagination buttons.

#### Features:

- Lightning Spinner to indicate loading state.
- Lightning Datatable to display queried contacts.
- Pagination buttons to navigate through pages of contacts.

## How to Use

1. Clone the repository to your local machine: 

```bash
git clone https://github.com/tomsouza4/QueryGraphQLOnLWC.git
```

# Output Sample
https://github.com/tomsouza4/QueryGraphQLOnLWC/assets/11336182/15620ce0-4532-42ea-a4f8-e9c906e06b1b


# Important Note
In this app theres no pagination backwards and this is due to current limitation on Salesforce GraphQL API. Which is currently in GA as Jan/2024.

### Additional Note
Currently the API supports Mutations(Create, Update, Delete) only in Development, it will be available in Production in future releases.

## Nice to Haves
Benchmark performance comparing GraphQL to other formats of queries.
- Query data using native LWC to get Records such as '@salesforce/schema/Contact'.
- Custom Apex Class to query data from Salesforce.
